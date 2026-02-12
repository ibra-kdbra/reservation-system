# Security: Cookie-Based Authentication

## Overview

The application uses **httpOnly cookies** for JWT token storage instead of localStorage to protect against XSS (Cross-Site Scripting) attacks.

## Why Cookies Over localStorage?

### localStorage Vulnerabilities

- ❌ **XSS Vulnerable**: Any JavaScript code can access localStorage
- ❌ **No Protection**: Malicious scripts can steal tokens
- ❌ **Third-party Scripts**: Analytics, ads, or compromised libraries can access tokens

### httpOnly Cookies Benefits

- ✅ **XSS Immune**: JavaScript cannot access httpOnly cookies
- ✅ **Automatic**: Browser handles cookie sending/receiving
- ✅ **Secure Flag**: HTTPS-only in production
- ✅ **SameSite**: CSRF protection

## Implementation

### Backend (NestJS)

**Cookie Configuration:**

```typescript
res.cookie('accessToken', token, {
  httpOnly: true,              // Cannot be accessed by JavaScript
  secure: NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'strict',          // CSRF protection
  maxAge: 15 * 60 * 1000      // 15 minutes
});
```

**Token Extraction:**

- JWT strategy reads tokens from `request.cookies.accessToken`
- No Authorization header needed

### Frontend (Vue.js)

**API Client:**

```typescript
axios.create({
  withCredentials: true  // Send cookies with requests
})
```

**Auth Store:**

- No token storage needed
- Cookies handled automatically by browser
- Cleaner, more secure code

## Security Features

| Feature | Description |
|---------|-------------|
| **httpOnly** | Prevents JavaScript access to cookies |
| **Secure** | HTTPS-only transmission in production |
| **SameSite** | Prevents CSRF attacks |
| **Short-lived** | Access token expires in 15 minutes |
| **Refresh Token** | Longer-lived (7 days) for token renewal |

## CORS Configuration

```typescript
app.enableCors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true                  // Allow cookies
});
```

## Token Lifecycle

1. **Login**: Server sets httpOnly cookies
2. **Requests**: Browser automatically sends cookies
3. **Validation**: JWT strategy extracts token from cookies
4. **Logout**: Server clears cookies

## Best Practices

✅ **Do:**

- Use httpOnly cookies for sensitive tokens
- Enable HTTPS in production
- Set appropriate cookie expiration
- Use SameSite attribute

❌ **Don't:**

- Store tokens in localStorage
- Disable httpOnly flag
- Use long-lived access tokens
- Forget CORS credentials configuration

## Testing

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  -c cookies.txt

# Authenticated request
curl http://localhost:3000/api/v1/auth/me \
  -b cookies.txt
```

## Migration from localStorage

If migrating from localStorage:

1. Remove localStorage.setItem/getItem calls
2. Add `withCredentials: true` to axios
3. Update backend to set cookies
4. Clear existing localStorage tokens

---

**Security Level**: 🔒 High - XSS Protected
