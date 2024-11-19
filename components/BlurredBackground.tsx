import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
    imageUri?: string;
};

export const BlurredBackground: React.FC<Props> = ({ imageUri }) => {
    return (
        <BlurView
            intensity={100}
            style={styles.blurContainer}
        >
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.backgroundImage}
                    blurRadius={25}
                />
            )}
        </BlurView>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});