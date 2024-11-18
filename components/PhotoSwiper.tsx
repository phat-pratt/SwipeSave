import { DeleteMapEntry, Photo } from '@/types/photo';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { PhotoCard } from './PhotoCard';
import { OverlayLabel, OverlayDirection } from './OverlayLabel';

interface PhotoSwiperProps {
    photos: Photo[];
    onSwipeLeft: (index: number) => void;
    swiperRef: React.RefObject<SwiperCardRefType>;
    onEndReached: () => void;
    deleteMap: Record<string, DeleteMapEntry>;
    onIndexChange: (index: number) => void;
    onUnmarkDelete: (photoId: string) => void;
}

export const PhotoSwiper: React.FC<PhotoSwiperProps> = ({ photos, onSwipeLeft, swiperRef, onEndReached, deleteMap, onIndexChange, onUnmarkDelete }) => {
    const renderCard = useCallback((photo: Photo, index: number) => (
        <PhotoCard
            photo={photo}
            isMarkedForDeletion={!!deleteMap[photo.id]}
            onUnmarkDelete={() => onUnmarkDelete(photo.id)}
        />
    ), [deleteMap, onUnmarkDelete]);

    const OverlayLabelRight = useCallback(() => (
        <OverlayLabel direction={OverlayDirection.RIGHT} />
    ), []);

    const OverlayLabelLeft = useCallback(() => (
        <OverlayLabel direction={OverlayDirection.LEFT} />
    ), []);

    const OverlayLabelTop = useCallback(() => (
        <OverlayLabel direction={OverlayDirection.TOP} />
    ), []);

    return (
        <View style={styles.container}>
            <Swiper
                ref={swiperRef}
                cardStyle={styles.cardStyle}
                data={photos}
                renderCard={renderCard}
                onSwipedAll={onEndReached}
                onSwipeLeft={onSwipeLeft}
                OverlayLabelRight={OverlayLabelRight}
                OverlayLabelLeft={OverlayLabelLeft}
                OverlayLabelTop={OverlayLabelTop}
                onIndexChange={onIndexChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardStyle: {
        width: '95%',
        height: '75%',
        borderRadius: 15,
        marginVertical: 20,
    },
    deleteOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    deleteText: {
        color: 'white',
        fontSize: 16,
        marginTop: 8,
        fontWeight: '600',
    },
});