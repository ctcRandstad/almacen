import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Palet } from 'src/app/palet/model/palet';



@Injectable({
  providedIn: 'root'
})
export class PaletService {

  constructor( private http:HttpClient) { }


  
  url = environment.url;


  getComandasPalet():Observable<any>{
    return this.http.get(this.url +"sob-peti/sob-peti.php?id=getComandasPalet")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getComandasMateriales():Observable<any>{
    return this.http.get(this.url +"sob-peti/sob-peti.php?id=getComandasMateriales")
    .pipe(
      map((e)=> {
        return e
      }));
  }


  getEntradasPalet():Observable<any>{
    return this.http.get(this.url +"sob-peti/sob-peti.php?id=getEntradasPalet")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  
  buscarPaletMedidas( ancho:any , largo:any):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=buscarPalet",
    {'ancho' : ancho, 'largo':largo })
    .pipe(
      map((e)=> {    
      return e
    }));
  }

  
  getPalet(desde:any, hasta:any):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=getPaletsStockApp" , {'desde' : desde, 'hasta':hasta})
    .pipe(
      map((e)=> {
        return e
      }));
    
  }



  getPaletN(){
    return this.http.get(this.url +"palet/palet.php?id=getPaletsN")
    .pipe(
      map((e)=> {
        return e
      }));
    
  }

  comprobarStock(cantidadPalet:any  , id:any ):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=comprobarStockApp",
    {'cantidadPalet' :cantidadPalet ,'id' : id })
    .pipe(
      map((e)=> {    

      return e
    }));
  }


  comprobarStockNuevo(cantidadPalet:any  , id:any ):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=comprobarStockAppNuevo",
    {'cantidadPalet' :cantidadPalet ,'id' : id })
    .pipe(
      map((e)=> {    
      return e
    }));
  }

  comprobarStockNuevoInstrucccion(instruccion:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=comprobarStockNuevoInstrucccion",
    {'instruccion' :instruccion })
    .pipe(
      map((e)=> {    
      return e
    }));
  }

  bajaInstru(instruccion:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=bajaInstru",
    {'instruccion' :instruccion })
    .pipe(
      map((e)=> {    
      return e
    }));
  }

  salidaPalet(cantidad:any,idPalet:any,idUbicacion:any, usuario:any){
    return this.http.post(this.url +"pedido/pedido.php?id=salidaApp", {'cantidad' : cantidad , 'idPalet' :idPalet , 'idUbicacion':idUbicacion, 'usuario': usuario})
    .pipe(
      map((e)=> { 
        
        return e
      }));
    }

    salidaPaletI(cantidad:any ,instruccion:any,idUbicacion:any ,usuario:any,instruccionOriginal:any,idPalet:any){
      return this.http.post(this.url +"pedido/pedido.php?id=salidaApp", 
      {'cantidad' : cantidad , 'instruccion' :instruccion , 'idUbicacion':idUbicacion, 'usuario': usuario,'instruccionOriginal':instruccionOriginal, 'idPalet' : idPalet})
      .pipe(
        map((e)=> { 
          
          return e
        }));
      }

      salidaPaletINueva(cantidad:any ,instruccion:any,idUbicacion:any ,usuario:any,idPalet:any){
        return this.http.post(this.url +"pedido/pedido.php?id=salidaApp", 
        {'cantidad' : cantidad , 'instruccion' :instruccion , 'idUbicacion':idUbicacion, 'usuario': usuario , 'idPalet' : idPalet})
        .pipe(
          map((e)=> { 
            
            return e
          }));
        }
      

  

  addPalet(palet:Palet){
    return this.http.post(this.url +"palet/palet.php?id=addPalets", palet)
    .pipe(
      map((e)=> {
        
        return e
      }));
    
  }

  
  verDev(fecha:any){
    return this.http.post(this.url +"palet/palet.php?id=verDev",{'fecha': fecha})
    .pipe(
      map((e)=> {
        
        return e
      }));
    
  }


  edit(idPalet:Palet):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=editar",{'idPalet': idPalet})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  desestimar(idComanda:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=desestimarComandaM",{'idComanda': idComanda})
    .pipe(
      map((e)=> {
        return e
      }));
  }
  desestimar1(id:any):Observable<any>{
    console.log(id);
    
    return this.http.post(this.url +"pedido/pedido.php?id=desestimarComandaM1",{':id': id})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  desestimarEncargados(idComanda:number):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=desestimarEncargados",{'idComanda': idComanda})
    .pipe(
      map((e)=> {
        return e
      }));
  }


  

  editPalet(palet: Palet):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=editPalet", palet)
    .pipe(
      map((e)=> {    
        return e
      }));
  }

  addStock(stockReal:any , stockMinimo:any,idStock:any):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=addStock",
    {'stockReal': stockReal, 'stockMinimo': stockMinimo, 'idStock': idStock})
    .pipe(
      map((e)=> {       
        return e
      }));
  }

// lo enviamo a pedido para comprobar el material segun su categoría. 
  getPaletIdCat(idPalet:number):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=getPaletByIdApp",{'idPalet': idPalet})
    .pipe(
      map((e)=> {      
        return e
      }));
  }

  // App

  
  scroll(siguiente:any):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=scroll",{'siguiente': siguiente})
    .pipe(
      map((e)=> {        
        return e
      }));
  }

  getPaletCat(idCategoria:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=getPaletCatApp",{'idCategoria': idCategoria})
    .pipe(
      map((e)=> {      
        return e
      }));
  }

  getUbicaciones():Observable<any>{
    return this.http.get(this.url +"ubicaciones/ubicaciones.php?id=getUbicaciones")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  moreInfo(instruccion:any):Observable<any>{
    return this.http.post(this.url +"sob-peti/sob-peti.php?id=moreInfo", {'instruccion' :instruccion})
    .pipe(
      map((e)=> { 
        return e
      }));
  }



  getPedido():Observable<any>{
    return this.http.get(this.url +"sob-peti/sob-peti.php?id=getSobrante")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getPaletById(instruccion:any):Observable<any>{
    return this.http.post(this.url +"estadistica/estadistica.php?id=getPaletByInstruccion",{'instruccion': instruccion})
    .pipe(
      map((e)=> {    
    
        return e
      }));
  }

  getInstruccionById(instruccion:any):Observable<any>{
    return this.http.post(this.url +"estadistica/estadistica.php?id=getInstruccionById",{'instruccion': instruccion})
    .pipe(
      map((e)=> {    
    
        return e
      }));
  }


  salidaP(instruccion:any):Observable<any>{
    return this.http.post(this.url +"estadistica/estadistica.php?id=salidaPWeb",
    {'instruccion': instruccion  })
    .pipe(
      map((e)=> {  
        return e
      }));
  }


    retirarInstruccionTotal1(idSobrantes:any):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=retirarInstruccionTotal1",{'idSobrantes': idSobrantes})
      .pipe(
        map((e)=> {
          return e
        }));
      }

    reutilizarInstruccion(pedido:any):Observable<any>{
      return this.http.post(this.url +"sob-peti/sob-peti.php?id=reutilizarInstruccion",pedido)
      .pipe(
        map((e)=> { 
          return e
        }));
    }
    reutilizarInstruccionSobrantes(cantidad:any ,nuevaInstruccion:any,idUbicacion:any ,usuarioS:any,instruccion:any,idPalet:any, idSobrantes:any,idComanda:any):Observable<any>{
      return this.http.post(this.url +"sob-peti/sob-peti.php?id=reutilizarInstruccion",
      {'cantidad':cantidad ,'nuevaInstruccion' : nuevaInstruccion,'idUbicacion':idUbicacion ,'usuarioS':usuarioS,'instruccion':instruccion,'idPalet':idPalet, 'idSobrantes':idSobrantes, 'idComanda' : idComanda})
      .pipe(
        map((e)=> { 
          return e
        }));
    }

              
    retirarInstruccionTotal(instruccion:any):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=retirarInstruccionTotal",{'instruccion': instruccion})
      .pipe(
        map((e)=> {
          return e
        }));
      }


      getSobranteCompletadas():Observable<any>{
        return this.http.get(this.url +"sob-peti/sob-peti.php?id=getSobranteCompletada")
        .pipe(
          map((e)=> {
            return e
          }));
      }
    
      getSobrantePendiente():Observable<any>{
        return this.http.get(this.url +"sob-peti/sob-peti.php?id=getSobrantePendiente")
        .pipe(
          map((e)=> {
            return e
          }));
      }
      getPedidoSo():Observable<any>{
        return this.http.get(this.url +"sob-peti/sob-peti.php?id=getSobrante")
        .pipe(
          map((e)=> {
            return e
          }));
      }

      buscarPaletIn(data:any):Observable<any>{
        return this.http.post(this.url +"palet/palet.php?id=buscarPaletInSob", data)
        .pipe(
          map((e)=> { 
            return e;
          }));
      }
}