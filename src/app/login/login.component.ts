import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected errorMessage: string | undefined;

  constructor(private loginService: LoginService) {
  }

  login(username: string, password: string, userType: string) {
    this.loginService.login(username, password, userType).then(() => {
    }, (error) => {
      if (error.status === 401) {
        this.errorMessage = 'Incorrect username or password.';
      }
    });
  }
}
