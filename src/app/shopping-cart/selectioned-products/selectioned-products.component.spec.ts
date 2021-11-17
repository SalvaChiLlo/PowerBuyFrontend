import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionedProductsComponent } from './selectioned-products.component';

describe('SelectionedProductsComponent', () => {
  let component: SelectionedProductsComponent;
  let fixture: ComponentFixture<SelectionedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
