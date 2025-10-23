import {Colors, ColorScheme} from "@/constants/theme";
import useStorage from "@/hooks/use-storage";
import {useEffect,useState} from "react";

interface Theme {
    name: string;
    style: ColorScheme;
}

export enum ThemeNames {
    LIGHT = "light",
    DARK = "dark"
}

export const ThemeList: Record<ThemeNames, Theme> = {
    [ThemeNames.LIGHT]: {
        name: "light",
        style: Colors.light
    },
    [ThemeNames.DARK]: {
        name: "dark",
        style: Colors.dark
    }
}

const THEME_STORAGE_KEY = "selected_theme";

export const useTheme = () => {
    const {saveData, loadData} = useStorage()
    const [currentTheme, setCurrentTheme] = useState<Theme>(ThemeList[ThemeNames.LIGHT]);

    const isLightTheme = currentTheme.name === ThemeNames.LIGHT;

    useEffect(() => {
        const loadTheme = async () => {
            const savedThemeName = await loadData(THEME_STORAGE_KEY);
            if (savedThemeName) {
                const theme = Object.values(ThemeList).find(t => t.name === savedThemeName);
                if (theme) {
                    setCurrentTheme(theme);
                }
            } else {
                setCurrentTheme(ThemeList[ThemeNames.LIGHT]);
                await saveData(THEME_STORAGE_KEY, ThemeNames.LIGHT);
            }
        };
        loadTheme().then();
    }, [loadData])
    
    const getTheme = ():Theme => {
        return currentTheme;
    }

    const setTheme = async (themeName: ThemeNames): Promise<boolean> => {
        const selectedTheme = ThemeList[themeName];
        if (selectedTheme) {
            setCurrentTheme(selectedTheme);
            await saveData(THEME_STORAGE_KEY, themeName);
            return true;
        }
        return false;
    }

    return {
        getTheme,
        setTheme,
        isLightTheme
    }
}