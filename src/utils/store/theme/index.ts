import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeOptionsState {
	themeMode: "light" | "dark";
	toggleTheme: () => void;
	userMode: "attack" | "defense";
	toggleUserMode: () => void;
}

export const useThemeOptions = create<ThemeOptionsState>()(
	persist(
		(set) => ({
			themeMode: "light",
			toggleTheme: () =>
				set((state) => ({
					themeMode: state.themeMode === "light" ? "dark" : "light",
				})),
			userMode: "attack",
			toggleUserMode: () =>
				set((state) => ({
					userMode: state.userMode === "attack" ? "defense" : "attack",
				})),
		}),
		{
			name: "theme-options",
		},
	),
);
