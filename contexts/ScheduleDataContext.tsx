import React, {createContext, ReactNode, useState} from "react";
import {useScheduleStudentName} from "@/hooks/schedule-elements/use-schedule-student-name";

interface ScheduleDataContextType {
    userFullName: string;
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}

export const ScheduleDataContext = createContext<ScheduleDataContextType | undefined>(undefined);

export const ScheduleDataProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [userFullName, setUserFullName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {getStudentName} = useScheduleStudentName()

    const fetchScheduleData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const studentName = await getStudentName();
            if (studentName) {
                setUserFullName(studentName);
            } else {
                setError('Failed to fetch student name');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            console.error('Error fetching schedule data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshData = async () => {
        await fetchScheduleData();
    };

    return (
        <ScheduleDataContext.Provider value={{
            userFullName,
            isLoading,
            error,
            refreshData,
        }}>
            {children}
        </ScheduleDataContext.Provider>
    )
}

export const useScheduleData = () => {
    const context = React.useContext(ScheduleDataContext);
    if (!context) {
        throw new Error('useScheduleData must be used within a ScheduleDataProvider');
    }
    return context;
}