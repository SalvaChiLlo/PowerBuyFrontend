import { ClientesService } from '../services/clientes.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../models/producto.model';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public userId: number = -1;
  public user: Cliente = {
    id: -1,
    username: 'pacoLopez',
    email: 'paquito@gmail.com',
    imageURL: '',
    createdAt: '',
    updatedAt: ''
  };
  public imagen: string;
  constructor(private route: ActivatedRoute, private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') ? +paramMap.get('id') : -1
      this.getUser()
    });
  }

  private getUser() {
    this.clientesService.getClientById(this.userId).subscribe((user: any) => {
      this.user = user[0]
      this.imagen = this.user.imageURL ? JSON.parse(this.user.imageURL) : ['https://drive.google.com/uc?id=1B7MZEPUkmFHkyynxwA3gkLgnGoEPvaf5']
    })
  }
}
