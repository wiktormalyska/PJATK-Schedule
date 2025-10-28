import React, {createContext, ReactNode, useState} from "react";

interface ModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    title: string
    setTitle: (title: string) => void;
    content: ReactNode;
    setContent: (content: ReactNode) => void;
    isClosable: boolean;
    setIsClosable: (isClosable: boolean) => void;
}
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<ReactNode>(null);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [isClosable, setIsClosable] = useState<boolean>(true);

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal, title, setTitle, content, setContent, isClosable, setIsClosable}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}