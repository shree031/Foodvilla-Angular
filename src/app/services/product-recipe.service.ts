import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product, Recipe} from "../modals/modal_def";

@Injectable({
  providedIn: 'root'
})
export class ProductRecipeService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Product[]>(this.baseUrl + 'products').subscribe((result) => {
        resolve(result)
      }, (err) => reject(err))
    });
  }

  getProduct(productId: string): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}products/${productId}`;
      this.http.get<Recipe[]>(url).subscribe((res) => {
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

  getRecipe(recipeId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}recipes/${recipeId}`;
      this.http.get(url).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err)
      })
    });
  }

  getDistributorProducts(distId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}products/distributor/${distId}`;
      this.http.get(url).subscribe((res) => {
        console.log("***************res", res)
        resolve(res);
      }, (err) => {
        reject(err)
      })
    });

  }

  addProduct(value: any, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any[]>(this.baseUrl + 'products/' + id, value).subscribe((result) => {
        resolve(result)
      }, (err) => reject(err))
    })
  }

  updateProduct(productId: number, product: any, userId: number) {
    return new Promise((resolve, reject) => {
      return this.http.put(`${this.baseUrl}products/${productId}`, product).subscribe((result) => {
        resolve(result)
      }, (err) => reject(err))
    })
  }

  deleteProduct(productId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.delete(`${this.baseUrl}products/${productId}`).subscribe((result) => {
        resolve(result)
      }, (err) => reject(err))
    })
  }
}
