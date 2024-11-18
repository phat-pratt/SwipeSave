import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge } from './Badge';

const ICON_SIZE = 30;

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

    const deleteDiabled = deleteCount === 0;

    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onSwipeLeft}>
                <MaterialCommunityIcons name="delete-sweep" size={ICON_SIZE} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    !canGoBack && styles.disabledButton
                ]}
                onPress={onGoBack}
                disabled={!canGoBack}
            >
                <AntDesign
                    name="arrowleft"
                    size={ICON_SIZE}
                    color={!canGoBack ? '#666666' : 'white'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    deleteDiabled && styles.disabledButton
                ]}
                onPress={onPreviewDelete}
                disabled={deleteDiabled}
            >
                <Badge count={deleteCount} />
                <View style={styles.deleteButtonContent}>
                    <MaterialCommunityIcons
                        name="delete-clock-outline"
                        size={deleteDiabled ? ICON_SIZE : 24}
                        color={deleteDiabled ? '#666666' : 'white'}
                    />
                    {totalSize && !deleteDiabled && (
                        <Text style={styles.sizeText}>{totalSize}</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={onContinue}>
                <AntDesign name="arrowright" size={ICON_SIZE} color="white" />
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
        height: 80,
        borderRadius: 40,
        aspectRatio: 1,
        backgroundColor: '#2A2D35', // Darker background color
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        opacity: 0.85, // Added opacity to all buttons
    },
    deleteButton: {
        backgroundColor: '#463235', // Subtle red tint
    },
    continueButton: {
        backgroundColor: '#324535', // Subtle green tint
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
        fontSize: 11,
        marginTop: 4,
        opacity: 0.8,
    },
});