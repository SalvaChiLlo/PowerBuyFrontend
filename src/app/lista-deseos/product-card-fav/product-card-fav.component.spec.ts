import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardFavComponent } from './product-card-fav.component';

describe('ProductCardFavComponent', () => {
  let component: ProductCardFavComponent;
  let fixture: ComponentFixture<ProductCardFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardFavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
