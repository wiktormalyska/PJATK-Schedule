import {StatusBar} from 'react-native';
import {Stack} from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import React from "react";
import {useAuth} from '@/hooks/use-auth';
import {Header} from "@/components/Header";
import {ThemeNames, useTheme} from "@/hooks/use-theme";
import {useSlideMenu} from "@/components/SlidingMenu";


export default function RootLayout() {
    const {isAuthenticated} = useAuth();
    const {getTheme} = useTheme();
    const {openMenu, closeMenu, isOpen, render} = useSlideMenu();

    const currentTheme = getTheme();
    const isLightTheme = currentTheme.name === ThemeNames.LIGHT;

    return (
        <>
            <StatusBar
                barStyle={isLightTheme ? "dark-content" : "light-content"}
                backgroundColor={getTheme().style.background}
            />
            <Header openMenu={() => openMenu()} closeMenu={() => closeMenu()} isMenuOpen={isOpen}></Header>
            {render({children: (
                    <Stack>
                        {isAuthenticated ? (
                            <>
                                <Stack.Screen name="home" options={{title: 'Home'}}/>
                                <Stack.Screen name="about" options={{title: 'About'}}/>
                            </>
                        ) : (
                            <Stack.Screen name="loginPage" options={{title: 'Login', headerShown: false}}/>
                        )}
                    </Stack>
                )})}
        </>
    );
}
