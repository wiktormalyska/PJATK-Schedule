import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {useTheme} from "@/contexts/ThemeContext";

import React from "react";
interface SidebarButtonProps {
    onClick: () => void;
    title: string;
    icon?: React.ReactNode;
    type? : SidebarButtonType;
}

export enum SidebarButtonType {
    MAIN,
    SECONDARY
}

export const Button = ({onClick, title, icon, type = SidebarButtonType.MAIN} : SidebarButtonProps) => {
    const {currentTheme} = useTheme();

    const styles = StyleSheet.create({
        buttonMain: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            gap: 12,
            backgroundColor: currentTheme.style.backgroundSecondary,
            borderRadius: currentTheme.style.borderRadius,
            borderWidth: 1,
            borderColor: currentTheme.style.tint,
        },
        buttonSecondary: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            gap: 12,
            backgroundColor: currentTheme.style.backgroundSecondary,
            borderRadius: currentTheme.style.borderRadius,
            borderWidth: 1,
            borderColor: currentTheme.style.text,
        },
        textMain: {
            color: currentTheme.style.text,
            fontWeight: "bold",
            fontSize: 16,
            lineHeight: 16,
            includeFontPadding: false,
        },
        textSecondary: {
            color: currentTheme.style.text,
            fontWeight: "bold",
            fontSize: 16,
            lineHeight: 16,
            includeFontPadding: false,
        }
    });

    const buttonStyle = type === SidebarButtonType.SECONDARY ? styles.buttonSecondary : styles.buttonMain;
    const textStyle = type === SidebarButtonType.SECONDARY ? styles.textSecondary : styles.textMain;


    return (
        <TouchableOpacity onPress={onClick} style={buttonStyle}>
            {icon? icon : null}
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
}