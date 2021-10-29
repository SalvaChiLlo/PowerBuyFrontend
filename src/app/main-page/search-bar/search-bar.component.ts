import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Observable, Subject } from 'rxjs';

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
    this.searchTerms = term;
    this.busquedaEvent.emit(this.searchTerms);
  }

  ngOnInit(): void {

  }

}
