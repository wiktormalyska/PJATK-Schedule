# Cookie Management Usage Example

This document provides practical examples of how to use the cookie management system in your components.

## Example 1: Fetching Schedule After Login

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSchedule } from '@/hooks/use-schedule';
import { useAuthContext } from '@/contexts/AuthContext';

export default function SchedulePage() {
    const [scheduleData, setScheduleData] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { makeAuthenticatedRequest } = useSchedule();
    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchSchedule = async () => {
            try {
                // Make authenticated request to get schedule
                const response = await makeAuthenticatedRequest(
                    'https://planzajec.pjwstk.edu.pl/PlanZajec.aspx'
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const html = await response.text();
                setScheduleData(html);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
        };

        fetchSchedule();
    }, [isAuthenticated]);

    return (
        <View>
            {error ? (
                <Text>Error: {error}</Text>
            ) : (
                <Text>Schedule loaded successfully!</Text>
            )}
        </View>
    );
}
```

## Example 2: Checking Cookie Status

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSchedule } from '@/hooks/use-schedule';

export default function DebugPage() {
    const [cookies, setCookies] = useState<string>('');
    const { getCookies } = useSchedule();

    const checkCookies = async () => {
        const storedCookies = await getCookies();
        setCookies(storedCookies || 'No cookies stored');
    };

    useEffect(() => {
        checkCookies();
    }, []);

    return (
        <View>
            <Text>Stored Cookies:</Text>
            <Text>{cookies}</Text>
            <Button title="Refresh Cookies" onPress={checkCookies} />
        </View>
    );
}
```

## Example 3: Making Multiple Authenticated Requests

```typescript
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { useSchedule } from '@/hooks/use-schedule';

export default function MultiRequestPage() {
    const [results, setResults] = useState<string[]>([]);
    const { makeAuthenticatedRequest } = useSchedule();

    const fetchMultiplePages = async () => {
        const urls = [
            'https://planzajec.pjwstk.edu.pl/PlanZajec.aspx',
            'https://planzajec.pjwstk.edu.pl/Grupa.aspx',
            'https://planzajec.pjwstk.edu.pl/Sala.aspx'
        ];

        const responses = await Promise.all(
            urls.map(url => makeAuthenticatedRequest(url))
        );

        const texts = await Promise.all(
            responses.map(response => response.text())
        );

        setResults(texts);
    };

    return (
        <View>
            <Button title="Fetch All Pages" onPress={fetchMultiplePages} />
            <Text>Fetched {results.length} pages</Text>
        </View>
    );
}
```

## Example 4: POST Request with Cookies

```typescript
import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useSchedule } from '@/hooks/use-schedule';

export default function PostRequestPage() {
    const [groupNumber, setGroupNumber] = useState('');
    const { makeAuthenticatedRequest } = useSchedule();

    const submitForm = async () => {
        const formData = new URLSearchParams({
            '__EVENTTARGET': 'groupSelect',
            'groupNumber': groupNumber
        });

        const response = await makeAuthenticatedRequest(
            'https://planzajec.pjwstk.edu.pl/PlanZajec.aspx',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }
        );

        const result = await response.text();
        console.log('Form submitted:', result);
    };

    return (
        <View>
            <TextInput
                placeholder="Enter group number"
                value={groupNumber}
                onChangeText={setGroupNumber}
            />
            <Button title="Submit" onPress={submitForm} />
        </View>
    );
}
```

## Key Points

1. **Always check authentication status** before making requests
2. **Use `makeAuthenticatedRequest`** instead of `fetch` for authenticated requests
3. **Cookies are automatically included** in all requests made through `makeAuthenticatedRequest`
4. **Cookies persist** across app restarts until logout
5. **Error handling** is important - always wrap requests in try-catch blocks

## Troubleshooting

### Cookies Not Working?

1. Verify the user is logged in: Check `isAuthenticated` from `useAuthContext()`
2. Check if cookies are stored: Use `getCookies()` to inspect stored cookies
3. Ensure you're using `makeAuthenticatedRequest()` for authenticated requests
4. Check network requests in dev tools to verify Cookie header is present

### Session Expired?

If you get authentication errors despite being logged in:

1. The server-side session may have expired
2. Log out and log back in to get fresh cookies
3. Consider implementing automatic re-authentication on 401 errors
