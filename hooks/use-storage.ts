import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
    const saveData = async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const loadData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    };

    const removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing data:', error);
        }
    };

    return {
        saveData,
        loadData,
        removeData
    };
};

export default useStorage;
