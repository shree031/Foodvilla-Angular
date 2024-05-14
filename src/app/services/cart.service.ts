import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  addToCart(userId: number, productId: number, quantity: number) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.baseUrl + 'cart/add', {userId, productId, quantity}).subscribe((res) => {
        this.setCartCount(userId);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    })
  }

  getCartItemCount(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.get<number>(`${this.baseUrl}count/${userId}`).subscribe((count: number) => {
        resolve(count);
      }, error => reject(error));
    })
  }

  getCartItems(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${this.baseUrl}cart/${userId}`).subscribe((res: any[]) => {
        resolve(res);
      }, error => {
        reject(error);
      });
    })

  }

  public setCartCount(userId: number) {
    this.getCartItemCount(userId).then(count => {
      localStorage.setItem('cart-quantity', String(count));
    });
  }
}
