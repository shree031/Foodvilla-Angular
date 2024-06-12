import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductRecipeService} from "../../services/product-recipe.service";
import {CartService} from "../../services/cart.service";
import {NavigationService} from "../../services/navigation.service";
import {Product} from "../../modals/modal_def";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent  implements OnInit {
  products: any;
  isProductLoading: any;
  isLoading: any;
  isError: any;
  recipe: any;
  private recipeId: any;
constructor(
  private route: ActivatedRoute,
  private recipeService: ProductRecipeService,
  private cartService: CartService,
  private router: Router,
  private navigationService:NavigationService) {
}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.getRecipeDetails(this.recipeId);
    });
    this.getRecommendedProduct()
  }

  getRecipeDetails(recipeId: string): void {
    this.recipeService.getRecipe(recipeId).then(
      async (recipe: any) => {
        this.recipe = recipe;
      },
      (error) => {
        this.isError = true;
        console.error('Error fetching product details:', error);
      }
    ).finally(() => this.isLoading = false);
  }
  goToAllRecipes() {
  this.navigationService.navigateForward('recipes');
  }

  private getRecommendedProduct() {
    this.recipeService.getProducts().then((products: any[]) => {
      this.products = products;
    }).finally(() => this.isProductLoading = false);
  }

  viewProduct(product: Product) {
    this.router.navigate(['products', product.id]);
  }
}
