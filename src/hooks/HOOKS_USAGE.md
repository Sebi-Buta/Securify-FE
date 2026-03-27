# API Hooks Usage Guide

This guide demonstrates how to use the custom API hooks created for Securify frontend.

## Available Hooks

### Query Hooks (Fetch Data)

#### `useGetStatus()`

Fetches the server status.

```tsx
import { useGetStatus } from "@/hooks";

function StatusComponent() {
	const { data, isLoading, error } = useGetStatus();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return <div>{data?.message}</div>;
}
```

#### `useGetComments()`

Fetches all comments from the server.

```tsx
import { useGetComments } from "@/hooks";

function CommentsList() {
	const { data: comments, isLoading, error } = useGetComments();

	if (isLoading) return <div>Loading comments...</div>;
	if (error) return <div>Error loading comments</div>;

	return (
		<div>
			{comments?.map((comment) => (
				<div key={comment._id}>
					<p>
						<strong>{comment.author}:</strong> {comment.content}
					</p>
					<small>{new Date(comment.createdAt).toLocaleString()}</small>
				</div>
			))}
		</div>
	);
}
```

### Mutation Hooks (Send Data)

#### `useLoginVulnerable()`

Attempts login using the vulnerable endpoint (for educational purposes).

```tsx
import { useLoginVulnerable, useAuth } from "@/hooks";
import { useState } from "react";

function LoginComponent() {
	const { mutate, isPending, error } = useLoginVulnerable();
	const { login } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		mutate(
			{ username, password },
			{
				onSuccess: (data) => {
					if (data.success && data.user) {
						login(data.user);
						alert("Logged in (vulnerable)");
					}
				},
				onError: (err) => {
					alert(`Error: ${err.message}`);
				},
			},
		);
	};

	return (
		<div>
			<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={handleLogin} disabled={isPending}>
				{isPending ? "Logging in..." : "Login"}
			</button>
			{error && <p style={{ color: "red" }}>{error.message}</p>}
		</div>
	);
}
```

#### `useLoginSecure()`

Attempts login using the secure endpoint.

```tsx
import { useLoginSecure, useAuth } from "@/hooks";

function SecureLoginComponent() {
	const { mutate, isPending } = useLoginSecure();
	const { login } = useAuth();

	const handleSecureLogin = (username: string, password: string) => {
		mutate(
			{ username, password },
			{
				onSuccess: (data) => {
					if (data.user) {
						login(data.user);
						alert("Securely logged in");
					}
				},
			},
		);
	};

	return (
		<button onClick={() => handleSecureLogin("user", "pass")} disabled={isPending}>
			Secure Login
		</button>
	);
}
```

#### `useCreateComment()`

Creates a new comment.

```tsx
import { useCreateComment } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

function AddCommentComponent() {
	const { mutate, isPending } = useCreateComment();
	const queryClient = useQueryClient();
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");

	const handleAddComment = () => {
		mutate(
			{ author, content },
			{
				onSuccess: () => {
					// Invalidate comments cache to refetch
					queryClient.invalidateQueries({ queryKey: ["comments"] });
					setAuthor("");
					setContent("");
					alert("Comment added!");
				},
			},
		);
	};

	return (
		<div>
			<input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
			<textarea placeholder="Comment" value={content} onChange={(e) => setContent(e.target.value)} />
			<button onClick={handleAddComment} disabled={isPending}>
				{isPending ? "Posting..." : "Post Comment"}
			</button>
		</div>
	);
}
```

#### `useCreateUser()`

Creates a new user account.

```tsx
import { useCreateUser } from "@/hooks";
import { useState } from "react";

function RegisterComponent() {
	const { mutate, isPending, error } = useCreateUser();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = () => {
		mutate(
			{ username, password },
			{
				onSuccess: (data) => {
					alert(data.message);
					setUsername("");
					setPassword("");
				},
			},
		);
	};

	return (
		<div>
			<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={handleRegister} disabled={isPending}>
				{isPending ? "Registering..." : "Register"}
			</button>
			{error && <p style={{ color: "red" }}>{error.message}</p>}
		</div>
	);
}
```

#### `useGetUsers()`

Fetches all users from the server.

```tsx
import { useGetUsers } from "@/hooks";

function UsersList() {
	const { data: users, isLoading, error } = useGetUsers();

	if (isLoading) return <div>Loading users...</div>;
	if (error) return <div>Error loading users</div>;

	return (
		<div>
			{users?.map((user) => (
				<div key={user.id}>
					<p>
						<strong>{user.username}</strong>
					</p>
					<p>Password (plain): {user.password_plain}</p>
					<p>Password (hash): {user.password?.substring(0, 20)}...</p>
				</div>
			))}
		</div>
	);
}
```

#### `useDeleteUser()`

Deletes a specific user by ID.

```tsx
import { useDeleteUser } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

function DeleteUserComponent({ userId }: { userId: number }) {
	const { mutate, isPending } = useDeleteUser();
	const queryClient = useQueryClient();

	const handleDeleteUser = () => {
		if (confirm("Are you sure you want to delete this user?")) {
			mutate(userId, {
				onSuccess: () => {
					// Invalidate users cache to refetch
					queryClient.invalidateQueries({ queryKey: ["users"] });
					alert("User deleted!");
				},
			});
		}
	};

	return (
		<button onClick={handleDeleteUser} disabled={isPending}>
			{isPending ? "Deleting..." : "Delete User"}
		</button>
	);
}
```

#### `useDeleteComment()`

Deletes a specific comment by ID.

```tsx
import { useDeleteComment } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

function DeleteCommentComponent({ commentId }: { commentId: number }) {
	const { mutate, isPending } = useDeleteComment();
	const queryClient = useQueryClient();

	const handleDeleteComment = () => {
		if (confirm("Are you sure you want to delete this comment?")) {
			mutate(commentId, {
				onSuccess: () => {
					// Invalidate comments cache to refetch
					queryClient.invalidateQueries({ queryKey: ["comments"] });
					alert("Comment deleted!");
				},
			});
		}
	};

	return (
		<button onClick={handleDeleteComment} disabled={isPending}>
			{isPending ? "Deleting..." : "Delete Comment"}
		</button>
	);
}
```

### Authentication Hook

#### `useAuth()`

Manages authentication state with localStorage persistence.

```tsx
import { useAuth } from "@/hooks";

function ProfileComponent() {
	const { user, isAuthenticated, login, logout } = useAuth();

	if (!isAuthenticated) {
		return <div>Please log in</div>;
	}

	return (
		<div>
			<p>Welcome, {user?.username}!</p>
			<p>Role: {user?.role}</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
```

## Best Practices

1. **Invalidate queries after mutations**: Use `queryClient.invalidateQueries()` to refresh data after mutations.
2. **Handle loading states**: Always check `isLoading` and `isPending` states before rendering.
3. **Handle errors**: Provide user-friendly error messages from `error` objects.
4. **Use auth hook**: Store user data after login using `useAuth().login()`.
5. **Combine queries and mutations**: Use React Query's powerful caching to optimize requests.

## Integration Example

```tsx
import { useGetComments, useCreateComment, useAuth } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

function FullCommentsComponent() {
	const { data: comments, isLoading } = useGetComments();
	const { mutate: createComment, isPending } = useCreateComment();
	const { user, isAuthenticated } = useAuth();
	const queryClient = useQueryClient();

	const handleSubmit = async (content: string) => {
		if (!isAuthenticated || !user) return;

		createComment(
			{ author: user.username, content },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["comments"] });
				},
			},
		);
	};

	return (
		<div>
			{isAuthenticated && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit("new comment");
					}}
				>
					<textarea placeholder="Add a comment..." />
					<button disabled={isPending}>Post</button>
				</form>
			)}

			{isLoading ? (
				<p>Loading comments...</p>
			) : (
				<div>
					{comments?.map((comment) => (
						<div key={comment._id}>
							<strong>{comment.author}:</strong> {comment.content}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
```
