import {Component} from '@angular/core';
import {ProductRecipeService} from "../services/product-recipe.service";
import {Product} from "../modals/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  isInputEmpty: boolean = true;
  isLoading: boolean = false;

  constructor(private productService: ProductRecipeService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().then((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;
    }).finally(() => this.isLoading = false);
  }

  onFilteredItemsChange(filteredItems: any[]): void {
    this.filteredProducts = filteredItems;
  }
}
