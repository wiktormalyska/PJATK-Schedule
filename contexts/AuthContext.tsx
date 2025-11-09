import React, {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {responseStatus} from "@/types/responseStatus";
import {useScheduleAuth} from "@/hooks/use-schedule-auth";
import useStorage from "@/hooks/use-storage";
import {useLoadingScreen} from "@/contexts/LoadingScreenContext";
import {useRouter} from "expo-router";
import {useScheduleData} from "@/contexts/ScheduleDataContext";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (loginVar: string, passwordVar: string) => Promise<string | null>;
    logout: () => Promise<void>;
}

export const LOGIN_STORAGE_KEY = "login";
export const PASSWORD_STORAGE_KEY = "password";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const {login: loginFunc} = useScheduleAuth();
    const {loadData, saveData, removeData} = useStorage()
    const {show, hide} = useLoadingScreen();
    const {replace} = useRouter()
    const {refreshData} = useScheduleData()

    const triedAutoLogin = useRef(false);
    const router = useRouter()

    const login = async (loginVar:string, passwordVar:string) => {
        let error = null;

        if (!loginVar || !passwordVar) {
            return 'Login and password cannot be empty.';
        }

        const response = await loginFunc(loginVar, passwordVar);
        console.log(response);

        switch (response.status) {
            case responseStatus.SUCCESS:
                console.log('Login successful');
                await saveData(LOGIN_STORAGE_KEY, loginVar);
                await saveData(PASSWORD_STORAGE_KEY, passwordVar);
                setIsAuthenticated(true)
                router.replace('/home');
                break
            case responseStatus.INVALID_CREDENTIALS:
                error = 'Invalid login or password.';
                break
            case responseStatus.NETWORK_ERROR:
                error = 'Network error. Please try again later.';
                break
            case responseStatus.UNKNOWN_ERROR:
            default:
                error = 'An unknown error occurred. Please try again.';
                break
        }
        console.log("User logged in");
        await refreshData()
        replace('/home');
        return error;
    };

    useEffect(() => {
        if (triedAutoLogin.current) return;
        triedAutoLogin.current = true;

        show();
        const loginPromise = loadData(LOGIN_STORAGE_KEY);
        const passwordPromise = loadData(PASSWORD_STORAGE_KEY);

        Promise.all([loginPromise, passwordPromise])
            .then(([loginValue, passwordValue]) => {
                if (loginValue && passwordValue && !isAuthenticated) {
                    login(loginValue, passwordValue).finally(() => hide());
                } else {
                    hide();
                }
            })
            .catch(() => {
                hide();
            });
    }, []);

    const logout = async () => {
        setIsAuthenticated(false)
        await removeData(LOGIN_STORAGE_KEY)
        await removeData(PASSWORD_STORAGE_KEY)

        router.replace('/loginPage');
        console.log("User logged out");
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}
