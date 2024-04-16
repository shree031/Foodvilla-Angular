import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {
  protected  isLoggedIn: boolean=false;
  constructor(private router: Router) {
  }

  navigateTo(str: string) {
    this.router.navigate([`/${str}`]);
  }
}
