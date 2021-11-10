import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Opinion } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  constructor(private http: HttpClient) {

  }

  public createOpinion(opinion: Opinion) {
    return this.http.post<Opinion>(environment.baseBackendURL + '/api/reviews', opinion)

  }
}
