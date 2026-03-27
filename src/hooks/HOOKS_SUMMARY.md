# API Hooks Summary

This document provides a quick reference for all the API hooks created for the Securify frontend.

## Backend Endpoints & Corresponding Hooks

| Backend Endpoint        | Method | Hook Name              | Type     | Description                                               |
| ----------------------- | ------ | ---------------------- | -------- | --------------------------------------------------------- |
| `/api/status`           | GET    | `useGetStatus()`       | Query    | Get server status                                         |
| `/api/login-vulnerable` | POST   | `useLoginVulnerable()` | Mutation | Login with vulnerable endpoint (for educational purposes) |
| `/api/login-secure`     | POST   | `useLoginSecure()`     | Mutation | Login with secure endpoint                                |
| `/api/comments`         | POST   | `useCreateComment()`   | Mutation | Create a new comment                                      |
| `/api/comments`         | GET    | `useGetComments()`     | Query    | Fetch all comments                                        |
| `/api/comments/:id`     | DELETE | `useDeleteComment()`   | Mutation | Delete a specific comment                                 |
| `/api/users`            | POST   | `useCreateUser()`      | Mutation | Create a new user account                                 |
| `/api/users`            | GET    | `useGetUsers()`        | Query    | Fetch all users                                           |
| `/api/users/:id`        | DELETE | `useDeleteUser()`      | Mutation | Delete a specific user                                    |

## Additional Hooks

| Hook Name   | Type   | Description                                               |
| ----------- | ------ | --------------------------------------------------------- |
| `useAuth()` | Custom | Manage authentication state with localStorage persistence |

## Quick Start

### Import hooks

```tsx
import {
	useGetStatus,
	useGetComments,
	useGetUsers,
	useLoginVulnerable,
	useLoginSecure,
	useCreateComment,
	useCreateUser,
	useDeleteComment,
	useDeleteUser,
	useAuth,
} from "@/hooks";
```

### Use in components

```tsx
function MyComponent() {
	const { data, isLoading, error } = useGetStatus();
	const { mutate, isPending } = useCreateComment();
	const { user, isAuthenticated, login, logout } = useAuth();

	// Use the hooks...
}
```

## Type Definitions

All TypeScript types are exported from the hooks:

- `User` - User object (includes id, username, password, password_plain, role)
- `Comment` - Comment object
- `LoginResponse` - Login response
- `LoginRequest` - Login request payload
- `CreateUserRequest` - User creation payload
- `CreateUserResponse` - User creation response
- `CreateCommentRequest` - Comment creation payload
- `StatusResponse` - Server status response
- `DeleteResponse` - Delete operation response

## File Structure

```
src/hooks/
├── useApi.ts              # Main API hooks (queries & mutations)
├── useAuth.ts             # Authentication state management
├── index.ts               # Centralized exports
├── HOOKS_USAGE.md         # Detailed usage examples
├── HOOKS_SUMMARY.md       # This file
├── use-toast.ts           # Existing toast hook
├── use-mobile.tsx         # Existing mobile detection hook
└── use-toast.ts           # Existing toast utility hook
```

## Configuration

The API base URL is set in `useApi.ts`:

```tsx
const API_BASE_URL = "http://localhost:5000/api";
```

Update this if your backend is running on a different URL.

## React Query Integration

All hooks are built with React Query, which provides:

- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

The `QueryClient` is already configured in `App.tsx` with `QueryClientProvider`.

## User Data Storage

Users are now stored with both:

- **`password_plain`** - Plain text password (for demonstration purposes)
- **`password`** - Encrypted hash using bcrypt (for security)
