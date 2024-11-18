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

export const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
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