import {Component} from '@angular/core';
import {LoginService} from "../services/login.service";
import {NavigationService} from "../services/navigation.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  protected userType: string = 'user'

  constructor(private loginService: LoginService,
              private navigationService: NavigationService,
              private toastrService: ToastrService) {
    if (JSON.parse(localStorage.getItem('isLoggedIn') || '')) {
      this.navigationService.navigateRoot();
    }
  }

  register(value: any) {
    delete value.confirmPassword;
    this.loginService.register(value).then(() => {
      this.toastrService.show("You Registered successfully, Welcome :-)", '', {positionClass: 'toast-center-center'});
    }, () => {

    });
  }
}
