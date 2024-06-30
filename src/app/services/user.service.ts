import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../modals/modal_def";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      this.http.get<IUser[]>(`${this.baseUrl}users`).subscribe((res: IUser[]) => {
        resolve(res);
      }, (e) => reject(e));
    });
  }

  deleteUser(userId:number) {
    return new Promise((resolve, reject) => {
      this.http.delete<IUser[]>(`${this.baseUrl}user/${userId}`).subscribe((res: any) => {
        resolve(res);
      }, (e) => reject(e));
    });
  }
}
