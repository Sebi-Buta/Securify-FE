import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeOptionsState {
	themeMode: "light" | "dark";
	toggleTheme: () => void;
	userMode: "attack" | "defense";
	toggleUserMode: (mode: "attack" | "defense") => void;
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
			toggleUserMode: (mode) =>
				set(() => ({
					userMode: mode,
				})),
		}),
		{
			name: "theme-options",
		},
	),
);
