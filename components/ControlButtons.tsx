import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge } from './Badge';

interface ControlButtonsProps {
    onSwipeLeft: () => void;
    onGoBack: () => void;
    onDelete: () => void;
    onContinue: () => void;
    deleteCount: number;
    canGoBack: boolean;
    onPreviewDelete: () => void;
    totalSize?: string;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
    onSwipeLeft,
    onGoBack,
    onDelete,
    onContinue,
    deleteCount,
    canGoBack,
    onPreviewDelete,
    totalSize,
}) => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onSwipeLeft}>
                <MaterialCommunityIcons name="delete-sweep" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    !canGoBack && styles.disabledButton
                ]}
                onPress={onGoBack}
                disabled={!canGoBack}
            >
                <Entypo
                    name="back-in-time"
                    size={24}
                    color={!canGoBack ? '#666666' : 'white'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    deleteCount === 0 && styles.disabledButton
                ]}
                onPress={onPreviewDelete}
                disabled={deleteCount === 0}
            >
                <Badge count={deleteCount} />
                <View style={styles.deleteButtonContent}>
                    <MaterialCommunityIcons
                        name="delete-clock-outline"
                        size={24}
                        color={deleteCount === 0 ? '#666666' : 'white'}
                    />
                    {totalSize && deleteCount > 0 && (
                        <Text style={styles.sizeText}>{totalSize}</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onContinue}>
                <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        bottom: 44,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        height: 70,
        borderRadius: 40,
        aspectRatio: 1,
        backgroundColor: '#3A3D45',
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    disabledButton: {
        opacity: 0.5,
    },
    deleteButtonContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        color: 'white',
        fontSize: 10,
        marginTop: 2,
        opacity: 0.8,
    },
});