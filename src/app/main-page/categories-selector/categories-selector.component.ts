import { CategoriasService } from './../../services/categorias.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.css']
})
export class CategoriesSelectorComponent implements OnInit {
  @Output() categoriaEvent = new EventEmitter<string>();
  private searchTerms: string = '';
  categorias: any
  nombre: string
  opcionSeleccionado: string = '0'
  public selected: string
  constructor(private route: ActivatedRoute, private categoriasService: CategoriasService) {

  }

  ngOnInit(): void {

    this.selected = ""
    this.getCategorias()

  }

  private getCategorias() {
    this.categoriasService.getAllCategories().subscribe((categorias: any) => {
      this.categorias = categorias

    })
  }

  public filtrarCategorias(e: any) {
    event.preventDefault()
    this.nombre = e.target.value
    this.searchTerms = this.nombre
    this.categoriaEvent.emit(this.searchTerms)
  }
}
