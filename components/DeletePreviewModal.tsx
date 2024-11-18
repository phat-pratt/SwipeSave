import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, FlatList, Text, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DeletePreviewCard } from './DeletePreviewCard';
import { formatFileSize } from '@/utils/photo';

interface DeletePreviewModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    photos: { id: string; uri: string; fileSize?: number }[];
    onUnmarkDelete: (photoId: string) => void;
    totalSize: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

export const DeletePreviewModal: React.FC<DeletePreviewModalProps> = ({
    visible,
    onClose,
    onConfirm,
    photos,
    onUnmarkDelete,
    totalSize,
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const renderItem = ({ item }: { item: { uri: string; fileSize?: number; id: string } }) => (
        <DeletePreviewCard
            uri={item.uri}
            fileSize={item.fileSize}
            id={item.id}
            onUnmarkDelete={onUnmarkDelete}
        />
    );

    return (
        <>
            {visible && (
                <Animated.View
                    style={[
                        styles.backdrop,
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                />
            )}
            <Modal visible={visible} animationType="slide" transparent >
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
        </>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
        height: MODAL_HEIGHT,
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