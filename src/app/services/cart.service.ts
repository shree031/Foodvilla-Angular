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
      this.http.post<any>(this.baseUrl + 'cart/add', {userId, productId, quantity}).subscribe(async () => {
        resolve(await this.setCartCount(userId));
      }, (err) => {
        reject(err);
      });
    })
  }

  getCartItemCount(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.get<number>(`${this.baseUrl}count/${userId}`).subscribe((count: number) => {
        localStorage.setItem('cart-quantity', String(count));
        resolve(count);
      }, error => reject(error));
    })
  }

  getCartItems(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${this.baseUrl}cart/${userId}`).subscribe(async (res: any[]) => {
        await this.setCartCount(userId, res.length);
        resolve(res);
      }, error => {
        reject(error);
      });
    })

  }

  public async setCartCount(userId: number, count?: number): Promise<number> {
    if (count) {
      localStorage.setItem('cart-quantity', String(count));
      return count;
    }
    return await this.getCartItemCount(userId)
  }

  removeItem(userId: number, productId: number) {
    return new Promise((resolve, reject) => {
      this.http.delete<any[]>(
        `${this.baseUrl}cart/${userId}/remove/${productId}`).subscribe(
        (res: any[]) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        });
    })
  }
}
