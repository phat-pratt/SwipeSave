import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { SIZES } from '../constants/theme';
import { Badge } from './Badge';
import { ControlButton } from './ControlButton';


export interface ControlButtonsProps {
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
    onContinue,
    deleteCount,
    canGoBack,
    onPreviewDelete,
    totalSize,
}) => {
    const isDeleteDisabled = deleteCount === 0;

    return (
        <View style={styles.container}>
            <ControlButton onPress={onSwipeLeft} variant="delete">
                <MaterialCommunityIcons
                    name="delete-sweep"
                    size={SIZES.icon}
                    color={Colors.dark.text}
                />
            </ControlButton>

            <ControlButton onPress={onGoBack} disabled={!canGoBack}>
                <AntDesign
                    name="arrowleft"
                    size={SIZES.icon}
                    color={!canGoBack ? Colors.dark.button.disabled : Colors.dark.text}
                />
            </ControlButton>

            <ControlButton onPress={onPreviewDelete} disabled={isDeleteDisabled}>
                <Badge count={deleteCount} />
                <View style={styles.deleteButtonContent}>
                    <MaterialCommunityIcons
                        name="delete-clock-outline"
                        size={isDeleteDisabled ? SIZES.icon : 24}
                        color={isDeleteDisabled ? Colors.dark.button.disabled : Colors.dark.text}
                    />
                    {totalSize && !isDeleteDisabled && (
                        <Text style={styles.sizeText}>{totalSize}</Text>
                    )}
                </View>
            </ControlButton>

            <ControlButton onPress={onContinue} variant="continue">
                <AntDesign
                    name="arrowright"
                    size={SIZES.icon}
                    color={Colors.dark.text}
                />
            </ControlButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        bottom: 44,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deleteButtonContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        color: Colors.dark.text,
        fontSize: 11,
        marginTop: 4,
        opacity: 0.8,
    },
});