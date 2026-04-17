import { useCallback, useEffect, useState } from "react";
import { User } from "./useApi";
import { set } from "date-fns";
import { useUser } from "@/lib/store/user";

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
	const { appUser, setUser, deleteUser } = useUser((state) => state);
	const [authState, setAuthState] = useState<AuthState>({
		user: appUser,
		isAuthenticated: false,
		loading: true,
	});

	const login = useCallback((user: User) => {
		setUser(user);

		setAuthState({
			user,
			isAuthenticated: true,
			loading: false,
		});
		// window.location.reload(); // Reload to reset app state after login
	}, []);

	const logout = useCallback(() => {
		deleteUser();
		setAuthState({
			user: null,
			isAuthenticated: false,
			loading: false,
		});
	}, []);

	// Initialize from localStorage on mount
	useEffect(() => {
		if (appUser) {
			setAuthState({
				user: appUser,
				isAuthenticated: true,
				loading: false,
			});
		} else {
			setAuthState({
				user: null,
				isAuthenticated: false,
				loading: false,
			});
		}
	}, []);

	return {
		...authState,
		login,
		logout,
	};
};
