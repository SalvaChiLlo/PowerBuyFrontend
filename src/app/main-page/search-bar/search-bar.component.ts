import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Product } from 'src/app/models/producto.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private searchTerms = new Subject<string>();

  constructor() { }

  search(event: any, term: string): void {
    event.preventDefault();
    console.log(term);
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

  }

}
