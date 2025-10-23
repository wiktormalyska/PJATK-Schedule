import {StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import {useState} from "react";
import {useAuthContext} from "@/contexts/AuthContext";
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import {useTheme} from "@/hooks/use-theme";

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const {login:authLogin} = useAuthContext()
    const {show, hide} = useLoadingScreen()
    const {getTheme} = useTheme()

    const handleLogin = async () => {
        setError(null);
        show()
        const authError =  await authLogin(login, password)
        hide()
        if (authError) {
            setError(authError)
            setLogin("")
            setPassword("")
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: getTheme().style.background,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 100,

        },
        title: {
            color: getTheme().style.text,
            fontSize: 24,
            marginBottom: 20,
        },
        input: {
            width: '80%',
            backgroundColor: getTheme().style.backgroundSecondary,
            color: getTheme().style.text,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            marginBottom: 16,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#333',
        },
        button: {
            backgroundColor: getTheme().style.tint,
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
        errorText: {
            color: '#ff4444',
            fontSize: 14,
            marginTop: 16,
            height: 20,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor={getTheme().style.textSecondary}
                value={login}
                onChangeText={setLogin}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={getTheme().style.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.errorText}>{""}</Text>}
        </View>
    );
}
