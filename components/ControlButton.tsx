import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { SIZES } from '../constants/theme';

interface ControlButtonProps {
    onPress: () => void;
    disabled?: boolean;
    variant?: 'default' | 'delete' | 'continue';
    children: React.ReactNode;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
    onPress,
    disabled,
    variant = 'default',
    children,
}) => {
    const buttonStyle = [
        styles.button,
        variant === 'delete' && styles.deleteButton,
        variant === 'continue' && styles.continueButton,
        disabled && styles.disabledButton,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: SIZES.button,
        borderRadius: SIZES.buttonRadius,
        aspectRatio: 1,
        backgroundColor: Colors.dark.button.base,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        opacity: 0.85,
    },
    deleteButton: {
        backgroundColor: Colors.dark.button.delete,
    },
    continueButton: {
        backgroundColor: Colors.dark.button.continue,
    },
    disabledButton: {
        opacity: 0.5,
    },
});