import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useModal} from '@/contexts/ModalContext';
import {useTheme} from "@/contexts/ThemeContext";

const Modal = () => {
    const {isOpen, closeModal, title, content, isClosable} = useModal();
    const {currentTheme} = useTheme()

    if (!isOpen) return null;

    const styles = StyleSheet.create({
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            marginTop: 100,
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: currentTheme.style.borderRadius,
            overflow: 'hidden',
        },
        modal: {
            flex: 1,
            padding: 20,
            backgroundColor: currentTheme.style.backgroundSecondary,
            position: 'relative',
        },
        text: {
            fontSize: 18,
            marginBottom: 10,
            color: currentTheme.style.text,
            textAlign: 'center',
        },
        closeButton: {
            position: 'absolute',
            top: 10,
            right: 10,
            padding: 5,
            zIndex: 1001,
        },
        closeText: {
            fontSize: 18,
            color: currentTheme.style.text,
        },
    });

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>
                {isClosable && (
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeText}>x</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.text}>{title}</Text>
                <View style={{ flex: 1 }}>
                    {content}
                </View>
            </View>
        </View>
    );
};

export default Modal;
