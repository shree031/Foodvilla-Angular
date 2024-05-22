import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private navState: any;
  protected cartItems: any;
  protected isLoading: boolean = true;
  private readonly userId: number;

  constructor(private cartService: CartService,
              private router: Router,
              private actRoute: ActivatedRoute) {
    this.navState = this.router.getCurrentNavigation()?.extras.state;
    this.userId = this.navState?.userId;
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.getCartItems();
    this.isLoading = false
  }

  private async getCartItems() {
    await this.cartService.getCartItems(+this.userId).then((res) => {
      this.cartItems = res;
    }, err => console.log(err));
  }

  removeFromCart(product: any) {
    this.isLoading = true;
    this.cartService.removeItem(+this.userId, product.id).then(async (res) => {
      await this.getCartItems();
    }, () => {
      console.log("Ooops! something went wrong");
    }).finally(() => {
      this.isLoading = false;
    });
  }
}
