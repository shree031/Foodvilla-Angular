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

  constructor(private cartService: CartService,
              private router: Router,
              private actRoute: ActivatedRoute) {
    this.navState = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.getCartItems(this.navState?.userId);
  }

  private getCartItems(userId: any) {
    this.cartService.getCartItems(userId).then((res) => {
      this.cartItems = res;
    }, err => console.log(err));
  }
}
