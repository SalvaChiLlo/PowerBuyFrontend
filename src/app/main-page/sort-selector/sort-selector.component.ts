import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html',
  styleUrls: ['./sort-selector.component.css']
})
export class SortSelectorComponent implements OnInit {
  selectedOption: string;
  printedOption: string;

  options = [
    {name: "relevancia", value : 1},
    {name: "precioAscendente", value : 2},
    {name: "precioDescendente", value : 3},
    {name: "cantidadLoteAscendente", value : 4},
    {name: "cantidadLoteDescendente", value : 5},
    {name: "alfabeticamenteAscendente", value : 6},
    {name: "alfabeticamenteDescendente", value : 7}
  ]

  cambio(data : any){
    console.log(data.target.value)
  }

  
  constructor() { }

  ngOnInit(): void {
  }

}
