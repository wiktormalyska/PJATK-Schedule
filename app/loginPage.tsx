import {StyleSheet, View, Text, TextInput} from "react-native";
import {useEffect, useState} from "react";
import {useAuthContext} from "@/contexts/AuthContext";
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import {useTheme} from "@/contexts/ThemeContext";
import {usePageTitle} from "@/contexts/PageTitleContext";
import {Button} from "@/components/Button";

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const {login:authLogin} = useAuthContext()
    const {show, hide} = useLoadingScreen()
    const {currentTheme} = useTheme()
    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle("Login")
    })

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
            backgroundColor: currentTheme.style.background,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 100,

        },
        title: {
            color: currentTheme.style.text,
            fontSize: 24,
            marginBottom: 20,
        },
        input: {
            width: '80%',
            backgroundColor: currentTheme.style.backgroundSecondary,
            color: currentTheme.style.text,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            marginBottom: 16,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#333',
        },
        button: {
            flexDirection: 'row',
            width: '80%',
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
                placeholderTextColor={currentTheme.style.textSecondary}
                value={login}
                onChangeText={setLogin}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={currentTheme.style.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <View style={styles.button}>
                <Button onClick={handleLogin} title={"Log In"} />
            </View>


            {error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.errorText}>{""}</Text>}
        </View>
    );
}
