import { NgModule } from '@angular/core';
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
import { ProgressBarComponent } from './progress-bar/progress-bar.component'

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
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
