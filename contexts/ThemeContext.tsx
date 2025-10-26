import React, {createContext, useEffect, useState, ReactNode} from "react";
import {Colors, ColorScheme} from "@/constants/theme";
import useStorage from "@/hooks/use-storage";

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
};

const THEME_STORAGE_KEY = "selected_theme";

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (themeName: ThemeNames) => Promise<boolean>;
    isLightTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const {saveData, loadData} = useStorage();
    const [currentTheme, setCurrentTheme] = useState<Theme>(ThemeList[ThemeNames.LIGHT]);

    const isLightTheme = currentTheme.name === ThemeNames.LIGHT;

    useEffect(() => {
        const loadTheme = async () => {
            const savedThemeName = await loadData(THEME_STORAGE_KEY);
            if (savedThemeName && (savedThemeName === ThemeNames.LIGHT || savedThemeName === ThemeNames.DARK)) {
                // @ts-ignore
                setCurrentTheme(ThemeList[savedThemeName]);
            } else {
                await saveData(THEME_STORAGE_KEY, ThemeNames.LIGHT);
            }
        };
        loadTheme().then();
    }, [loadData, saveData]);

    const setTheme = async (themeName: ThemeNames): Promise<boolean> => {
        const selectedTheme = ThemeList[themeName];
        if (selectedTheme) {
            setCurrentTheme(selectedTheme);
            await saveData(THEME_STORAGE_KEY, themeName);
            return true;
        }
        return false;
    };

    const value: ThemeContextType = {
        currentTheme,
        setTheme,
        isLightTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};