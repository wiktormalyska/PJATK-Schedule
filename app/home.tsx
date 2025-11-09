import {View, StyleSheet, Text} from "react-native";
import {useTheme} from "@/contexts/ThemeContext";
import {usePageTitle} from "@/contexts/PageTitleContext";
import {useEffect} from "react";
import {useScheduleData} from "@/contexts/ScheduleDataContext";

export default function Home() {
    const {currentTheme} = useTheme();
    const {setTitle} = usePageTitle();
    const {currentWeek} = useScheduleData()

    useEffect(() => {
        setTitle("Schedule")
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: currentTheme.style.background
        },
        header: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
        },
        text: {
            color: currentTheme.style.text,
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>{currentWeek}</Text>
            </View>
        </View>
    )
}