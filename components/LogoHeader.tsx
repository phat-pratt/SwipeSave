
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SWIPE_SAVE_LOGO = require('../assets/images/swipe_save.png');

export const LogoHeader = () => (
    <View style={styles.headerContainer}>
        <Image
            source={SWIPE_SAVE_LOGO}
            style={styles.headerImage}
            resizeMode="contain"
        />
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    headerImage: {
        height: 80,
    },
});