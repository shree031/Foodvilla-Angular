import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductRecipeService} from "../services/product-recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  products: any;
  isLoading: any;
  categories: any = [
    {name: 'All', count: 0},
    {name: 'Fruits', count: 0},
    {name: 'Vegetables', count: 0},
    {name: 'Ingredients', count: 0}
  ];
  selectedTab: 'All' | 'Fruits' | 'Vegetables' | 'Ingredients' = 'All';
  private userId: number = 0;
  public filteredProducts: any;
  productForm!: FormGroup;
  userType = 'vegetables';
  showContainer: boolean = false;
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  isImageRemoved: boolean = false;
  currentProductId: number | null = null;

  @ViewChild('targetDiv', {static: false}) targetDiv!: ElementRef;

  constructor(private productRecipeService: ProductRecipeService, private fb: FormBuilder, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userDetails') || '')?.id;
    this.isLoading = true;
    this.getProducts();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      rating: [0]
    });
  }

  changeTab(category: any) {
    if (category.name === 'All') {
      this.filteredProducts = this.products;
      category.count = this.filteredProducts.length;
      return;
    }
    this.filteredProducts = this.products.filter((product: { type: string; }) => {
      return product.type === category.name
    });
    category.count = this.filteredProducts.length;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      if (this.isEditMode) {
        this.productRecipeService.updateProduct(this.currentProductId!, this.productForm.value, this.userId).then(
          async (response) => {
            this.toastrService.show('Product updated successfully');
            this.productForm.reset();
            this.showContainer = false;
            this.isEditMode = false;
            this.currentProductId = null;
            await this.getProducts();
          },
          (error) => {
            console.error('Error updating product', error);
          }
        ).finally(() => this.isLoading = false);
      } else {
        this.productRecipeService.addProduct(this.productForm.value, this.userId).then(
          async (response) => {
            this.toastrService.show('Product added successfully');
            this.productForm.reset();
            this.showContainer = false;
            await this.getProducts();
          },
          (error) => {
            console.error('Error adding product', error);
          }
        ).finally(() => this.isLoading = false);
      }
    }
  }

  addProduct() {
    this.showContainer = true;
    this.isEditMode = false;
    this.productForm.reset();
    setTimeout(() => {
      this.targetDiv.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  editProduct(product: any) {
    this.showContainer = true;
    this.isEditMode = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
    this.isImageRemoved = false;
    setTimeout(() => {
      this.targetDiv.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  private getProducts() {
    this.productRecipeService.getDistributorProducts(this.userId).then((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.categories[0].count = products.length;
    }).finally(() => this.isLoading = false);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.productForm.patchValue({
        imageUrl: '/assets/images/' + this.selectedFile.name
      });
      this.isImageRemoved = false;
    }
  }

  removeImage(): void {
    this.productForm.patchValue({
      imageUrl: ''
    });
    this.isImageRemoved = true;
  }

  deleteProduct() {
    this.productRecipeService.deleteProduct(this.userId).then((res: any[]) => {

    }).finally(() => this.isLoading = false);
  }
}
