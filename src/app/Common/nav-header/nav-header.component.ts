import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {NavigationService} from "../../services/navigation.service";
import {ToastrService} from "ngx-toastr";
import {UserType} from "../../modals/enum";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  @Input() cartCount = undefined;
  protected isLoggedIn: boolean = false;
  protected cartQuantity: number = 0;
  private userId: any;
  protected readonly UserType = UserType;
  protected userType: UserType = UserType.USER;


  constructor(protected router: Router,
              private cartService: CartService,
              private navigationService: NavigationService,
              private toastr: ToastrService) {
  }

  async ngOnInit() {
    let userDetails;
    userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    if (!Object.keys(userDetails).length) {
      return;
    }
    this.isLoggedIn = true;
    this.userId = userDetails.id;
    this.userType = userDetails.userType;
    localStorage.setItem('userId', this.userId);
    if (this.userType !== UserType.USER) {
      return;
    }
    if (localStorage.getItem('cart-quantity')) {
      this.cartQuantity = +JSON.parse(localStorage.getItem('cart-quantity') || '');
    } else {
      this.cartQuantity = await this.cartService.setCartCount(this.userId);
    }
  }

  navigateTo(str: string) {
    let state;
    if (str !== 'login') {
      state = {
        userId: this.userId
      }
    }
    void this.navigationService.navigateForward(`/${str}`, {
      state
    });
  }

  logout(): void {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.navigateTo('');
    this.userType = UserType.USER;
    this.toastr.show("You logged out successfully");
  }

}
