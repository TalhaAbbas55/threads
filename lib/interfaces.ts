export interface SingleRecipe {
  uri?: string;
  label?: string;
  image?: string;
  source?: string;
  url?: string;
  shareAs?: string;
  dietLabels?: string[];
  healthLabels?: string[];
  cautions?: string[];
  ingredientLines?: string[];
  ingredients?: string[];
  calories?: number;
  totalWeight?: number;
  totalTime?: number;
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
  totalNutrients?: string[];
  totalDaily?: string[];
  digest?: string[];
}

export interface Recipe {
  recipe: SingleRecipe;
}
