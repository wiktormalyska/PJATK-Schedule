import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useTheme} from "@/contexts/ThemeContext";
import {Button, SidebarButtonType} from "@/components/Button";
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import {useModal} from "@/contexts/ModalContext";
import {usePrivacyPolicy} from "@/hooks/use-privacy-policy";
import {useRouter} from "expo-router";

export const PrivacyPolicy = () => {
    const {currentTheme} = useTheme();
    const {setIsPrivacyPolicyConfirmed} = usePrivacyPolicy()
    const {show, hide} = useLoadingScreen()
    const {closeModal} = useModal();
    const router = useRouter()

    const handleAccept = async () => {
        show()
        await setIsPrivacyPolicyConfirmed(true);
        closeModal();
        router.replace('/home');
        hide()
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 12,
        },
        h1: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
            color: currentTheme.style.text
        },
        h2: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 16,
            marginBottom: 8,
            color: currentTheme.style.text
        },
        paragraph: {
            fontSize: 16,
            lineHeight: 22,
            marginBottom: 12,
            color: currentTheme.style.textSecondary
        },
        italic: {
            fontSize: 14,
            fontStyle: 'italic',
            marginBottom: 16,
            color: currentTheme.style.textSecondary
        },
        layout: {
            flex: 1,
            gap: 20
        }
    });

    return (
        <View style={styles.layout}>
            <ScrollView style={styles.container}>
                <Text style={styles.h1}>Privacy Policy</Text>
                <Text style={styles.italic}>Last updated: October 27, 2025</Text>

                <Text style={styles.paragraph}>
                    This Privacy Policy describes how Wiktor Małyska ("we," "us," or "our") manages data when you use the PJATK Schedule mobile application ("Application").
                </Text>

                <Text style={styles.h2}>1. Data Collection and Use</Text>
                <Text style={styles.paragraph}>
                    The Application was designed with your privacy in mind.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.paragraph}>All data necessary for the application's operation (such as authentication credentials for PJATK services, user preferences, etc.) is stored </Text>
                    <Text style={[styles.paragraph, {fontWeight: 'bold'}]}>exclusively locally on your device</Text>
                    <Text style={styles.paragraph}>.</Text>
                </Text>

                <Text style={styles.paragraph}>
                    <Text style={styles.paragraph}>This data is used by the Application </Text>
                    <Text style={[styles.paragraph, {fontWeight: 'bold'}]}>solely for the purpose of communicating with the official services of the Polish-Japanese Academy of Information Technology (PJATK)</Text>
                    <Text style={styles.paragraph}> to retrieve information necessary for the Application and its functions (e.g., class schedules, grades).</Text>
                </Text>

                <Text style={styles.paragraph}>
                    We do not collect, store, or share your personal data on any external servers not belonging to PJATK. We do not share your data with any third parties for marketing or analytical purposes.
                </Text>

                <Text style={styles.h2}>2. Data Security</Text>
                <Text style={styles.paragraph}>
                    The security of your data is important to us. Since data is stored only on your device, its security also depends on the general security of your device (such as screen lock passwords, operating system updates, etc.).
                </Text>

                <Text style={styles.h2}>3. Children's Privacy</Text>
                <Text style={styles.paragraph}>
                    Our Application is not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13.
                </Text>

                <Text style={styles.h2}>4. Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update our Privacy Policy from time to time. Any changes will be posted within the Application
                    and will take effect from the "Last updated" date visible at the top of this policy. It is
                    recommended to review this page regularly.
                </Text>

                <Text style={styles.h2}>5. Contact</Text>
                <Text style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, please contact us at: wiktormalyska03@gmail.com
                </Text>
            </ScrollView>
            <Button onClick={handleAccept} title={"Click to accept Privacy Policy"} type={SidebarButtonType.SECONDARY}></Button>
        </View>
    )
}
