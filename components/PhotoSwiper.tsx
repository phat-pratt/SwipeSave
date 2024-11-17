import { Photo } from '@/types/photo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { PhotoCard } from './PhotoCard';

interface PhotoSwiperProps {
    photos: Photo[];
    onSwipeLeft: (index: number) => void;
    swiperRef: React.RefObject<SwiperCardRefType>;
    onEndReached: () => void;
    deleteMap: Record<string, string>;
    onIndexChange: (index: number) => void;
    onUnmarkDelete: (photoId: string) => void;
}

const DeleteOverlay = () => (
    <View style={styles.deleteOverlay}>
        <MaterialCommunityIcons name="delete-clock" size={40} color="white" />
        <Text style={styles.deleteText}>Marked for deletion</Text>
    </View>
);

export const PhotoSwiper: React.FC<PhotoSwiperProps> = ({ photos, onSwipeLeft, swiperRef, onEndReached, deleteMap, onIndexChange, onUnmarkDelete }) => {
    const renderCard = useCallback((photo: Photo, index: number) => (
        <PhotoCard
            photo={photo}
            isMarkedForDeletion={!!deleteMap[photo.id]}
            onUnmarkDelete={() => onUnmarkDelete(photo.id)}
        />
    ), [deleteMap, onUnmarkDelete]);

    const OverlayLabelRight = useCallback(() => (
        <View style={[styles.overlayLabelContainer, { backgroundColor: 'rgba(0, 255, 0, 0.2)' }]} />
    ), []);

    const OverlayLabelLeft = useCallback(() => (
        <View style={[styles.overlayLabelContainer, { backgroundColor: 'rgba(255, 0, 0, 0.2)' }]} />
    ), []);

    const OverlayLabelTop = useCallback(() => (
        <View style={[styles.overlayLabelContainer, { backgroundColor: 'rgba(0, 0, 255, 0.2)' }]} />
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
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
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