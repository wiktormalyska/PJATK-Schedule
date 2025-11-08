import {responseStatus} from "@/types/responseStatus";
import useStorage from "@/hooks/use-storage";
import {COOKIES_STORAGE_KEY} from "@/contexts/AuthContext";

export const useSchedule = () => {
    const {loadData} = useStorage();

    const getCookies = async (): Promise<string> => {
        const cookies = await loadData(COOKIES_STORAGE_KEY);
        return cookies || '';
    };

    const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
        const cookies = await getCookies();
        const headers = {
            ...options.headers,
            ...(cookies ? {'Cookie': cookies} : {})
        };

        return fetch(url, {
            ...options,
            headers
        });
    };

    return {
        login,
        getCookies,
        makeAuthenticatedRequest
    }
}

const getLoginForm = async () => {
    const response = await fetch('https://planzajec.pjwstk.edu.pl/Logowanie.aspx');

    const html = await response.text();

    const viewState = html.match(/name="__VIEWSTATE"[^>]*value="([^"]+)"/)?.[1];
    const viewStateGenerator = html.match(/name="__VIEWSTATEGENERATOR"[^>]*value="([^"]+)"/)?.[1];
    const eventValidation = html.match(/name="__EVENTVALIDATION"[^>]*value="([^"]+)"/)?.[1];

    return {viewState, viewStateGenerator, eventValidation};
};

interface loginResponse {
    status: string;
    body: string;
    cookies?: string;
}

const login = async (username: string, password: string): Promise<loginResponse> => {

    try {
        const formData = await getLoginForm();

        const body = new URLSearchParams({
            'RadScriptManager1_TSM': ';;System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35:en-US:ceece802-cb39-4409-a6c9-bfa3b2c8bf10:ea597d4b:b25378d2',
            '__EVENTARGUMENT': '',
            '__EVENTTARGET': '',
            '__EVENTVALIDATION': formData.eventValidation || '',
            '__VIEWSTATE': formData.viewState || '',
            '__VIEWSTATEGENERATOR': formData.viewStateGenerator || '',
            'ctl00$ContentPlaceHolder1$Login1$LoginButton': 'Zaloguj',
            'ctl00$ContentPlaceHolder1$Login1$Password': password,
            'ctl00$ContentPlaceHolder1$Login1$UserName': username
        });

        const response = await fetch('https://planzajec.pjwstk.edu.pl/Logowanie.aspx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: body.toString()
        });

        if (!response.ok) {
            return {
                status: responseStatus.NETWORK_ERROR,
                body: `Network error: ${response.status} ${response.statusText}`
            }
        } else {
            const responseBody = await response.text();
            if (responseBody.includes('Błędny login lub hasło. Spróbuj ponownie.')) {
                return {
                    status: responseStatus.INVALID_CREDENTIALS,
                    body: 'Invalid username or password'
                }
            }
        }

        // Extract cookies from response headers
        const setCookieHeader = response.headers.get('set-cookie');
        const cookies = setCookieHeader || '';

        return {
            status: responseStatus.SUCCESS,
            body: 'Logged in as ' + username,
            cookies: cookies
        }
    } catch (error) {
        return {
            status: responseStatus.UNKNOWN_ERROR,
            body: 'An unknown error occurred'
        }
    }
}
