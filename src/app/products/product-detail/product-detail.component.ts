import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductRecipeService} from "../../services/product-recipe.service";
import {Product} from "../../modals/product";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  protected product!: Product;
  private productId: any;
  private userId: any;
  protected isInCart: boolean = false;
  protected isError: boolean = false;
  protected recipes: any[] | undefined;
  protected products: any[] | undefined;
  protected isRecipeLoading: boolean = true;
  protected isLoading: boolean = true;
  protected cartCount: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductRecipeService,
    private cartService: CartService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetails(this.productId);
      this.userId = localStorage.getItem('userId');
    });
    this.getRecommendedProducts()
  }

  getProductDetails(productId: string): void {
    this.productService.getProduct(productId).then(
      async (product: any) => {
        this.product = product;
        await this.checkCartItems();
      },
      (error) => {
        this.isError = true;
        console.error('Error fetching product details:', error);
      }
    ).finally(() => this.isLoading = false);
  }

  addToCart(quantity: number) {
    this.isLoading = true;
    this.cartService.addToCart(this.userId, this.productId, quantity).then(
      (response) => {
        console.log('Item added to cart:', response);
        this.cartCount = response;
        this.isInCart = true;
      },
      (error: any) => {
        console.error('Error adding item to cart:', error);
      }
    ).finally(() => {
      this.isLoading = false;
    });
  }

  async checkCartItems() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      await this.cartService.getCartItems(+userId).then(
        (cartItems: any[]) => {
          this.isInCart = cartItems.some((item) => {
            return item.product.id == this.productId;
          });
        },
        (error: any) => {
          console.error('Error fetching cart items:', error);
        }
      );
    }
  }

  goToAllProducts() {
    this.router.navigate(['products'])
  }

  private getRecommendedProducts() {
    this.productService.getRecipes().then((recipes: any[]) => {
      this.recipes = recipes;
    }).finally(() => this.isRecipeLoading = false);
  }


}
