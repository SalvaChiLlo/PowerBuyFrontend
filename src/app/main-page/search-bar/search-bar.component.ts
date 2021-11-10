import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() busquedaEvent = new EventEmitter<string>();
  private searchTerms: string = '';

  constructor() { }

  search(event: any, term: string): void {
    event.preventDefault();
    console.log(term);
    this.searchTerms = term;
    this.busquedaEvent.emit(this.searchTerms);
  }

  ngOnInit(): void {

  }

}
