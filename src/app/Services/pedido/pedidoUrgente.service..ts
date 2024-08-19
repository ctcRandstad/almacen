import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PedidoUrgenteService {

  constructor( private http:HttpClient) { }
  url = environment.url;

  getPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=getPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getTotalesPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=getTotalesPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getNroPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=getNroPedido")
    .pipe(
      map((e)=> {        
        return e
      }));
  }

  getTotalPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=getTotalPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  delete(idPedidoTempUrgente):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=eliminar",{'idPedidoTempUrgente': idPedidoTempUrgente})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  confirmaPedidos(confirmarPed):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=confirmaPedido",confirmarPed)
    .pipe(
      map((e)=> {  
          
        return e
      }));
  }

  addPedidoN(cantidad ,idPalet ):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=addPedidoN",
    {'cantidad':cantidad , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  modificarCant(cantidad ,idPalet ):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=modificarCant",
    {'cantidad':cantidad , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  modificarObs(observaciones ,idPalet ):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=modificarObs",
    {'observaciones':observaciones , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  modificarIns(instruccion ,idPalet ):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=modificarIns",
    {'instruccion':instruccion , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  comprobarCat(nombreCategoria,idMaterial):Observable<any>{
    return this.http.post(this.url +"categoria/categoriaUrgente.php?id=comprobar",
    {'nombreCategoria': nombreCategoria , 'idMaterial' : idMaterial})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  // addPedidoTemp(pedido:Pedido){
  //   return this.http.post(this.url +"pedido/pedidoUrgente.php?id=addPedido", pedido)
  //   .pipe(
  //     map((e)=> {
  //       return e
  //     }));
    
  // }

  // pedidos realizados.

  getPedidoRealizados():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=getPedidoRealizados")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getPediRealizadoById(idPedidoUrgente):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=getPById",{'idPedidoUrgente': idPedidoUrgente})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  buscarInstruccion(instruccion):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=instruccion",{'instruccion': instruccion})
    .pipe(
      map((e)=> {
        return e
      }));
  }


  getTotalesPedidoRealizados(idPedido):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=getTotalesPedidoRealizado", { 'idPedido' : idPedido} )
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getTotalPedidoRealizado(idPedido):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=getTotalPedidoRealizado", {'idPedido' : idPedido})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  eliminarPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=eliminarPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  // /garolera

  
  getPedidoRealizadosGa():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getPedidoRealizadosGaUrgentes")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getPediRealizadoByIdGa(idPedido):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=getPByIdGa",{'idPedido': idPedido})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getTotalPedidos():Observable<any>{
    return this.http.get(this.url +"pedido/pedidoUrgente.php?id=getTotalesPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getTotalPedidosHistoricos():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getTotalesPedidoHistoricos")
    .pipe(
      map((e)=> {   
      return e
      }));
  }


  editarPedido(idPedidoUrgente):Observable<any>{
    return this.http.post(this.url +"pedido/pedidoUrgente.php?id=ediPalet",{'idPedidoUrgente': idPedidoUrgente})
    .pipe(
      map((e)=> {   
        return e
      }));
  }

  eliminarPalet(idDetalle,comentarios):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=eliPalet",{'idDetalle': idDetalle , 'comentarios':comentarios})
    .pipe(
      map((e)=> {               
        return e
      }));
  }

  modifiCant(cantidad, idDetalle):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=ediCant",{'cantidad': cantidad , 'idDetalle' :idDetalle})
    .pipe(
      map((e)=> {   

   
        return e
      }));
    }
    
    modifiPrecio(precio, idDetalle):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=ediPrecio",{'precio': precio , 'idDetalle' :idDetalle})
      .pipe(
        map((e)=> {   
        return e
      }));
  }

  confirmarPedidoG(pedido):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=confirmarPedido", pedido)
    .pipe(
      map((e)=> { 
        
        
        return e
      }));
  }

 
  addEliminadosGa(idDetalle):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=addEliminadosG",{'idDetalle': idDetalle})
    .pipe(
      map((e)=> {
       
        
        return e
      }));
    }
     

  
}
