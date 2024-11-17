
import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DeletePreviewModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    photos: { id: string; uri: string }[];
}

export const DeletePreviewModal: React.FC<DeletePreviewModalProps> = ({
    visible,
    onClose,
    onConfirm,
    photos,
}) => {
    const renderItem = ({ item }: { item: { uri: string } }) => (
        <View style={styles.gridItem}>
            <Image source={{ uri: item.uri }} style={styles.gridImage} />
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Review Deletions ({photos.length})</Text>
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
    },
    gridImage: {
        flex: 1,
        borderRadius: 8,
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
});