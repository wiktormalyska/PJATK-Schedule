import React, {createContext, ReactNode, useState} from "react";


interface PageTitleContextType {
    title: string;
    setTitle: (title: string) => void;
}

export const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export const PageTitleProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [title, setTitle] = useState("")

    return (
        <PageTitleContext.Provider value={{title, setTitle}}>
            {children}
        </PageTitleContext.Provider>
    )
}

export const usePageTitle = () => {
    const context = React.useContext(PageTitleContext);
    if (!context) {
        throw new Error('usePageTitle must be used within a PageTitleProvider');
    }
    return context;
}