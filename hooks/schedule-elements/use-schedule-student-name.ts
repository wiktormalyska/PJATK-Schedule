import {useScheduleAuth} from "@/hooks/use-schedule-auth";

export const useScheduleStudentName = () => {
    const {authenticatedRequest} = useScheduleAuth()

    const  getStudentName = async ():Promise<string | null> => {
        try {
            const response = await authenticatedRequest('https://planzajec.pjwstk.edu.pl/TwojPlan.aspx');

            if(!response.ok) {
                console.error(`Network error: ${response.status} ${response.statusText}`);
                return null;
            }

            const html = await response.text();
            const nameMatch = html.match(/id="lblZalogowany"[^>]*>([^<]+)</i);
            const studentName = nameMatch?.[1]?.trim().split(": ")[1] || null;

            console.log('Student name:', studentName);

            return studentName;
        } catch (error) {
            console.error('Error fetching student name:', error);
            return null;
        }
    }

    return {
        getStudentName
    }
};