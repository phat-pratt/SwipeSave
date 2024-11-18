
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatFileSize } from '@/utils/photo';

interface DeletePreviewCardProps {
    uri: string;
    fileSize?: number;
    id: string;
    onUnmarkDelete: (photoId: string) => void;
}

export const DeletePreviewCard: React.FC<DeletePreviewCardProps> = ({
    uri,
    fileSize,
    id,
    onUnmarkDelete,
}) => {
    return (
        <View style={styles.gridItem}>
            <Image source={{ uri }} style={styles.gridImage} />
            <View style={styles.imageDimmer} />
            <TouchableOpacity
                style={styles.restoreButton}
                onPress={() => onUnmarkDelete(id)}
            >
                <MaterialCommunityIcons name="undo-variant" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.fileSizeText}>{formatFileSize(fileSize)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1 / 3,
        aspectRatio: 1,
        padding: 4,
        position: 'relative',
    },
    gridImage: {
        flex: 1,
        borderRadius: 8,
    },
    imageDimmer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
    },
    fileSizeText: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 4,
        borderRadius: 4,
    },
    restoreButton: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 6,
    },
});