import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {ThemeNames, useTheme} from "@/contexts/ThemeContext";
import {usePageTitle} from "@/contexts/PageTitleContext";
import React, {useEffect} from "react";
import {Logo} from "@/components/Logo";
import Authors from "@/components/Authors";
import {Button, SidebarButtonType} from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";

export default function WelcomePage() {
    const {currentTheme, isLightTheme, setTheme} = useTheme()
    const {setTitle} = usePageTitle()
    const {show, hide} = useLoadingScreen()

    useEffect(() => {
        setTitle("PJATK Schedule")
    })

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
        container: {
            flex: 1,
            backgroundColor: currentTheme.style.background,
            alignItems: 'center',
            paddingBottom: 50,
            height: "100%",
            paddingTop: 50,
        },
        textHeaderContainer: {
            marginTop: 1,
        },
        textHeader: {
            color: currentTheme.style.text,
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "center",
        },
        topContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            gap: 20,
        },
        bottomContainer: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        text: {
            color: currentTheme.style.text,
            fontSize: 18,
            textAlign: "center",
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Logo height={"150"} width={"150"}></Logo>
                <View style={styles.bottomContainer}>
                    <Text style={styles.textHeader}>Welcome to</Text>
                    <Text style={styles.textHeader}>PJATK Schedule</Text>
                </View>

            </View>
            <View style={styles.centerContainer}>
                <Button
                    onClick={() => {
                        console.log("Hello!")
                    }}
                    title={"Setup"}
                    icon={
                        <Feather name="arrow-right" size={24} color={currentTheme.style.text}/>
                    }>
                </Button>
                <Button
                    title="Change Theme"
                    onClick={handleThemeSwitch}
                    type={SidebarButtonType.SECONDARY}
                    icon={<Feather name={isLightTheme ? "sun" : "moon"} size={24}
                                   color={isLightTheme ? currentTheme.style.text : "white"}/>}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.text}>Authors:</Text>
                <Authors/>
            </View>
        </View>
    )
}