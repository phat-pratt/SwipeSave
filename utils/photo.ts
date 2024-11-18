import { requestPermissionsAsync, Asset, getAssetInfoAsync, getAssetsAsync, SortBy } from "expo-media-library";
import { Alert, Linking, Platform } from "react-native";
import * as FileSystem from 'expo-file-system';
import { Photo } from '@/types/photo';

export const getRequestPermissions = async () => {
    const { status, accessPrivileges } = await requestPermissionsAsync(false);

    if (Platform.OS === 'ios' && status === 'granted' && accessPrivileges === 'limited') {
        Alert.alert(
            "Limited Access",
            "For the best experience, please allow access to all photos in settings.",
            [
                { text: "Cancel" },
                { text: "Open Settings", onPress: () => Linking.openSettings() }
            ]
        );
    }

    return status === 'granted'
};

export const getPhotoUri = async (asset: Asset): Promise<string> => {
    const assetInfo = await getAssetInfoAsync(asset);
    return assetInfo.localUri || assetInfo.uri;
};

export const getPhotoFileInfo = async (uri: string) => {
    let fileSize: number | undefined;
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo?.exists && 'size' in fileInfo) {
        fileSize = fileInfo.size;
    }

    const fileType = uri.split('.').pop()?.toLowerCase();
    return { fileSize, fileType };
};

export const loadPhotoBatch = async (endCursor?: string) => {
    const { assets, hasNextPage, endCursor: nextEndCursor } = await getAssetsAsync({
        after: endCursor,
        mediaType: ['photo'],
        sortBy: [SortBy.creationTime],
    });

    const photosWithUri = await Promise.all(
        assets.map(async (asset) => {
            const uri = await getPhotoUri(asset);
            const { fileSize, fileType } = await getPhotoFileInfo(uri);

            return {
                ...asset,
                properUri: uri,
                fileSize,
                fileType
            } as Photo;
        })
    );

    return {
        photos: photosWithUri,
        hasNextPage,
        endCursor: nextEndCursor
    };
};