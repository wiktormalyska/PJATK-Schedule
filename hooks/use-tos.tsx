import {useEffect, useState} from "react";
import useStorage from "@/hooks/use-storage";

export const TOS_STORAGE_KEY = "tos_confirmed";

export const useTos = () => {
    const [isTosConfirmed, setIsTosConfirmed] = useState(false)
    const {loadData, saveData} = useStorage()

    useEffect(() => {
        const fetchTosStatus = async () => {
            const storedStatus = await loadData(TOS_STORAGE_KEY);
            console.log("TOS stored status:", storedStatus === 'true');
            setIsTosConfirmed(storedStatus === 'true');
        };

        fetchTosStatus().then(() => {});
    }, [])

    const getIsTosConfirmed = async () => {
        return await loadData(TOS_STORAGE_KEY)
    }

    const setIsTosConfirmedWrapper = async (confirmed: boolean) => {
        setIsTosConfirmed(confirmed);
        await saveData(TOS_STORAGE_KEY, confirmed ? 'true' : 'false');
    }

    return {
        isTosConfirmed,
        getIsTosConfirmed,
        setIsTosConfirmed: setIsTosConfirmedWrapper,
    }
}