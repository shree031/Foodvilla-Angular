import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ProductsComponent} from "./products/products.component";
import {AccountComponent} from "./account/account.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {CartComponent} from "./cart/cart.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {ManageProductsComponent} from "./manage-products/manage-products.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipes/:id', component: RecipeDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'manageProducts', component: ManageProductsComponent},
  {path: 'account', component: AccountComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
