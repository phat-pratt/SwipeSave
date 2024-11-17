
import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
    imageUri?: string;
};

export const BlurredBackground: React.FC<Props> = ({ imageUri }) => {
    if (!imageUri) return null;

    return (
        <ImageBackground
            source={{ uri: imageUri }}
            style={styles.background}
        >
            <BlurView intensity={80} style={styles.blur} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    blur: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});