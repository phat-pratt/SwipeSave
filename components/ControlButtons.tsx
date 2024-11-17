import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
    onSwipeLeft,
    onGoBack,
    onDelete,
    onContinue,
    deleteCount,
    canGoBack,
    onPreviewDelete,
}) => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onSwipeLeft}>
                <MaterialCommunityIcons name="delete-sweep" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    styles.roundButton,
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
                    styles.roundButton,
                    deleteCount === 0 && styles.disabledButton
                ]}
                onPress={onPreviewDelete}
                disabled={deleteCount === 0}
            >
                <Badge count={deleteCount} />
                <MaterialCommunityIcons
                    name="delete-clock-outline"
                    size={24}
                    color={deleteCount === 0 ? '#666666' : 'white'}
                />
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
        height: 60,
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
    roundButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    disabledButton: {
        opacity: 0.5,
    },
});