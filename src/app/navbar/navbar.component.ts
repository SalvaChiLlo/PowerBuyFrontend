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
  showSearchMenu = false;
  showStoreMenu = false;
  showCategorias = false;
  showBack = false;
  options = [
    { name: "Relevancia", value: 1 },
    { name: "Precio Ascendente", value: 2 },
    { name: "Precio Descentente", value: 3 },
    { name: "Cantidad Lote Ascendente", value: 4 },
    { name: "Cantidad Lote Descendente", value: 5 },
    { name: "Alfabéticamente Ascentente", value: 6 },
    { name: "Alfabéticamente Descendente", value: 7 }
  ];
  categorias: CategoriaProducto[] = [];
  @ViewChild('navBar') navBar: ElementRef;
  id: number = -1;

  busqueda = '';
  activeOption: number = 1;
  activeCategory: string = 'Todas las Categorías';

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
        this.showCategorias = ev.url === '/home'
        this.showBack = !(ev.url === '/home' || ev.url === '/listaDeseos');
        if (ev.url === '/' && ev.urlAfterRedirects === '/home') {
          this.showBack = false;
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
}
