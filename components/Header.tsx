import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

// import Logo from "@/assets/Logo.svg"; // Replace with your SVG import

interface HeaderProps {
    openMenu?: () => void;
    closeMenu?: () => void;
    isMenuOpen?: boolean;
}

export const Header = ({openMenu, closeMenu, isMenuOpen}: HeaderProps) => (
    <View className="flex flex-row items-center justify-between p-4 pt-7"
          style={{
              backgroundColor: "#222", // adjust as needed
              zIndex: 999
          }}
    >
        <TouchableOpacity onPress={isMenuOpen ? closeMenu : openMenu}>
            <View style={{ width: 28, height: 28, justifyContent: "center", alignItems: "center" }}>
                {isMenuOpen ? (
                    // "X" icon
                    <>
                        <View style={{
                            position: "absolute",
                            width: 22,
                            height: 3,
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            transform: [{ rotate: "45deg" }]
                        }} />
                        <View style={{
                            position: "absolute",
                            width: 22,
                            height: 3,
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            transform: [{ rotate: "-45deg" }]
                        }} />
                    </>
                ) : (
                    // Hamburger icon
                    <>
                        <View style={{ height: 3, backgroundColor: "#fff", marginVertical: 2, borderRadius: 2, width: 22 }} />
                        <View style={{ height: 3, backgroundColor: "#fff", marginVertical: 2, borderRadius: 2, width: 22 }} />
                        <View style={{ height: 3, backgroundColor: "#fff", marginVertical: 2, borderRadius: 2, width: 22 }} />
                    </>
                )}
            </View>
        </TouchableOpacity>
        {/* Logo */}
        {/* <Logo width={32} height={32} /> */}
        <View style={{flex: 1, alignItems: "center"}}>
            <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold"}}>Schedule</Text>
        </View>
        {/* Placeholder for spacing */}
        <View style={{width: 28}}/>
    </View>
);
