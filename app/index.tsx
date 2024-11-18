import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, Button, StyleSheet, Platform, Alert, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type SwiperCardRefType } from 'rn-swiper-list';
import { PhotoSwiper } from '../components/PhotoSwiper';
import { ControlButtons } from '../components/ControlButtons';
import { getRequestPermissions, loadPhotoBatch } from '@/utils/photo';
import { Photo } from '@/types/photo';
import { Asset, deleteAssetsAsync, getAssetInfoAsync, getAssetsAsync, SortBy } from 'expo-media-library';
import { DeletePreviewModal } from '../components/DeletePreviewModal';
import { BlurredBackground } from '../components/BlurredBackground';
import * as FileSystem from 'expo-file-system';

const PhotoGallery = () => {
    const ref = useRef<SwiperCardRefType>();
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deleteMap, setDeleteMap] = useState<Record<string, string>>({});
    const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

    const getPermissions = async () => {
        const hasPermissions = await getRequestPermissions();
        setHasPermission(hasPermissions);
    };

    const loadPhotos = async () => {
        if (!hasPermission) {
            return;
        }
        setIsLoading(true);

        try {
            const { photos: newPhotos, hasNextPage, endCursor: nextEndCursor } = await loadPhotoBatch(endCursor);
            setEndCursor(nextEndCursor);
            setHasMoreImages(hasNextPage);
            setPhotos(newPhotos);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    };

    const onEndReached = () => {
        if (hasMoreImages) {
            loadPhotos();
        }
    }

    useEffect(() => {
        getPermissions();
    }, []);

    useEffect(() => {
        if (hasPermission) {
            loadPhotos();
        }
    }, [hasPermission]);

    const deleteCount = useMemo(() => Object.keys(deleteMap).length, [deleteMap]);

    const onPrepareToDelete = async (cardIndex: number) => {
        const assetId = photos[cardIndex].id;
        if (!deleteMap[assetId]) {
            setDeleteMap({ ...deleteMap, [assetId]: photos[cardIndex].properUri });
        }
    };

    const onUnmarkDelete = (photoId: string) => {
        const newDeleteMap = { ...deleteMap };
        delete newDeleteMap[photoId];
        setDeleteMap(newDeleteMap);
    };

    const onIndexChange = (index: number) => {
        setActiveIndex(index);
    };

    const onContinue = () => ref.current?.swipeRight();
    const onGoBack = () => ref.current?.swipeBack();
    const onRequestToDeleteImages = async () => {
        const assetIds = Object.keys(deleteMap);
        if (assetIds.length > 0) {
            await deleteAssetsAsync(assetIds);
        }
    };

    const markedPhotos = useMemo(() =>
        Object.entries(deleteMap).map(([id, uri]) => ({ id, uri })),
        [deleteMap]
    );

    const handleDeleteConfirm = async () => {
        await onRequestToDeleteImages();
        setDeleteMap({});
        setIsPreviewModalVisible(false);
    };

    const nextPhotoUri = useMemo(() => {
        const nextIndex = activeIndex + 1;
        return nextIndex < photos.length ? photos[nextIndex].properUri : undefined;
    }, [activeIndex, photos]);

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to photos</Text>
                <Button title="Request Permission" onPress={getPermissions} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BlurredBackground imageUri={nextPhotoUri} />
            <GestureHandlerRootView style={styles.gestureRoot}>
                {isLoading ? <ActivityIndicator size={'large'} color={'white'} style={styles.container} /> : <PhotoSwiper
                    photos={photos}
                    deleteMap={deleteMap}
                    onSwipeLeft={onPrepareToDelete}
                    onEndReached={onEndReached}
                    swiperRef={ref}
                    onIndexChange={onIndexChange}
                    onUnmarkDelete={onUnmarkDelete}
                />}
                <ControlButtons
                    onSwipeLeft={() => ref.current?.swipeLeft()}
                    onGoBack={onGoBack}
                    onDelete={onRequestToDeleteImages}
                    onContinue={onContinue}
                    deleteCount={deleteCount}
                    canGoBack={activeIndex > 0}
                    onPreviewDelete={() => setIsPreviewModalVisible(true)}
                />
                <DeletePreviewModal
                    visible={isPreviewModalVisible}
                    onClose={() => setIsPreviewModalVisible(false)}
                    onConfirm={handleDeleteConfirm}
                    photos={markedPhotos}
                />
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    gestureRoot: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    container: {
        flex: 1,
    }
});

export default PhotoGallery;