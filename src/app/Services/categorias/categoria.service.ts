import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  url = environment.url;

  getCategoria():Observable<any>{
    return this.http.get(this.url +"categoria/categoria.php?id=getCategorias")
    .pipe(
      map((e)=> {
        return e;
      }));
  }

  delete(idCategoria:any):Observable<any>{
    return this.http.post(this.url +"categoria/categoria.php?id=eliminar",{'idCategoria': idCategoria})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  editarCat(nombreCategoria:any ,idMaterial:any ,idCategoria:any,observaciones:any):Observable<any>{
    return this.http.post(this.url +"categoria/categoria.php?id=editar"
    ,{'nombreCategoria':nombreCategoria , 'idMaterial': idMaterial , 'idCategoria': idCategoria , 'observaciones':observaciones})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  comprobarCat(nombreCategoria:any,idMaterial:any,observaciones:any):Observable<any>{
    return this.http.post(this.url +"categoria/categoria.php?id=comprobar",
    {'nombreCategoria': nombreCategoria , 'idMaterial' : idMaterial, 'observaciones':observaciones})
    .pipe(
      map((e)=> {
        return e
      }));
  }
}
