import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../services/cart.service";
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  protected isLoggedIn: boolean = false;
  protected cartQuantity: number = 0;
  private userId: any;


  constructor(protected router: Router,
              private cartService: CartService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    let userDetails;
    if (!localStorage.getItem('userDetails')) {
      return;
    }
    userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.userId = userDetails.id;
    localStorage.setItem('userId', this.userId);
    this.isLoggedIn = true;
    if (localStorage.getItem('cart-quantity')) {
      this.cartQuantity = +JSON.parse(localStorage.getItem('cart-quantity') || '');
    } else {
      this.cartService.setCartCount(this.userId);
    }
  }

  navigateTo(str: string) {
    void this.navigationService.navigateForward(`/${str}`, {
      state: {
        userId: this.userId
      }
    });
  }

  logout(): void {
    localStorage.removeItem('userDetails');
    this.isLoggedIn = false;
    this.navigateTo('');
  }

}
