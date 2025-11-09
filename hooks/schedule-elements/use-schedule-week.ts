import {useScheduleAuth} from "@/hooks/use-schedule-auth";
import {parseDocument} from 'htmlparser2';
import {getElementById, getElementsByClassName, getElementsByTagName, textContent} from 'domutils';

export const useScheduleWeek = () => {
    const {authenticatedRequest} = useScheduleAuth();

    const getScheduleWeek = async (): Promise<string | null> => {
        try {
            const response = await authenticatedRequest('https://planzajec.pjwstk.edu.pl/TwojPlan.aspx');

            if(!response.ok) {
                console.error(`Network error: ${response.status} ${response.statusText}`);
                return null;
            }

            const html = await response.text();
            const dom = parseDocument(html);

            const scheduleElement = getElementById('ctl00_ContentPlaceHolder1_DedykowanyPlanStudenta_PlanZajecRadScheduler', dom.children)
            const topWrapElement = getElementsByClassName('rsTopWrap', scheduleElement!.children)[0]
            const rsHeader = getElementsByClassName('rsHeader', topWrapElement!.children)[0]
            const weekElement = getElementsByTagName('h2', rsHeader!.children)[0]

            const weekText = textContent(weekElement).trim().replace(/\s+/g, ' ');

            console.log('Week element:', weekText);
            return weekText
        } catch (error) {
            console.error('Error fetching schedule week:', error);
            return null;
        }
    };

    return {
        getScheduleWeek
    };
};
