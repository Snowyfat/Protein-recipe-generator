
export interface CalorieInfo {
  ingredient: string;
  calories: number;
}

export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  estimatedCaloriesPerServing: number;
  calorieBreakdown: CalorieInfo[];
}