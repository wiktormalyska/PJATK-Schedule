import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/theme";

export default function LoginPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TouchableOpacity style={styles.button} onPress={() => {console.log("Login")}}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.dark.tint,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
