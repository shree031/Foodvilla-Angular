import { TestBed } from '@angular/core/testing';

import { ProductRecipeService } from './product-recipe.service';

describe('ProductService', () => {
  let service: ProductRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
