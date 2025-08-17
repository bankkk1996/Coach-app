import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, MealEntry, WorkoutEntry, Goals, MealType, FoodItem } from "../types/entities";

type Actions = {
  // Meals
  addMeal: (m: Omit<MealEntry, "id"> & { id: string }) => void;
  updateMeal: (id: string, patch: Partial<MealEntry>) => void;
  deleteMeal: (id: string) => void;
  // Workouts
  addWorkout: (w: Omit<WorkoutEntry, "id"> & { id: string }) => void;
  updateWorkout: (id: string, patch: Partial<WorkoutEntry>) => void;
  deleteWorkout: (id: string) => void;
  toggleWorkout: (id: string) => void;
  // Goals
  setGoals: (g: Partial<Goals>) => void;
};

export const useApp = create<AppState & Actions>()(
  persist(
    (set, get) => ({
      meals: [],
      workouts: [],
      goals: {},

      // Meals
      addMeal: (m) => set((s) => ({ meals: [m, ...s.meals] })),
      updateMeal: (id, patch) =>
        set((s) => ({ meals: s.meals.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteMeal: (id) => set((s) => ({ meals: s.meals.filter((x) => x.id !== id) })),

      // Workouts
      addWorkout: (w) => set((s) => ({ workouts: [w, ...s.workouts] })),
      updateWorkout: (id, patch) =>
        set((s) => ({ workouts: s.workouts.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteWorkout: (id) => set((s) => ({ workouts: s.workouts.filter((x) => x.id !== id) })),
      toggleWorkout: (id) =>
        set((s) => ({
          workouts: s.workouts.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)),
        })),

      // Goals
      setGoals: (g) => set((s) => ({ goals: { ...s.goals, ...g } })),
    }),
    {
      name: "app-state-v1",
      storage: createJSONStorage(() => AsyncStorage),
      // partialize: (s) => ({ meals: s.meals, workouts: s.workouts, goals: s.goals }),
    }
  )
);
