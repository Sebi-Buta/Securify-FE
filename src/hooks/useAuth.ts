import { useCallback, useEffect, useState } from "react";
import { User } from "./useApi";

const STORAGE_KEY = "securify_user";

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	loading: boolean;
}

/**
 * Hook to manage authentication state
 * Stores user data in localStorage for persistence
 */
export const useAuth = () => {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		isAuthenticated: false,
		loading: true,
	});

	// Initialize from localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem(STORAGE_KEY);
		if (storedUser) {
			try {
				const user = JSON.parse(storedUser);
				setAuthState({
					user,
					isAuthenticated: true,
					loading: false,
				});
			} catch {
				localStorage.removeItem(STORAGE_KEY);
				setAuthState({
					user: null,
					isAuthenticated: false,
					loading: false,
				});
			}
		} else {
			setAuthState({
				user: null,
				isAuthenticated: false,
				loading: false,
			});
		}
	}, []);

	const login = useCallback((user: User) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
		setAuthState({
			user,
			isAuthenticated: true,
			loading: false,
		});
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
		setAuthState({
			user: null,
			isAuthenticated: false,
			loading: false,
		});
	}, []);

	return {
		...authState,
		login,
		logout,
	};
};
