import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeOptionsState {
	theme: "light" | "dark";
	toggleTheme: () => void;
	mode: "attack" | "defense";
	setMode: (mode: "attack" | "defense") => void;
}

export const useThemeOptions = create<ThemeOptionsState>()(
	persist(
		(set) => ({
			theme: "light",
			toggleTheme: () =>
				set((state) => ({
					theme: state.theme === "light" ? "dark" : "light",
				})),
			mode: "attack",
			setMode: (mode) =>
				set(() => ({
					mode: mode,
				})),
		}),
		{
			name: "theme-options",
		},
	),
);
