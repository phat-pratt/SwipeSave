import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatFileSize } from '@/utils/photo';

interface DeletePreviewModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    photos: { id: string; uri: string; fileSize?: number }[];
    onUnmarkDelete: (photoId: string) => void;
    totalSize: string;
}

export const DeletePreviewModal: React.FC<DeletePreviewModalProps> = ({
    visible,
    onClose,
    onConfirm,
    photos,
    onUnmarkDelete,
    totalSize,
}) => {
    const renderItem = ({ item }: { item: { uri: string; fileSize?: number; id: string } }) => (
        <View style={styles.gridItem}>
            <Image source={{ uri: item.uri }} style={styles.gridImage} />
            <View style={styles.imageDimmer} />
            <TouchableOpacity
                style={styles.restoreButton}
                onPress={() => onUnmarkDelete(item.id)}
            >
                <MaterialCommunityIcons name="undo-variant" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.fileSizeText}>{formatFileSize(item.fileSize)}</Text>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Review Deletions ({photos.length})</Text>
                            <Text style={styles.subtitle}>Total size: {totalSize}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={photos}
                        renderItem={renderItem}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.gridContainer}
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmText}>Confirm Deletion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        color: '#999',
        fontSize: 14,
        marginTop: 4,
    },
    closeButton: {
        padding: 4,
    },
    gridContainer: {
        padding: 8,
    },
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
    confirmButton: {
        backgroundColor: '#ff3b30',
        margin: 20,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    confirmText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
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