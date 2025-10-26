import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import {useTheme} from "@/contexts/ThemeContext";

interface LoadingScreenProps {
    visible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ visible }) => {
    const {currentTheme, isLightTheme} = useTheme();

    const overlayColor = isLightTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

    if (!visible) return null;

    const styles = StyleSheet.create({
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        },
        container: {
            backgroundColor: currentTheme.style.backgroundSecondary,
            padding: 30,
            borderRadius: currentTheme.style.borderRadius,
            elevation: 5,
        },
    });

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.dark.tint} />
            </View>
        </View>
    );
};


