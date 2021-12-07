import { Categoria, CategoriaProducto } from './../models/producto.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/producto.model';
import { ClientesService } from '../services/clientes.service';

import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  placeholderImage = 'https://drive.google.com/uc?id=1MDeTJsllJwe1gbJRR_xhDOm0k3WNtaVs'
  userImage: string;
  client: Cliente | null;
  showStoreMenu = false;
  showCategorias = false;
  showSearchMenu = false;
  showBack = false;
  showBackNSearch = false;
  options = [
    { name: "Relevancia", value: 1 },
    { name: "Precio Ascendente", value: 2 },
    { name: "Precio Descentente", value: 3 },
    { name: "Alfabéticamente Ascentente", value: 4 },
    { name: "Alfabéticamente Descendente", value: 5 },
    { name: "Cantidad Lote Ascendente", value: 6 },
    { name: "Cantidad Lote Descendente", value: 7 },
  ];
  categorias: CategoriaProducto[] = [];
  @ViewChild('navBar') navBar: ElementRef;
  id: number = -1;

  busqueda = '';
  activeOption: number = 1;
  activeCategory: string = 'Todas las Categorías';
  pageName = 'Home'
  showLogo = true;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private auth: Auth,
    private clienteService: ClientesService,
    private location: Location,
    private categoriasService: CategoriasService
  ) {
    this.id = 2;
  }
  ngOnInit(): void {
    this.clienteService.currentClientSubject.subscribe(client => {
      this.client = client
      if (client) {
        this.userImage = client.imageURL;
      }
    })

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {

        this.showStoreMenu = false;
        this.showCategorias = false;
        this.showSearchMenu = false;
        this.showBack = false;
        this.showBackNSearch = false;

        this.showCategorias = ev.url === '/home'
        this.showBack = !(ev.url === '/home' || ev.url === '/listaDeseos');
        if (ev.url === '/listaDeseos') {
          this.showLogo = false;
          this.pageName = 'Favoritos'
          this.showBackNSearch = true
        }

        if (ev.url === '/historialCompras') {
          this.showLogo = false;
          this.pageName = 'Mis Participaciones'
        }

        if (ev.url === '/shopping-cart') {
          this.showLogo = false;
          this.pageName = 'Cesta'
        }

        if (ev.url === '/user') {
          this.showLogo = false;
          this.pageName = 'Cuenta'
        }

        if (ev.url.includes('/product/')) {
          this.showLogo = true;
          this.pageName = 'Cuenta'
        }

        if (ev.url === '/home'
          || ev.url.includes('/product/')
          || ev.url === '/signin'
          || ev.url === '/signup') {
          this.showLogo = true;
        }

        if (ev.url === '/' && ev.urlAfterRedirects === '/home') {
          this.showBack = false;
          this.showCategorias = true
        }
      }
    })

    this.getCategorias();

    this.categoriasService.busquedaSubject.subscribe(busqueda => {
      this.busqueda = busqueda;
    })

    this.categoriasService.categoriasSubject.subscribe(categoria => {
      this.activeCategory = categoria
    })

    this.categoriasService.sortSubject.subscribe(sort => {
      this.activeOption = sort;
    })
  }

  async logout() {
    this.clienteService.currentClientSubject.next(null);
    this.clienteService.currentCliente = null;
    await signOut(this.auth);
    this.router.navigate(['/home'])
    window.scroll(0, 0)
  }

  close() {
    let navToggle = document.getElementsByClassName('navbar-toggler-icon');
    if (navToggle.length) {
      (navToggle[0] as HTMLElement).click();
    }
  }

  close_store_menu() {
    let navToggle = document.getElementById('store_logo');
    (navToggle as HTMLElement).click();

    this.scrollTop();
  }

  back() {
    this.location.back();
  }

  private getCategorias() {
    this.categoriasService.getAllCategories().subscribe((categorias: any) => {
      this.categorias = categorias
    })
  }

  setCategoria(categoria: string) {
    this.activeCategory = categoria
    this.categoriasService.categoriasSubject.next(categoria)
  }

  setSort(opcion: number) {
    this.activeOption = opcion
    this.categoriasService.sortSubject.next(opcion)
  }

  setBusqueda() {
    this.categoriasService.busquedaSubject.next(this.busqueda)
  }

  scrollTop() {
    const body = document.getElementsByTagName("body")[0] as HTMLElement;
    body.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
