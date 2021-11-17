import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListFavComponent } from './product-list-fav.component';

describe('ProductListFavComponent', () => {
  let component: ProductListFavComponent;
  let fixture: ComponentFixture<ProductListFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListFavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
