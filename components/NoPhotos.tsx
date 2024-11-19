import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const NoPhotos = () => {
    const handleAddPhotos = async () => {

    };

    return (
        <View style={styles.noPhotosContainer}>
            <MaterialCommunityIcons
                name="image-off"
                size={64}
                color="white"
                style={styles.noPhotosIcon}
            />
            <Text style={styles.noPhotosText}>No Photos Found</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPhotos}
            >
                <MaterialCommunityIcons
                    name="image-plus"
                    size={24}
                    color="white"
                    style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Add Photos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    noPhotosContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noPhotosIcon: {
        marginBottom: 16,
    },
    noPhotosText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 24,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});