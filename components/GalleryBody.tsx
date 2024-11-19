
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { type SwiperCardRefType } from 'rn-swiper-list';
import { PhotoSwiper } from './PhotoSwiper';
import { NoPhotos } from './NoPhotos';
import { Photo, DeleteMapEntry } from '@/types/photo';

interface GalleryBodyProps {
    isLoading: boolean;
    photos: Photo[];
    deleteMap: Record<string, DeleteMapEntry>;
    onPrepareToDelete: (index: number) => void;
    onEndReached: () => void;
    swiperRef: React.RefObject<SwiperCardRefType>;
    onIndexChange: (index: number) => void;
    onUnmarkDelete: (id: string) => void;
}

export const GalleryBody = ({
    isLoading,
    photos,
    deleteMap,
    onPrepareToDelete,
    onEndReached,
    swiperRef,
    onIndexChange,
    onUnmarkDelete,
}: GalleryBodyProps) => {
    if (isLoading) {
        return <ActivityIndicator size={'large'} color={'white'} style={styles.flex} />;
    }

    if (photos.length === 0) {
        return <NoPhotos />;
    }

    return (
        <PhotoSwiper
            photos={photos}
            deleteMap={deleteMap}
            onSwipeLeft={onPrepareToDelete}
            onEndReached={onEndReached}
            swiperRef={swiperRef}
            onIndexChange={onIndexChange}
            onUnmarkDelete={onUnmarkDelete}
        />
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
});