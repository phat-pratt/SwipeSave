import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    onUndo?: () => void;
};

export const DeleteOverlay: React.FC<Props> = ({ onUndo }) => (
    <View style={styles.deleteOverlay}>
        <MaterialCommunityIcons name="delete-clock" size={40} color="white" />
        <Text style={styles.deleteText}>Marked for deletion</Text>
        {onUndo && (
            <TouchableOpacity onPress={onUndo} style={styles.undoButton}>
                <Text style={styles.undoText}>UNDO</Text>
            </TouchableOpacity>
        )}
    </View>
);

const styles = StyleSheet.create({
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
    undoButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginTop: 12,
    },
    undoText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});