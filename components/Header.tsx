import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {useTheme} from "@/hooks/use-theme";
import {useAuthContext} from "@/contexts/AuthContext";
import {Logo} from "@/components/Logo";

// import Logo from "@/assets/Logo.svg"; // Replace with your SVG import

interface HeaderProps {
    openMenu?: () => void;
    closeMenu?: () => void;
    isMenuOpen?: boolean;
}

export const Header = ({openMenu, closeMenu, isMenuOpen}: HeaderProps) => {
    const {getTheme} = useTheme()
    const {isAuthenticated} = useAuthContext()

    return (
        <View className="flex flex-row items-center justify-between p-4 pt-7"
              style={{
                  backgroundColor: getTheme().style.backgroundSecondary,
                  zIndex: 999
              }}
        >
            <TouchableOpacity onPress={isMenuOpen ? closeMenu : openMenu}
                              style={
                                  isAuthenticated? {} : {display: "none"}
                              }
            >
                <View style={{width: 28, height: 28, justifyContent: "center", alignItems: "center"}}>
                    {isMenuOpen ? (
                        // "X" icon
                        <>
                            <View style={{
                                position: "absolute",
                                width: 22,
                                height: 3,
                                backgroundColor: getTheme().style.text,
                                borderRadius: 2,
                                transform: [{rotate: "45deg"}]
                            }}/>
                            <View style={{
                                position: "absolute",
                                width: 22,
                                height: 3,
                                backgroundColor: getTheme().style.text,
                                borderRadius: 2,
                                transform: [{rotate: "-45deg"}]
                            }}/>
                        </>
                    ) : (
                        // Hamburger icon
                        <>
                            <View style={{
                                height: 3,
                                backgroundColor: getTheme().style.text,
                                marginVertical: 2,
                                borderRadius: 2,
                                width: 22
                            }}/>
                            <View style={{
                                height: 3,
                                backgroundColor: getTheme().style.text,
                                marginVertical: 2,
                                borderRadius: 2,
                                width: 22
                            }}/>
                            <View style={{
                                height: 3,
                                backgroundColor: getTheme().style.text,
                                marginVertical: 2,
                                borderRadius: 2,
                                width: 22
                            }}/>
                        </>
                    )}
                </View>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8}}>
                <Logo width={"28"} height={"28"} />
                <Text style={{color: getTheme().style.text, fontSize: 20, fontWeight: "bold"}}>Schedule</Text>
            </View>
            {/* Placeholder for spacing */}
            <View style={{width: 28}}/>
        </View>
    )
};
