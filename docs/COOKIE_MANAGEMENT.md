# Cookie Management for ASP.NET Authentication

This document explains how the application manages ASP.NET authentication cookies for the PJATK schedule website.

## Overview

The PJATK schedule website (`https://planzajec.pjwstk.edu.pl/Logowanie.aspx`) uses ASP.NET Forms Authentication, which relies on cookies to maintain user sessions. This implementation handles storing, retrieving, and using these cookies for authenticated requests.

## How It Works

### 1. Login Process

When a user logs in through the login page:

1. The login credentials are sent to the server
2. If authentication is successful, the server responds with `Set-Cookie` headers
3. These cookies are extracted from the response headers
4. The cookies are stored in AsyncStorage for persistence

### 2. Cookie Storage

Cookies are stored using AsyncStorage with the key `auth_cookies`. This allows them to persist across app restarts and be available for subsequent authenticated requests.

### 3. Making Authenticated Requests

To make authenticated requests to the PJATK schedule website, use the `makeAuthenticatedRequest` function from the `useSchedule` hook:

```typescript
import { useSchedule } from '@/hooks/use-schedule';

const MyComponent = () => {
    const { makeAuthenticatedRequest } = useSchedule();
    
    const fetchSchedule = async () => {
        try {
            const response = await makeAuthenticatedRequest(
                'https://planzajec.pjwstk.edu.pl/SomeAuthenticatedPage.aspx'
            );
            const data = await response.text();
            // Process the data
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };
    
    return (
        // Your component JSX
    );
};
```

### 4. Cookie Retrieval

If you need to access the stored cookies directly:

```typescript
import { useSchedule } from '@/hooks/use-schedule';

const MyComponent = () => {
    const { getCookies } = useSchedule();
    
    const checkCookies = async () => {
        const cookies = await getCookies();
        console.log('Stored cookies:', cookies);
    };
};
```

### 5. Logout Process

When a user logs out:

1. The authentication state is cleared
2. All stored credentials are removed from AsyncStorage
3. **The stored cookies are also removed**

## Implementation Details

### Modified Files

1. **`hooks/use-schedule.tsx`**
   - Added `loginResponse` interface with optional `cookies` field
   - Extract cookies from the login response `set-cookie` header
   - Added `getCookies()` function to retrieve stored cookies
   - Added `makeAuthenticatedRequest()` function to make requests with cookies

2. **`contexts/AuthContext.tsx`**
   - Added `COOKIES_STORAGE_KEY` constant for cookie storage
   - Modified `login()` to save cookies after successful authentication
   - Modified `logout()` to remove stored cookies

### Storage Keys

- `login` - Stores the username
- `password` - Stores the password (for auto-login)
- `auth_cookies` - Stores the authentication cookies

## Security Considerations

1. **Cookie Storage**: Cookies are stored in AsyncStorage, which is secure for React Native applications but should not be considered as secure as device keychain storage.

2. **Password Storage**: The current implementation stores passwords in plain text for auto-login functionality. Consider using secure storage solutions like `expo-secure-store` for production applications.

3. **Cookie Expiration**: The implementation doesn't currently handle cookie expiration. If cookies expire, the user will need to log in again.

## Future Improvements

1. Implement cookie expiration handling
2. Use secure storage for sensitive data
3. Add cookie parsing to handle multiple cookies and cookie attributes
4. Implement automatic re-authentication when cookies expire
5. Add cookie validation before making requests
