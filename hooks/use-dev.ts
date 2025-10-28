import useStorage from "@/hooks/use-storage";
import {LOGIN_STORAGE_KEY, PASSWORD_STORAGE_KEY} from "@/contexts/AuthContext";
import {useTos} from "@/hooks/use-tos";
import {usePrivacyPolicy} from "@/hooks/use-privacy-policy";

export const useDev = () => {
    const {saveData} = useStorage();
    const {setIsTosConfirmed} = useTos()
    const {setIsPrivacyPolicyConfirmed} = usePrivacyPolicy()

    const isDev = process.env.EXPO_PUBLIC_DEV === 'true';

    const cleanupSetupData = async () => {
        await saveData(LOGIN_STORAGE_KEY, '');
        await saveData(PASSWORD_STORAGE_KEY, '');
        await setIsTosConfirmed(false);
        await setIsPrivacyPolicyConfirmed(false);
    }

    return  {
        isDev,
        cleanupSetupData,
    }
}