import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';

interface LoadingScreenContextType {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
}

export const LoadingScreenContext = createContext<LoadingScreenContextType | undefined>(undefined);

export const LoadingScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    return (
        <LoadingScreenContext.Provider value={{ isVisible, show, hide }}>
            <LoadingScreen visible={isVisible} />
            {children}
        </LoadingScreenContext.Provider>
    );
};

export const useLoadingScreen = () => {
    const context = useContext(LoadingScreenContext);
    if (!context) {
        throw new Error('useLoadingScreen must be used within LoadingScreenProvider');
    }
    return context;
};
