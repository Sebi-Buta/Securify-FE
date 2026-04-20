import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

const API_BASE_URL = "https://securify-be.onrender.com";

// Types for API responses
export interface User {
	id?: number;
	_id?: string;
	username: string;
	password?: string; // Encrypted password
	password_plain?: string; // Plain password
	role?: string;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	user?: User;
}

export interface Comment {
	_id?: string;
	author: string;
	content: string;
	createdAt: Date;
}

export interface StatusResponse {
	message: string;
}

export interface CreateUserRequest {
	username: string;
	password: string;
}

export interface CreateUserResponse {
	success: boolean;
	message: string;
	error?: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface CreateCommentRequest {
	author: string;
	content: string;
}

export interface DeleteResponse {
	success: boolean;
	message: string;
}

// ============================================================
// API CALL FUNCTIONS
// ============================================================

const fetchStatus = async (): Promise<StatusResponse> => {
	const response = await fetch(`${API_BASE_URL}/status`);
	if (!response.ok) throw new Error("Failed to fetch status");
	return response.json();
};

const loginVulnerable = async (credentials: LoginRequest): Promise<LoginResponse> => {
	const response = await fetch(`${API_BASE_URL}/login-vulnerable`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});
	if (!response.ok) throw new Error("Login failed");
	return response.json();
};

const loginSecure = async (credentials: LoginRequest): Promise<LoginResponse> => {
	const response = await fetch(`${API_BASE_URL}/login-secure`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});
	if (!response.ok) throw new Error("Login failed");
	return response.json();
};

const createComment = async (commentData: CreateCommentRequest): Promise<{ success: boolean; message: string }> => {
	const response = await fetch(`${API_BASE_URL}/comments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(commentData),
	});
	if (!response.ok) throw new Error("Failed to create comment");
	return response.json();
};

const fetchComments = async (): Promise<Comment[]> => {
	const response = await fetch(`${API_BASE_URL}/comments`);
	if (!response.ok) throw new Error("Failed to fetch comments");
	return response.json();
};

const createUser = async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
	const response = await fetch(`${API_BASE_URL}/users`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData),
	});
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Failed to create user");
	}
	return response.json();
};

const fetchUsers = async (): Promise<User[]> => {
	const response = await fetch(`${API_BASE_URL}/users`);
	if (!response.ok) throw new Error("Failed to fetch users");
	return response.json();
};

const deleteUser = async (id: number | string): Promise<DeleteResponse> => {
	const response = await fetch(`${API_BASE_URL}/users/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	if (!response.ok) throw new Error("Failed to delete user");
	return response.json();
};

const deleteComment = async (id: number | string): Promise<DeleteResponse> => {
	const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	if (!response.ok) throw new Error("Failed to delete comment");
	return response.json();
};

// ============================================================
// CUSTOM HOOKS FOR QUERIES
// ============================================================

/**
 * Hook to fetch server status
 */
export const useGetStatus = (): UseQueryResult<StatusResponse, Error> => {
	return useQuery({
		queryKey: ["status"],
		queryFn: fetchStatus,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

/**
 * Hook to fetch all comments
 */
export const useGetComments = (): UseQueryResult<Comment[], Error> => {
	return useQuery({
		queryKey: ["comments"],
		queryFn: fetchComments,
		staleTime: 1000 * 30, // 30 seconds
	});
};

/**
 * Hook to fetch all users
 */
export const useGetUsers = (): UseQueryResult<User[], Error> => {
	return useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
		staleTime: 1000 * 30, // 30 seconds
	});
};

// ============================================================
// CUSTOM HOOKS FOR MUTATIONS
// ============================================================

/**
 * Hook to login with vulnerable endpoint (for educational purposes)
 */
export const useLoginVulnerable = () => {
	return useMutation({
		mutationFn: loginVulnerable,
	});
};

/**
 * Hook to login securely
 */
export const useLoginSecure = () => {
	return useMutation({
		mutationFn: loginSecure,
	});
};

/**
 * Hook to create a new comment
 */
export const useCreateComment = () => {
	return useMutation({
		mutationFn: createComment,
	});
};

/**
 * Hook to create a new user
 */
export const useCreateUser = () => {
	return useMutation({
		mutationFn: createUser,
	});
};

/**
 * Hook to delete a user
 */
export const useDeleteUser = () => {
	return useMutation({
		mutationFn: deleteUser,
	});
};

/**
 * Hook to delete a comment
 */
export const useDeleteComment = () => {
	return useMutation({
		mutationFn: deleteComment,
	});
};
