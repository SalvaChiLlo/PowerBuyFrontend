import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() cantDisp: number;
  @Input() cantInicial: number;
  progress: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.progress = Math.floor((this.cantDisp / this.cantInicial) * 100)
  }

}
