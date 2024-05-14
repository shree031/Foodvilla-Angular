import {Injectable} from '@angular/core';
import {Product} from "../modals/product";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductRecipeService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<Product[]>(this.baseUrl + 'products').subscribe((result) => {
        resolve(result)
      }, (err) => reject(err))
    });
  }

  getProduct(productId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}products/${productId}`;
      this.http.get(url).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err)
      })
    });
  }

  getRecipes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + 'recipes').subscribe((result) => {
        resolve(result)
      }, (err) => reject(err))
    });
  }
}
