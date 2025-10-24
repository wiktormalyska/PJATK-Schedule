import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {useTheme} from "@/hooks/use-theme";

import React from "react";

interface SidebarButtonProps {
    onClick: () => void;
    title: string;
    icon: React.ReactNode;
}

export const SidebarButton = ({onClick, title, icon} : SidebarButtonProps) => {
    const {getTheme} = useTheme();

    const styles = StyleSheet.create({
        button: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            gap: 12,
            backgroundColor: getTheme().style.tint,
            width: "100%",
            borderRadius: getTheme().style.borderRadius,
        },
        text: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            lineHeight: 16,
            includeFontPadding: false,
        }
    })

    return (
        <TouchableOpacity onPress={onClick} style={styles.button}>
            {icon}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}