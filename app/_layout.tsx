import {StatusBar} from 'react-native';
import {Stack} from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import React from "react";
import {Header} from "@/components/Header";
import {useTheme, ThemeProvider} from "@/contexts/ThemeContext";
import {useSlideMenu} from "@/components/SlidingMenu";
import {LoadingScreenProvider} from "@/contexts/LoadingScreenContext";
import {AuthContextProvider, useAuthContext} from "@/contexts/AuthContext";
import {PageTitleProvider} from "@/contexts/PageTitleContext";

const AppContent = () => {
    const {currentTheme, isLightTheme} = useTheme();
    const {openMenu, closeMenu, isOpen, render: renderSlideMenu} = useSlideMenu();
    const {isAuthenticated} = useAuthContext();

    return (
        <>
            <StatusBar
                barStyle={isLightTheme ? "dark-content" : "light-content"}
                backgroundColor={currentTheme.style.background}
            />
            <Header openMenu={() => openMenu()} closeMenu={() => closeMenu()} isMenuOpen={isOpen}></Header>
            {renderSlideMenu({
                children: (
                    <Stack screenOptions={{headerShown: false}}>
                        {isAuthenticated ? (
                            <>
                                <Stack.Screen name="home"/>
                                <Stack.Screen name="about"/>
                            </>
                        ) : (
                            <Stack.Screen name="loginPage"/>
                        )}
                    </Stack>
                )
            })}
        </>
    );
};

export default function RootLayout() {
    return (
        <ThemeProvider>
            <LoadingScreenProvider>
                <PageTitleProvider>
                    <AuthContextProvider>
                        <AppContent/>
                    </AuthContextProvider>
                </PageTitleProvider>
            </LoadingScreenProvider>
        </ThemeProvider>
    );
}