
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    onOpenPhoto: () => void;
};

export const ActionOverlay: React.FC<Props> = ({ onOpenPhoto }) => (
    <View style={styles.actionOverlay}>
        <TouchableOpacity style={styles.actionButton} onPress={onOpenPhoto}>
            <Ionicons name="images-outline" size={32} color="white" />
            <Text style={styles.actionText}>Open in Photos</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
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