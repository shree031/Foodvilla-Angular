import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateForward(url: string, navOptions?: any) {
    this.router.navigateByUrl(url, navOptions);
  }

  navigateRoot() {
    this.router.navigateByUrl('/');
  }
}
