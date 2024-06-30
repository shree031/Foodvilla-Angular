import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login.service";
import {NavigationService} from "../services/navigation.service";
import {ToastrService} from "ngx-toastr";
import {UserType} from "../modals/enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected errorMessage: string | undefined;
  protected userType: UserType = UserType.USER
  protected readonly UserType = UserType;

  constructor(private loginService: LoginService,
              private navigationService: NavigationService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('isLoggedIn') || 'false')) {
      this.navigationService.navigateRoot();
    }
  }

  login(username: string, password: string, userType: string) {
    this.loginService.login(username, password, userType).then(() => {
      this.toastrService.show("You logged in successfully :-)", '', {positionClass: 'toast-center-center'});
    }, (error) => {
      if (error.status === 401) {
        this.errorMessage = 'Incorrect username or password.';
      }
    });
  }

}
