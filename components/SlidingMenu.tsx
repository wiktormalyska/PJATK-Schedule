import {Animated, Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useTheme} from "@/hooks/use-theme";
import {useAuthContext} from "@/contexts/AuthContext";
import {SidebarButton} from "@/components/SidebarButton"
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import AntDesign from '@expo/vector-icons/AntDesign';

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = SCREEN_WIDTH * 0.7;

export const useSlideMenu = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const translateX = React.useRef(new Animated.Value(-MENU_WIDTH)).current;
    const {isLightTheme, getTheme} = useTheme();
    const {logout} = useAuthContext()
    const {show, hide} = useLoadingScreen()

    const overlayColor = isLightTheme ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.3)';

    const openMenu = () => {
        setIsOpen(true);
        Animated.timing(translateX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(translateX, {
            toValue: -MENU_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setIsOpen(false));
    };

    interface SlideMenuProps {
        children: React.ReactNode;
    }

    const handleLogout = async () => {
        show()
        await logout()
        hide()
        console.log("Logging out...");
        closeMenu()
    }

    const styles = StyleSheet.create({
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: overlayColor,
        },
        menu: {
            backgroundColor: getTheme().style.backgroundSecondary,
        },
    });

    const render = ({children}: SlideMenuProps) => (
        <>
            {children}
            {isOpen && (
                <>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={closeMenu}
                        activeOpacity={1}
                        className="z-10"
                    />
                    <Animated.View
                        style={[styles.menu, {transform: [{translateX}]}]}
                        className="absolute left-0 top-0 bottom-0 pt-[70px] z-[11]"
                        {...{width: MENU_WIDTH}}
                    >
                        <View className="justify-between w-full h-full p-2.5">
                            <View className="py-5 px-4 flex-1">
                            </View>
                            <View className="py-5 px-4 flex-1 justify-end items-center">
                                <SidebarButton
                                    title="Logout"
                                    onClick={handleLogout}
                                    icon={<AntDesign name="logout" size={24} color="white"/>}
                                />
                            </View>
                        </View>
                    </Animated.View>
                </>
            )}
        </>
    );

    return {
        isOpen,
        openMenu,
        closeMenu,
        render,
    };
};
