import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "../modals/modal_def";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(username: string, password: string, userType: string) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl + 'login', {username, password: btoa(password), userType}).subscribe(
        (response: any) => {
          this.setLoginDetails(response);
          resolve(null);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  register(userData:any) {
    return new Promise((resolve, reject) => {
      const encryptedPassword = btoa(userData.password);
      this.http.post<any>(this.baseUrl + 'register', {...userData, password: encryptedPassword}).subscribe(
        (response: any) => {
          this.setLoginDetails(response);
          resolve(response);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  setLoginDetails(response: any) {
    localStorage.setItem('userDetails', JSON.stringify(response));
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/']);
  }
}
