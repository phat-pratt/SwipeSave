import { requestPermissionsAsync } from "expo-media-library";
import { Alert, Linking, Platform } from "react-native";

export const getRequestPermissions = async () => {
    const { status, accessPrivileges } = await requestPermissionsAsync(false);

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

    return status === 'granted'
};