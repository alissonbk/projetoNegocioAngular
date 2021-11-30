import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CidadeBr } from '../models/cidade-br';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/estadosbr.json').pipe();
  }

  getCidadesBr(idEstado: number){
    return this.http.get<CidadeBr[]>('assets/cidadesbr.json')
      .pipe(
        map((cidades: CidadeBr[]) => cidades.filter(c => c.estado == idEstado))
      );
  }
}
