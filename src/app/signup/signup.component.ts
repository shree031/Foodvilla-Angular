import {Component} from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private loginService: LoginService) {
  }

  register(value: any) {
    this.loginService.register(value.username, value.password, value.email, value.userType);
  }
}
