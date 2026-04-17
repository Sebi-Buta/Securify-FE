import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModulesState {
	modulesCompleted: string[];
	addModuleCompleted: (module: string) => void;
	resetModules: () => void;
}

export const useModules = create<ModulesState>()(
	persist(
		(set) => ({
			modulesCompleted: [],
			addModuleCompleted: (module: string) => set((state) => ({ modulesCompleted: [...state.modulesCompleted, module] })),
			resetModules: () => set({ modulesCompleted: [] }),
		}),
		{
			name: "modules",
		},
	),
);
