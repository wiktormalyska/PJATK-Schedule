import {View, StyleSheet, Text} from "react-native";
import {useTheme} from "@/contexts/ThemeContext";
import {usePageTitle} from "@/contexts/PageTitleContext";
import {useEffect} from "react";

export default function Home() {
    const {currentTheme} = useTheme();
    const {setTitle} = usePageTitle();

    useEffect(() => {
        setTitle("Schedule")
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentTheme.style.background
        }
    })

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}