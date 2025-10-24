import {Platform} from 'react-native';


export interface ColorScheme {
    text: string;
    textSecondary: string;
    background: string;
    backgroundSecondary: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
    borderRadius: number;
}

export const Colors = {
    light: {
        text: '#11181C',
        textSecondary: '#888',
        background: '#fff',
        backgroundSecondary: '#F7F9FA',
        tint: '#E30613',
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: '#E30613',
        borderRadius: 10
    },
    dark: {
        text: '#ECEDEE',
        textSecondary: '#888',
        background: '#151718',
        backgroundSecondary: '#222',
        tint: '#E30613',
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: '#E30613',
        borderRadius: 10
    },
};

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: 'system-ui',
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: 'ui-serif',
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: 'ui-rounded',
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});
