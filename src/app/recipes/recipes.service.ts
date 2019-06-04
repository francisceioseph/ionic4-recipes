import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schinitzel',
      imageUrl:
        'https://www.recipetineats.com/wp-content/uploads/2017/08/Schnitzel-9.jpg',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    }
  ];

  private recipesSub = new BehaviorSubject<Recipe[]>([]);

  constructor() { }

  get recipesSubject(): BehaviorSubject<Recipe[]> {
    return this.recipesSub;
  }

  getAllRecipes(): void {
    this.recipesSub.next(this.recipes);
  }

  getRecipe(id: string): Recipe {
    const found = this.recipes.find(recipe => recipe.id === id);
    return { ...found };
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.recipesSub.next(this.recipes);
  }
}
