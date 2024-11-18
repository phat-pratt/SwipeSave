
import React from 'react';
import { View, StyleSheet } from 'react-native';

export enum OverlayDirection {
    RIGHT = 'right',
    LEFT = 'left',
    TOP = 'top'
}

const OVERLAY_COLORS = {
    [OverlayDirection.RIGHT]: 'rgba(0, 255, 0, 0.2)',
    [OverlayDirection.LEFT]: 'rgba(255, 0, 0, 0.2)',
    [OverlayDirection.TOP]: 'rgba(0, 0, 255, 0.2)',
};

type Props = {
    direction: OverlayDirection;
    customColor?: string;
};

export const OverlayLabel: React.FC<Props> = React.memo(({ direction, customColor }) => (
    <View
        style={[
            styles.overlayLabelContainer,
            { backgroundColor: customColor || OVERLAY_COLORS[direction] }
        ]}
    />
));

const styles = StyleSheet.create({
    overlayLabelContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});