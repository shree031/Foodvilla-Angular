import { Component } from '@angular/core';
import {Navigation, Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  formData: any;

  constructor(private router:Router) {
  }

  submitForm() {

  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
