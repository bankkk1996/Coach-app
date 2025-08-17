export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface MealEntry {
  id: string;
  date: string; // YYYY-MM-DD
  type: MealType;
  items: FoodItem[];
  note?: string;
}

export interface WorkoutEntry {
  id: string;
  date: string;
  title: string;
  durationMin: number;
  intensity: "easy" | "moderate" | "hard";
  completed: boolean;
  note?: string;
}

export interface Goals {
  dailyCalories?: number;
  dailyProtein?: number;
  targetWeightKg?: number;
}

export interface AppState {
  meals: MealEntry[];
  workouts: WorkoutEntry[];
  goals: Goals;
}
