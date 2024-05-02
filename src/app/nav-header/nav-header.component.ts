import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  protected isLoggedIn: boolean = false;
  protected cartQuantity: number = 0;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const userDetails = localStorage.getItem('userDetails');
    this.isLoggedIn = !!userDetails;
  }

  navigateTo(str: string) {
    void this.router.navigate([`/${str}`]);
  }

  logout(): void {
    localStorage.removeItem('userDetails');
    this.isLoggedIn = false;
    this.navigateTo('');
  }
}
