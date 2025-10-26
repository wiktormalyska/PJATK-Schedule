import {useEffect, useState} from "react";
import useStorage from "@/hooks/use-storage";

const TOS_STORAGE_KEY = "tos_confirmed";

export const useTos = () => {
    const [isTosConfirmed, setIsTosConfirmed] = useState(false)
    const {loadData, saveData, removeData} = useStorage()

    useEffect(() => {
        const fetchTosStatus = async () => {
            const storedStatus = await loadData(TOS_STORAGE_KEY);
            if (storedStatus === 'true') {
                setIsTosConfirmed(true);
                await saveData(TOS_STORAGE_KEY, storedStatus);
            }
        }

        fetchTosStatus().then();
    }, [])

    return {
        isTosConfirmed,
        setIsTosConfirmed,
    }
}