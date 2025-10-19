import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = SCREEN_WIDTH * 0.7;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 10,
    },
    menu: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: MENU_WIDTH,
        backgroundColor: "#222",
        paddingTop: 70,
        zIndex: 11,
    },
});

export const useSlideMenu = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const translateX = React.useRef(new Animated.Value(-MENU_WIDTH)).current;

    const openMenu = () => {
        setIsOpen(true);
        Animated.timing(translateX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(translateX, {
            toValue: -MENU_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setIsOpen(false));
    };

    interface SlideMenuProps {
        children: React.ReactNode;
    }

    const render = ({children}: SlideMenuProps) => (
        <>
            {children}
            {isOpen && (
                <>
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={closeMenu}
                        activeOpacity={1}
                    />
                    <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
                        <Text style={{color: 'white'}}>Hello Boss</Text>
                    </Animated.View>
                </>
            )}
        </>
    );

    return {
        isOpen,
        openMenu,
        closeMenu,
        render,
    };
};
