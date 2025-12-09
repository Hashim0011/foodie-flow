export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  time: string;
  servings: string;
  calories: string;
  difficulty: string;
  isFavorite: boolean;
  isUserCreated: boolean;
}

export type ViewState = 'LIST' | 'ADD' | 'EDIT';

export interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
}