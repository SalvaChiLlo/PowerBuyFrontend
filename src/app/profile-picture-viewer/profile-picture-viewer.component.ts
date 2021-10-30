import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture-viewer',
  templateUrl: './profile-picture-viewer.component.html',
  styleUrls: ['./profile-picture-viewer.component.css']
})
export class ProfilePictureViewerComponent implements OnInit {
  @Input('image') image: string;
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('rounded') rounded?: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
