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
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';

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
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-be' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
