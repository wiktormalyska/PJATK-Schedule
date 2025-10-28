import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {ThemeNames, useTheme} from "@/contexts/ThemeContext";
import {LOGIN_STORAGE_KEY, useAuthContext} from "@/contexts/AuthContext";
import {Button, SidebarButtonType} from "@/components/Button"
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import Feather from '@expo/vector-icons/Feather';
import {useDev} from "@/hooks/use-dev";
import useStorage from "@/hooks/use-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = SCREEN_WIDTH * 0.7;

export const useSlideMenu = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const translateX = React.useRef(new Animated.Value(-MENU_WIDTH)).current;
    const {isLightTheme, currentTheme, setTheme} = useTheme();
    const {logout} = useAuthContext()
    const {show, hide} = useLoadingScreen()
    const {isDev, cleanupSetupData} = useDev()
    const {loadData} = useStorage()

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

    const handleThemeSwitch = async () => {
        show()
        if (isLightTheme) {
            await setTheme(ThemeNames.DARK)
        } else {
            await setTheme(ThemeNames.LIGHT)
        }
        hide()
    }

    const styles = StyleSheet.create({
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: overlayColor,
        },
        menu: {
            backgroundColor: currentTheme.style.backgroundSecondary,
        },
        user: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        userText: {
            fontSize: 16,
            color: currentTheme.style.text,
            fontWeight: 'bold',
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
                            <View className="py-5 px-4 flex-1 gap-5">
                                <Button
                                    title="Change Theme"
                                    onClick={handleThemeSwitch}
                                    type={SidebarButtonType.SECONDARY}
                                    icon={<Feather name={isLightTheme ? "sun" : "moon"} size={24}
                                                   color={isLightTheme ? currentTheme.style.text : "white"}/>}
                                />
                                {isDev ? (
                                    <Button
                                        title="[DEV] Clear Setup Data"
                                        onClick={cleanupSetupData}
                                        type={SidebarButtonType.SECONDARY}
                                        icon={
                                        <Feather
                                            name="code"
                                            size={24}
                                            color={isLightTheme ? currentTheme.style.text : "white"}
                                        />}
                                    />
                                ) : null
                                }

                            </View>
                            <View className="py-5 px-4 flex-1 justify-end items-center w-[100%]} gap-5">
                                <View style={styles.user}>
                                    <Feather
                                        name="user"
                                        size={24}
                                        color={isLightTheme ? currentTheme.style.text : "white"} />
                                    <Text style={styles.userText}>{loadData(LOGIN_STORAGE_KEY)}</Text>
                                </View>

                                <Button
                                    title="Logout"
                                    onClick={handleLogout}
                                    icon={<Feather name="log-out" size={24}
                                                   color={isLightTheme ? currentTheme.style.text : "white"}/>}
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
