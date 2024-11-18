import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Photo } from '@/types/photo';

type Props = {
    photo: Photo;
};

export const PhotoDetailsOverlay: React.FC<Props> = ({ photo }) => {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDimensions = (width: number, height: number) => {
        return `${width.toLocaleString()} × ${height.toLocaleString()}`;
    };

    const formatDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return 'Unknown';
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(1)} ${units[unitIndex]}`;
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={24} color="white" />
                    <Text style={styles.detailText}>
                        {formatDate(photo.creationTime)}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="expand-outline" size={24} color="white" />
                    <Text style={styles.detailText}>
                        {formatDimensions(photo.width, photo.height)}
                    </Text>
                </View>

                {photo.duration > 0 && (
                    <View style={styles.detailRow}>
                        <Ionicons name="time-outline" size={24} color="white" />
                        <Text style={styles.detailText}>
                            {formatDuration(photo.duration)}
                        </Text>
                    </View>
                )}

                {photo.mediaType && (
                    <View style={styles.detailRow}>
                        <Ionicons name={photo.mediaType === 'video' ? 'videocam-outline' : 'image-outline'} size={24} color="white" />
                        <Text style={styles.detailText}>
                            {photo.mediaType.charAt(0).toUpperCase() + photo.mediaType.slice(1)}
                        </Text>
                    </View>
                )}

                <View style={styles.detailRow}>
                    <Ionicons name="document-outline" size={24} color="white" />
                    <Text style={styles.detailText}>
                        {formatFileSize(photo.fileSize)}
                    </Text>
                </View>

                {photo.fileType && (
                    <View style={styles.detailRow}>
                        <Ionicons name="code-outline" size={24} color="white" />
                        <Text style={styles.detailText}>
                            {photo.fileType.toUpperCase()}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    detailsContainer: {
        padding: 20,
        width: '90%',
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
});