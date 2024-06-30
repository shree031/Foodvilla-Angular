import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  sendEmail(emailData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/api/sendEmail', emailData).subscribe(
        (response) => {
          resolve(null);
          console.log('Email sent successfully', response);
        },
        (error) => {
          console.error('Error sending email', error);
          reject(error)
        }
      );
    });

  }
}
