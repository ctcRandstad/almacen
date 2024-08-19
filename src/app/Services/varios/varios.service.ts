import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariosService {

 
  constructor( private http:HttpClient) { }
  url = environment.url;

         
  getValidadosById(idPedido:number,idMaterial:number):Observable<any>{
    return this.http.post(this.url +"varios/varios.php?id=getValidadosByIdApp",{'idPedido': idPedido,'idMaterial' : idMaterial})
    .pipe(
      map((e)=> {
        return e
      }));
    }
  confirmarAlbaranApp(idPedido:number,idMaterial:number):Observable<any>{
    return this.http.post(this.url +"varios/varios.php?id=confirmarAlbaranApp",{'idPedido': idPedido,'idMaterial' : idMaterial})
    .pipe(
      map((e)=> {
        return e
      }));
    }

    getPedidoRealizados(idMaterial:number):Observable<any>{
      return this.http.post(this.url +"varios/varios.php?id=getPedidoRealizados",{'idMaterial' : idMaterial})
      .pipe(
        map((e)=> {
          return e
        }));
    }
  
    modeficaPalet( idDetalle:any , cantidadPalet:any, idMaterial:any):Observable<any>{
      return this.http.post(this.url +"varios/varios.php?id=modeficaPalet",
      { 'idDetalle':idDetalle , 'cantidadPalet': cantidadPalet, 'idMaterial' : idMaterial})
      .pipe(
        map((e)=> {        
          return e
        }));
      }
  getPediRealizadoById(idPedido:any,idMaterial:any):Observable<any>{
    return this.http.post(this.url +"varios/varios.php?id=getPById",{'idPedido': idPedido, 'idMaterial' : idMaterial})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getTotalPedidoRealizado(idPedido:any,idMaterial:any):Observable<any>{
    return this.http.post(this.url +"varios/varios.php?id=getTotalesPedidoRealizado", {'idPedido' : idPedido , 'idMaterial' : idMaterial})
    .pipe(
      map((e)=> {
        return e
      }));
    }

    validarEntrada(idDetalle:any,cantidad:any, cantidadM:any,codigoSap:any,idPedido:any,palet:any, idMaterial:any,idProveedor:any,stockF:any ):Observable<any>{
      return this.http.post(this.url +"varios/varios.php?id=validarEntrada",
      {'idDetalle' :idDetalle ,  'cantidad' : cantidad ,  'cantidadM' : cantidadM ,  'codigoSap' : codigoSap, 
      'idPedido' : idPedido, 'palet' : palet,'idMaterial' : idMaterial , 'idProveedor':idProveedor , 'stockF':stockF})
      .pipe(
        map((e)=> {    
          
          return e
        }));
      }


    modificarEntrada(idDetalle:any,cantidad:any, idMaterial:any):Observable<any>{
      return this.http.post(this.url +"varios/varios.php?id=modificarEntrada",
      {'idDetalle' :idDetalle ,  'cantidad' : cantidad, 'idMaterial' : idMaterial})
      .pipe(
        map((e)=> {    
          // console.log(e);
            
          return e
        }));
      }
    
    getEntradaVarios(idMaterial:any):Observable<any>{
      return this.http.post(this.url +"varios/varios.php?id=getEntradaMaterialVarios",{'idMaterial':idMaterial})
      .pipe(
        map((e)=> {
      // console.log(e);
      
          return e
        }));
    }



    getUbicacionMaterial(codigoSap:any,idMaterial:any):Observable<any>{
      return this.http.post(this.url +"ubicaciones/ubicaciones.php?id=getUbicacionMaterial",{'codigoSap': codigoSap,'idMaterial' : idMaterial})
      .pipe(
        map((e)=> {
          return e
        }));
      }


    
      estanteriaById(idEstanteria:any):Observable<any>{
        return this.http.post(this.url +"ubicaciones/ubicaciones.php?id=estanteriaById",{'idEstanteria':idEstanteria})
        .pipe(
          map((e)=> {
        // console.log(e);
        
            return e
          }));
      }
  
      ubicarMaterial(datos:any):Observable<any>{
        return this.http.post(this.url +"varios/varios.php?id=ubicarMaterial", datos)
        .pipe(
          map((e)=> {  
       
            return e
          }));
      }   



      getStockAlmacen(idMaterial:any):Observable<any>{
        return this.http.post(this.url +"varios/varios.php?id=getStockAlmacen",{'idMaterial' : idMaterial})
        .pipe(
          map((e)=> {
            return e
          }));
      }

      getStockAlmacenDetalle(codigoSap:any):Observable<any>{
        return this.http.post(this.url +"varios/varios.php?id=getStockAlmacenDetalle",{'codigoSap' : codigoSap})
        .pipe(
          map((e)=> {
            return e
          }));
      }


      getMateterialId(idMaterial:any):Observable<any>{
        return this.http.post(this.url +"material/material.php?id=getMateterialId",{'idMaterial': idMaterial})
        .pipe(
          map((e)=> {      
            return e;
          }));
      }
  

}
