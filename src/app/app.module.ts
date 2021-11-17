import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './main-page/product-card/product-card.component';
import { ProductListComponent } from './main-page/product-list/product-list.component';
import { CategoriesSelectorComponent } from './main-page/categories-selector/categories-selector.component';
import { SearchBarComponent } from './main-page/search-bar/search-bar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import localeDEBE from '@angular/common/locales/de-BE'
import { registerLocaleData } from '@angular/common';
import { SortSelectorComponent } from './main-page/sort-selector/sort-selector.component';
import { RelatedProductsComponent } from './product-detail/related-products/related-products.component';
import { RatingComponent } from './product-detail/rating/rating.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SelectionedProductsComponent } from './shopping-cart/selectioned-products/selectioned-products.component';
import { SummaryComponent } from './shopping-cart/summary/summary.component';
import { CardSlideComponent } from './shopping-cart/card-slide/card-slide.component'
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


registerLocaleData(localeDEBE)
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    MainPageComponent,
    ProductDetailComponent,
    ProductCardComponent,
    ProductListComponent,
    CategoriesSelectorComponent,
    SearchBarComponent,
    ProgressBarComponent,
    SortSelectorComponent,
    RelatedProductsComponent,
    RatingComponent,
    ShoppingCartComponent,
    SelectionedProductsComponent,
    SummaryComponent,
    CardSlideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-be' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
