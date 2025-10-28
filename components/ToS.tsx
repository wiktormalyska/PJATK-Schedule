import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useTheme} from "@/contexts/ThemeContext";
import {Button, SidebarButtonType} from "@/components/Button";
import {useTos} from "@/hooks/use-tos";
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import {useModal} from "@/contexts/ModalContext";
import {PrivacyPolicy} from "@/components/PrivacyPolicy";

export const ToS = () => {
    const {currentTheme} = useTheme();
    const {setIsTosConfirmed, getIsTosConfirmed} = useTos()
    const {show, hide} = useLoadingScreen()
    const {setTitle, setContent} = useModal();

    const handleAccept = async () => {
        show()
        console.log(await getIsTosConfirmed());
        await setIsTosConfirmed(true);
        console.log(await getIsTosConfirmed());
        setTitle("Privacy Policy");
        setContent(<PrivacyPolicy />);
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
                <Text style={styles.h1}>Terms of Service</Text>
                <Text style={styles.italic}>Last updated: October 27, 2025</Text>

                <Text style={styles.h2}>Agreement to Terms</Text>
                <Text style={styles.paragraph}>
                    These Terms of Service constitute a legally binding agreement made between you ("User") and Wiktor
                    Małyska ("we," "us," or "our"), regarding your access to and use of the PJATK Schedule mobile
                    application (“App”) and any related services.
                </Text>

                <Text style={styles.h2}>Acceptance</Text>
                <Text style={styles.paragraph}>
                    By accessing or using the App, you agree to comply with and be bound by these Terms. If you do not
                    agree, please do not use the App.
                </Text>

                <Text style={styles.h2}>License to Use</Text>
                <Text style={styles.paragraph}>
                    We grant you a limited, non-exclusive, non-transferable license to use the App for personal,
                    non-commercial purposes. All rights not expressly granted are reserved.
                </Text>

                <Text style={styles.h2}>Changes to App and Data Collection</Text>
                <Text style={styles.paragraph}>
                    We reserve the right to update, change, or remove any part of the App, including which data we
                    collect,
                    at any time and for any reason without prior notice. By continuing to use the App, you accept these
                    modifications.
                </Text>

                <Text style={styles.h2}>Data Storage</Text>
                <Text style={styles.paragraph}>
                    Personal data is stored locally on your device and is used solely for the purpose of communicating
                    with
                    PJATK services to retrieve data necessary for the application and its functions. We do not share or
                    transfer your personal data to any other external servers.
                </Text>

                <Text style={styles.h2}>Use of Third-Party Materials</Text>
                <Text style={styles.paragraph}>
                    The App may include trademarks, logos, and other intellectual property of Polsko-Japońska Akademia
                    Technik Komputerowych (PJATK) used with permission. Unauthorized use is strictly prohibited.
                </Text>

                <Text style={styles.h2}>User Obligations</Text>
                <Text style={styles.paragraph}>
                    You agree to not misuse the App, attempt to gain unauthorized access, or infringe copyrights and
                    intellectual property rights.
                </Text>

                <Text style={styles.h2}>Termination</Text>
                <Text style={styles.paragraph}>
                    We may suspend or terminate your access to the App at any time, without notice, if you violate these
                    Terms.
                </Text>

                <Text style={styles.h2}>Limitation of Liability</Text>
                <Text style={styles.paragraph}>
                    The App is provided “as is” and “as available”, without warranties of any kind. We are not liable
                    for
                    any damages resulting from your use of the App.
                </Text>
                <Text style={styles.h2}>Governing Law</Text>
                <Text style={styles.paragraph}>
                    These Terms shall be governed by and construed in accordance with the laws of Poland.
                </Text>

                <Text style={styles.h2}>Contact Information</Text>
                <Text style={styles.paragraph}>
                    For questions about these Terms, contact: wiktormalyska03@gmail.com.
                </Text>
            </ScrollView>
            <Button onClick={handleAccept} title={"Click to accept Terms of Service"} type={SidebarButtonType.SECONDARY}></Button>
        </View>
    )
}
