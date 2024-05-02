import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavHeaderComponent} from './nav-header/nav-header.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ProductsComponent} from './products/products.component';
import {ProductWidgetComponent} from './products/product-widget/product-widget.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeWidgetComponent} from './recipes/recipe-widget/recipe-widget.component';
import {AccountComponent} from './account/account.component';
import {FormsModule} from "@angular/forms";
import {StarRatingComponent} from './star-rating/star-rating.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {HttpClientModule} from "@angular/common/http";
import { LoaderComponent } from './loader/loader.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    ProductWidgetComponent,
    RecipesComponent,
    RecipeWidgetComponent,
    AccountComponent,
    StarRatingComponent,
    SearchBarComponent,
    LoaderComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
