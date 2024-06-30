import {Component, OnInit} from '@angular/core';
import {Navigation, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  formData: any;
  userDetails: any;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('isLoggedIn') || '')) {
      this.navigationService.navigateRoot();
      return;
    }
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
  }
}
