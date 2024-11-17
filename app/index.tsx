import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

    const [assetsToDelete, setAssetsToDelete] = useState<string[]>([]);


    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const ref = useRef<SwiperCardRefType>();

    const getPermissions = async () => {
        // Request permission with readOnly: false to get write access as well
        const { status, accessPrivileges } = await MediaLibrary.requestPermissionsAsync(false);
        console.log({ status, accessPrivileges })
        // On iOS, check if we have limited access and request full access if needed
        if (Platform.OS === 'ios' && status === 'granted' && accessPrivileges === 'limited') {
            Alert.alert(
                "Limited Access",
                "For the best experience, please allow access to all photos in settings.",
                [
                    { text: "Cancel" },
                    { text: "Open Settings", onPress: () => Linking.openSettings() }
                ]
            );
        }

        setHasPermission(status === 'granted');
    };

    const loadPhotos = async () => {
        if (!hasPermission) {
            return
        };

        try {
            // Load all photos without a limit
            const { assets, hasNextPage, endCursor } = await MediaLibrary.getAssetsAsync({
                mediaType: 'photo',
                first: 50, // Increased initial load
                sortBy: [MediaLibrary.SortBy.creationTime]
            });

            let allAssets = [...assets];

            const photosWithUri = await Promise.all(
                allAssets.map(async (asset) => ({
                    ...asset,
                    properUri: await getPhotoUri(asset)
                }))
            );

            setPhotos(photosWithUri);
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    };

    // Rest 
    const getPhotoUri = async (asset) => {
        try {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
            return assetInfo.localUri || assetInfo.uri;
        } catch (error) {
            console.error('Error getting photo URI:', error);
            return null;
        }
    };

    useEffect(() => {
        getPermissions();
    }, []);

    useEffect(() => {
        if (hasPermission) {
            loadPhotos();
        }
    }, [hasPermission]);

    const renderCard = useCallback((photo) => {
        return (
            <View style={styles.renderCardContainer}>
                <Image
                    source={{ uri: photo.properUri }}
                    style={styles.renderCardImage}
                    resizeMode="cover"
                />
            </View>
        );
    }, []);

    const OverlayLabelRight = useCallback(() => {
        return (
            <View style={[styles.overlayLabelContainer, { backgroundColor: 'rgba(0, 255, 0, 0.2)' }]} />
        );
    }, []);

    const OverlayLabelLeft = useCallback(() => {
        return (
            <View style={[styles.overlayLabelContainer, { backgroundColor: 'rgba(255, 0, 0, 0.2)' }]} />
        );
    }, []);

    const OverlayLabelTop = useCallback(() => {
        return (
            <View style={[styles.overlayLabelContainer, { backgroundColor: 'rgba(0, 0, 255, 0.2)' }]} />
        );
    }, []);

    const onPrepareToDelete = async (cardIndex: number) => {
        setAssetsToDelete([...assetsToDelete, photos[cardIndex].id])
    }

    const onContinue = () => { ref.current?.swipeRight() }
    const onGoBack = () => { ref.current?.swipeBack() }
    const onRequestToDeleteImages = async () => {
        if (assetsToDelete.length > 0) {
            await MediaLibrary.deleteAssetsAsync(assetsToDelete)
        }
    }

    const onLoadMorePhotos = async () => { };

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to photos</Text>
                <Button title="Request Permission" onPress={getPermissions} />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.subContainer}>
                <Swiper
                    ref={ref}
                    cardStyle={styles.cardStyle}
                    data={photos}
                    renderCard={renderCard}
                    onSwipeLeft={onPrepareToDelete}
                    OverlayLabelRight={OverlayLabelRight}
                    OverlayLabelLeft={OverlayLabelLeft}
                    OverlayLabelTop={OverlayLabelTop}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        ref.current?.swipeLeft();
                    }}
                >
                    <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { height: 60, width: 60, borderRadius: 30 }]}
                    onPress={onGoBack}
                >
                    <AntDesign name="reload1" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { height: 60, width: 60, borderRadius: 30 }]}
                    onPress={onRequestToDeleteImages}
                >
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onContinue}
                >
                    <AntDesign name="heart" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        bottom: 34,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        height: 80,
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
    cardStyle: {
        width: '95%',
        height: '75%',
        borderRadius: 15,
        marginVertical: 20,
    },
    renderCardContainer: {
        flex: 1,
        borderRadius: 15,
        height: '75%',
        width: '100%',
    },
    renderCardImage: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
});

export default PhotoGallery;