import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../../hooks/useApi";

interface UserState {
	users: User[];
	setUsers: (users: User[]) => void;
}

export const useUser = create<UserState>()(
	persist(
		(set) => ({
			users: [],
			setUsers: (users: User[]) => set({ users }),
		}),
		{
			name: "user",
		},
	),
);
