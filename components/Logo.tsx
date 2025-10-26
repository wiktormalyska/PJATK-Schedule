// @ts-ignore
import PJATKLogoLight from '@/assets/svgs/PJATK_Light.svg';
// @ts-ignore
import PJATKLogoDark from '@/assets/svgs/PJATK_Dark.svg';
import {View} from "react-native";
import {useTheme} from "@/hooks/use-theme";


export const Logo = ({width = "24", height = "24"}) => {
    const {isLightTheme} = useTheme();

    return (
        <View>
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