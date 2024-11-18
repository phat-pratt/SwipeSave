import { Photo } from '@/types/photo';
import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Linking } from 'react-native';
import { DeleteOverlay, PhotoDetailsOverlay } from './overlays';

interface PhotoCardProps {
    photo: Photo;
    isMarkedForDeletion: boolean;
    onUnmarkDelete?: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
    photo,
    isMarkedForDeletion,
    onUnmarkDelete
}) => {
    const [showActions, setShowActions] = useState(false);

    const openInPhotos = useCallback(() => {
        const photoURL = `photos-redirect://ph://${photo.id}`;
        Linking.openURL(photoURL).catch(err => {
            console.error('Error opening Photos app:', err);
        });
    }, [photo.id]);

    const toggleActions = () => {
        if (!isMarkedForDeletion) {
            setShowActions(!showActions);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={toggleActions}>
            <View style={styles.container}>
                <Image
                    source={{ uri: photo.properUri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {isMarkedForDeletion && <DeleteOverlay onUndo={onUnmarkDelete} />}
                {showActions && !isMarkedForDeletion && <PhotoDetailsOverlay photo={photo} />}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 15,
        height: '75%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
    },
});