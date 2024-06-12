import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorHomeComponent } from './distributor-home.component';

describe('DistributorHomeComponent', () => {
  let component: DistributorHomeComponent;
  let fixture: ComponentFixture<DistributorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
