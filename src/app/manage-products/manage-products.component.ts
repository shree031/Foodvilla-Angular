import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductRecipeService} from "../services/product-recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Product} from "../modals/modal_def";
import {NavigationService} from "../services/navigation.service";
import {UserType} from "../modals/enum";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: any;
  categories: any = [
    {name: 'All', count: 0},
    {name: 'Fruits', count: 0},
    {name: 'Vegetables', count: 0},
    {name: 'Ingredients', count: 0}
  ];
  selectedTab: 'All' | Product['type'] = 'All';
  private userId: number = 0;
  public filteredProducts: Product[] = [];
  productForm!: FormGroup;
  userType: string = 'Vegetables';
  showContainer: boolean = false;
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  isImageRemoved: boolean = false;
  currentProductId: number | null = null;

  @ViewChild('targetDiv', {static: false}) targetDiv!: ElementRef;
  private userDetails: any;

  constructor(private productRecipeService: ProductRecipeService,
              private fb: FormBuilder,
              private navigationService: NavigationService,
              private toastrService: ToastrService) {
    if (!JSON.parse(localStorage.getItem('isLoggedIn') || 'false')) {
      this.navigationService.navigateRoot();
    }
  }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.userId = this.userDetails?.id;
    if (![UserType.DISTRIBUTOR, UserType.ADMIN].includes(this.userDetails.userType)){
      this.navigationService.navigateRoot();
    }
      this.isLoading = true;

    if (this.userDetails.userType===UserType.DISTRIBUTOR) {
      this.getCurrentDistributorProducts();
    } else {
      this.getAllProducts();
    }
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
    this.selectedTab = category.name;
    if (category.name === 'All') {
      this.filteredProducts = this.products;
      category.count = this.filteredProducts.length;
      return;
    }
    this.filteredProducts = this.products.filter((product: Product) => {
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
            await this.getCurrentDistributorProducts();
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
            await this.getCurrentDistributorProducts();
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
    this.userType = product.type;
    this.isImageRemoved = false;
    setTimeout(() => {
      this.targetDiv.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  private getCurrentDistributorProducts() {
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
    console.log("yes pe click kiya: this.currentProductId", this.currentProductId)
    this.productRecipeService.deleteProduct(Number(this.currentProductId)).then(async (res: any[]) => {
      this.toastrService.show("Product deleted successfully");
      await this.getCurrentDistributorProducts();

    }).finally(() => this.isLoading = false);
  }

  markOutOfStock(product: any) {
    this.productRecipeService.markOutOfStock(Number(product.id)).then(async (res: any[]) => {
      this.toastrService.show("Product marked as out of stock");
      await this.getCurrentDistributorProducts();

    }).finally(() => this.isLoading = false);
  }

  markAvailable(product: any) {
    this.productRecipeService.markAvailable(Number(product.id)).then(async (res: any[]) => {
      this.toastrService.show("Product marked as available");
      await this.getCurrentDistributorProducts();
    }).finally(() => this.isLoading = false);
  }

  private getAllProducts() {
    this.productRecipeService.getProducts().then((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.categories[0].count = products.length;
    }).finally(() => this.isLoading = false);
  }
}
