import {View, StyleSheet, Text} from "react-native";
import {useTheme} from "@/hooks/use-theme";
import {usePageTitle} from "@/contexts/PageTitleContext";
import {useEffect} from "react";

export default function Home() {
    const {getTheme} = useTheme();
    const {setTitle} = usePageTitle();

    useEffect(() => {
        setTitle("Schedule")
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: getTheme().style.background
        }
    })

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}