import {useEffect, useState} from "react";
import useStorage from "@/hooks/use-storage";

export const PRIVACY_POLICY_STORAGE_KEY = "privacy_policy_confirmed";

export const usePrivacyPolicy = () => {
    const [isPrivacyPolicyConfirmed, setIsPrivacyPolicyConfirmed] = useState(false)
    const {loadData, saveData} = useStorage()

    useEffect(() => {
        const fetchPrivacyPolicyStatus = async () => {
            const storedStatus = await loadData(PRIVACY_POLICY_STORAGE_KEY);
            console.log("Privacy Policy stored status:", storedStatus === 'true');
            setIsPrivacyPolicyConfirmed(storedStatus === 'true');
        }

        fetchPrivacyPolicyStatus().then(() => {})
    }, [])

    const getIsPrivacyPolicyConfirmed = async () => {
        return await loadData(PRIVACY_POLICY_STORAGE_KEY)
    }

    const setIsPrivacyPolicyConfirmedWrapper = async (confirmed: boolean) => {
        setIsPrivacyPolicyConfirmed(confirmed);
        await saveData(PRIVACY_POLICY_STORAGE_KEY, confirmed ? 'true' : 'false');
    }

    return {
        isPrivacyPolicyConfirmed,
        getIsPrivacyPolicyConfirmed,
        setIsPrivacyPolicyConfirmed: setIsPrivacyPolicyConfirmedWrapper,
    }
}
