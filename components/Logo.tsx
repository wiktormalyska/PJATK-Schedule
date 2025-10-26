// @ts-ignore
import PJATKLogoLight from '@/assets/svgs/PJATK_Light.svg';
// @ts-ignore
import PJATKLogoDark from '@/assets/svgs/PJATK_Dark.svg';
import {View} from "react-native";
import {useTheme} from "@/contexts/ThemeContext";
import {StyleSheet} from "react-native";


export const Logo = ({width = "24", height = "24"}) => {
    const {isLightTheme} = useTheme();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    return (
        <View style={styles.container}>
            {
                isLightTheme ? (
                    <PJATKLogoLight width={width} height={height} />
                ): (
                    <PJATKLogoDark width={width} height={height} />
                )

            }

        </View>
    );
};