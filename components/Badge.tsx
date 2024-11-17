
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
    count: number;
}

export const Badge: React.FC<BadgeProps> = ({ count }) => {
    if (count === 0) {
        return null
    };

    return (
        <View style={styles.badge}>
            <Text style={styles.text}>{count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'white',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: '#3A3D45',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 6,
    },
});