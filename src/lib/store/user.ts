import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../../hooks/useApi";

interface UserState {
	appUser: User | null;
	setUser: (user: User) => void;
	deleteUser: () => void;
}

export const useUser = create<UserState>()(
	persist(
		(set) => ({
			appUser: null,
			setUser: (user: User) => set({ appUser: user }),
			deleteUser: () => set({ appUser: null }),
		}),
		{
			name: "user",
		},
	),
);
