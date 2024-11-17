import { Photo } from '@/types/photo';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native';

interface PhotoCardProps {
    photo: Photo;
    isMarkedForDeletion: boolean;
}

const DeleteOverlay = () => (
    <View style={styles.deleteOverlay}>
        <MaterialCommunityIcons name="delete-clock" size={40} color="white" />
        <Text style={styles.deleteText}>Marked for deletion</Text>
    </View>
);

const ActionOverlay = ({ onOpenPhoto }: { onOpenPhoto: () => void }) => (
    <View style={styles.actionOverlay}>
        <TouchableOpacity style={styles.actionButton} onPress={onOpenPhoto}>
            <Ionicons name="images-outline" size={32} color="white" />
            <Text style={styles.actionText}>Open in Photos</Text>
        </TouchableOpacity>
    </View>
);

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isMarkedForDeletion }) => {
    const [showActions, setShowActions] = useState(false);

    const openInPhotos = useCallback(() => {
        // Use photos-redirect:// with the local identifier to open specific photo
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
                {isMarkedForDeletion && <DeleteOverlay />}
                {showActions && !isMarkedForDeletion && <ActionOverlay onOpenPhoto={openInPhotos} />}
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
    actionOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    actionButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionText: {
        color: 'white',
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
    },
});