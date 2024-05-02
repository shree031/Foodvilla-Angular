import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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
      this.http.post<any>(this.baseUrl + 'login', {username, password, userType}).subscribe(
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

  register(username: string, password: string, email: string, userType: string) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl + 'register', {username, password, email, userType}).subscribe(
        (response: any) => {
          this.setLoginDetails(response);
          resolve(response);
        },
        (error: any) => {
          console.log(error)
          reject(error);
        }
      );
    });
  }

  setLoginDetails(response: any) {
    localStorage.setItem('userDetails', JSON.stringify(response));
    this.router.navigate(['/']);
  }
}
