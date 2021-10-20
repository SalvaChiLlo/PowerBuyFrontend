import { CategoriasService} from './../../services/categorias.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.css']
})
export class CategoriesSelectorComponent implements OnInit {
  categorias : any
  nombre : any
  opcionSeleccionado: string  = '0'
  public selected : string
  constructor(private route: ActivatedRoute, private categoriasService: CategoriasService) {

  }

  ngOnInit(): void {

    this.selected = ""
    this.getCategorias()

  }

  private getCategorias() {
      this.categoriasService.getAllCategories().subscribe((categorias:any) => {
        this.categorias = categorias
        console.log(this.categorias)

      })
  }

  public filtrarCategoria(e : any){
    this.nombre = e.target.value
    console.log(this.nombre)
  }

}
