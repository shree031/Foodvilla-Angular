import {Component} from '@angular/core';
import {ProductRecipeService} from "../services/product-recipe.service";
import {Recipe} from "../modals/recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = this.recipes;
  isLoading: boolean = false;

  constructor(private productService: ProductRecipeService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadRecipes();
  }

  loadRecipes() {
    this.productService.getRecipes().then((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    }).finally(() => this.isLoading = false);
  }

  onFilteredItemsChange(filteredItems: any[]): void {
    this.filteredRecipes = filteredItems;
  }
}
