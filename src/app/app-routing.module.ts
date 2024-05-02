import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ProductsComponent} from "./products/products.component";
import {AccountComponent} from "./account/account.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'recipes', component: RecipesComponent},
  { path: 'contactus', component: ContactUsComponent },
  // { path: 'feedback', component: FeedbackComponent },
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
