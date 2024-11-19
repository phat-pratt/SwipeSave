import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { type SwiperCardRefType } from 'rn-swiper-list';
import { ControlButtons } from '../components/ControlButtons';
import { getRequestPermissions, loadPhotoBatch, formatFileSize } from '@/utils/photo';
import { Photo, DeleteMapEntry } from '@/types/photo';
import { deleteAssetsAsync } from 'expo-media-library';
import { DeletePreviewModal } from '../components/DeletePreviewModal';
import { BlurredBackground } from '../components/BlurredBackground';
import { GalleryBody } from '../components/GalleryBody';

import { LogoHeader } from '../components/LogoHeader';

const PhotoGallery = () => {
    const ref = useRef<SwiperCardRefType>();
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deleteMap, setDeleteMap] = useState<Record<string, DeleteMapEntry>>({});
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
        const photo = photos[cardIndex];
        if (!deleteMap[photo.id]) {
            setDeleteMap({
                ...deleteMap,
                [photo.id]: {
                    uri: photo.properUri,
                    fileSize: photo.fileSize,
                    fileType: photo.fileType,
                    creationTime: photo.creationTime
                }
            });
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
        Object.entries(deleteMap).map(([id, entry]) => ({
            id,
            uri: entry.uri,
            fileSize: entry.fileSize
        })),
        [deleteMap, photos]
    );

    const handleDeleteConfirm = async () => {
        await onRequestToDeleteImages();
        setDeleteMap({});
        setIsPreviewModalVisible(false);
    };

    const nextPhotoUri = useMemo(() => {
        const nextIndex = activeIndex + 1;
        return nextIndex < photos.length
            ? photos[nextIndex].properUri
            : photos[activeIndex]?.properUri;
    }, [activeIndex, photos]);

    const totalSize = useMemo(() => {
        const sum = Object.values(deleteMap).reduce((acc, entry) => acc + (entry.fileSize || 0), 0);
        return formatFileSize(sum);
    }, [deleteMap]);

    if (hasPermission === null) {
        return <View style={[styles.container, styles.topSafeArea]}><Text>Requesting permissions...</Text></View>;
    }

    if (hasPermission === false) {
        return (
            <View style={[styles.container, styles.topSafeArea]}>
                <Text>No access to photos</Text>
                <Button title="Request Permission" onPress={getPermissions} />
            </View>
        );
    }

    return (
        <View style={[styles.container, styles.topSafeArea]}>
            <BlurredBackground imageUri={nextPhotoUri} />
            <GestureHandlerRootView style={styles.gestureRoot}>
                <LogoHeader />
                <GalleryBody
                    isLoading={isLoading}
                    photos={photos}
                    deleteMap={deleteMap}
                    onPrepareToDelete={onPrepareToDelete}
                    onEndReached={onEndReached}
                    swiperRef={ref}
                    onIndexChange={onIndexChange}
                    onUnmarkDelete={onUnmarkDelete}
                />
                <ControlButtons
                    onSwipeLeft={() => ref.current?.swipeLeft()}
                    onGoBack={onGoBack}
                    onDelete={onRequestToDeleteImages}
                    onContinue={onContinue}
                    deleteCount={deleteCount}
                    canGoBack={activeIndex > 0}
                    onPreviewDelete={() => setIsPreviewModalVisible(true)}
                    totalSize={totalSize}
                />
                <DeletePreviewModal
                    visible={isPreviewModalVisible}
                    onClose={() => setIsPreviewModalVisible(false)}
                    onConfirm={handleDeleteConfirm}
                    photos={markedPhotos}
                    onUnmarkDelete={onUnmarkDelete}
                    totalSize={totalSize}
                />
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    gestureRoot: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#4C9085',
    },
    topSafeArea: {
        paddingTop: Platform.OS === 'ios' ? 47 : 0,
    },
});

export default PhotoGallery;