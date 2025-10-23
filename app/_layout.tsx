import {StatusBar} from 'react-native';
import {Stack} from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import React from "react";
import {Header} from "@/components/Header";
import {useTheme} from "@/hooks/use-theme";
import {useSlideMenu} from "@/components/SlidingMenu";
import {LoadingScreenProvider} from "@/contexts/LoadingScreenContext";
import {AuthContextProvider, useAuthContext} from "@/contexts/AuthContext";

const AppContent = () => {
    const {getTheme, isLightTheme} = useTheme();
    const {openMenu, closeMenu, isOpen, render: renderSlideMenu} = useSlideMenu();
    const {isAuthenticated} = useAuthContext();

    return (
        <>
            <StatusBar
                barStyle={isLightTheme ? "dark-content" : "light-content"}
                backgroundColor={getTheme().style.background}
            />
            <Header openMenu={() => openMenu()} closeMenu={() => closeMenu()} isMenuOpen={isOpen}></Header>
            {renderSlideMenu({
                children: (
                    <Stack>
                        {isAuthenticated ? (
                            <>
                                <Stack.Screen name="home" options={{title: 'Home', headerShown: false}}/>
                                <Stack.Screen name="about" options={{title: 'About', headerShown: false}}/>
                            </>
                        ) : (
                            <Stack.Screen name="loginPage" options={{title: 'Login', headerShown: false}}/>
                        )}
                    </Stack>
                )
            })}
        </>
    );
};

export default function RootLayout() {
    return (
        <LoadingScreenProvider>
            <AuthContextProvider>
                <AppContent/>
            </AuthContextProvider>
        </LoadingScreenProvider>
    );
}