import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProfilePictureViewerComponent } from './profile-picture-viewer/profile-picture-viewer.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ProvisionalAreaComponent } from './provisional-area/provisional-area.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SelectionedProductsComponent } from './shopping-cart/selectioned-products/selectioned-products.component';
import { SummaryComponent } from './shopping-cart/summary/summary.component';
import { CardSlideComponent } from './shopping-cart/card-slide/card-slide.component'
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FavoriteToggleComponent } from './favorite-toggle/favorite-toggle.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';


registerLocaleData(localeDEBE)
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    MainPageComponent,
    ProductDetailComponent,
    UserDetailComponent,
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
    SpinnerComponent,
    ProfilePictureViewerComponent,
    ProvisionalAreaComponent,
    ListaDeseosComponent,
    ShoppingCartComponent,
    SelectionedProductsComponent,
    SummaryComponent,
    CardSlideComponent,
    FavoriteToggleComponent,
    HistorialComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-be' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
