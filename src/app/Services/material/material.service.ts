import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor( private http:HttpClient) { }
  url = environment.url;

  getMaterial():Observable<any>{
    return this.http.get(this.url +"material/material.php?id=getMateriales")
    .pipe(
      map((e)=> {
        return e
      }));
  }
  getMaterialA():Observable<any>{
    return this.http.get(this.url +"material/material.php?id=getMaterialesAl")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getHuecosLibres():Observable<any>{
    return this.http.get(this.url +"material/material.php?id=getHuecosLibres")
    .pipe(
      map((e)=> {
        return e
      }));
  }
  buscarPaletIn(data:any):Observable<any>{
    return this.http.post(this.url +"palet/palet.php?id=buscarPaletIn", data)
    .pipe(
      map((e)=> { 
        return e;
      }));
  }
  
  getMateterialId(idMaterial:number):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=getMateterialId",{'idMaterial': idMaterial})
    .pipe(
      map((e)=> {      
        return e;
      }));
  }

  instruccionBuscar(instruccion:any):Observable<any>{
    return this.http.post(this.url +"estadistica/estadistica.php?id=instruccionBuscar",{'instruccion': instruccion})
    .pipe(
      map((e)=> {
        return e
      }));
    }


  getUbicacionesMateriales(idMaterial:number):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=getUbicacionesMateriales",{'idMaterial': idMaterial})
    .pipe(
      map((e)=> {      
        return e;
      }));
  }


  getUbicacionesMaterialesId(idMaterial:any,idEstanteria:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=getUbicacionesMaterialesId",{'idMaterial': idMaterial,'idEstanteria':idEstanteria})
    .pipe(
      map((e)=> {      
        return e;
      }));
  }

  getMaterialesIdUbicaciones(idMaterial:any,idEstanteria:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=getMaterialesIdUbicaciones",{'idMaterial': idMaterial,'idEstanteria':idEstanteria})
    .pipe(
      map((e)=> {      
        return e;
      }));
  }

  materialesMover(codigoSap:any,fifo:any, idEstanteria:any , idMaterial:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=materialesMover",{'codigoSap': codigoSap,'fifo':fifo ,'idEstanteria':idEstanteria , 'idMaterial':idMaterial})
    .pipe(
      map((e)=> {      
        return e;
      }));
  }

  materialesMoverAsi(codigoSap:any,fifo:any , idEstanteria:any , idMaterial:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=materialesMoverAsi",{'codigoSap': codigoSap,'fifo':fifo ,'idEstanteria':idEstanteria , 'idMaterial':idMaterial})
    .pipe(
      map((e)=> {      
        return e;
      }));
  }


  countEstanteriasDisponible(idEstanteria:any,idMaterial:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=countEstanteriasDisponible",{'idEstanteria': idEstanteria,'idMaterial':idMaterial})
    .pipe(
      map((e)=> {
     
        return e
      }));
    }

    materialMaquina(codigoSap:any):Observable<any>{
      return this.http.post(this.url +"material/material.php?id=materialMaquina",{'codigoSap': codigoSap})
      .pipe(
        map((e)=> {      
          return e
        }));
    }

    
    materialEstanterias(codigoSap:any,idMaterial:any,idEstanteria:any):Observable<any>{
      return this.http.post(this.url +"material/material.php?id=materialEstanterias",{'codigoSap': codigoSap,'idMaterial':idMaterial,'idEstanteria':idEstanteria})
      .pipe(
        map((e)=> {      
          return e
        }));
    }


  

  delete(idMaterial:number):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=eliminar",{'idMaterial': idMaterial})
    .pipe(
      map((e)=> {      
        return e
      }));
  }

  editarMat(nombreMaterial:any  ,codigo:any , idMaterial:any,idProveedor:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=editar",
    {'nombreMaterial':nombreMaterial , 'codigo':codigo , 'idMaterial': idMaterial , 'idProveedor' : idProveedor})
    .pipe(
      map((e)=> {    
        return e
      }));
  }

  comprobarMat(nombreMaterial:any, codigo:any,idProveedor:any):Observable<any>{
    return this.http.post(this.url +"material/material.php?id=comprobar",
    {'nombreMaterial': nombreMaterial, 'codigo':codigo , 'idProveedor' : idProveedor})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getInstruccion():Observable<any>{
    return this.http.get(this.url +"estadistica/estadistica.php?id=getInstruccionRetirar")
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

  salidaP(instruccion:any):Observable<any>{
    return this.http.post(this.url +"estadistica/estadistica.php?id=salidaPWeb",
    {'instruccion': instruccion  })
    .pipe(
      map((e)=> {  
        return e
      }));
  }

  buscarInstruccion(instruccion:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=instruccion",{'instruccion': instruccion})
    .pipe(
      map((e)=> {
        return e
      }));
    }

    

    movimientoM(asignadaOrigen:any,codigoSap:any,idMaterial:any,idPaletEtiqueta:any,estanteriaDestino:any,estanteriaOrigen:any):Observable<any>{
      return this.http.post(this.url +"material/material.php?id=movimientoM",
      {'asignadaOrigen':asignadaOrigen , 'codigoSap':codigoSap , 'idMaterial': idMaterial , 
      'idPaletEtiqueta' : idPaletEtiqueta, 'estanteriaDestino':estanteriaDestino , 'estanteriaOrigen':estanteriaOrigen})
      .pipe(
        map((e)=> {    
          return e
        }));
    }

    movimientoMAsignada(asignadaOrigen:any,codigoSap:any,idMaterial:any,idPaletEtiqueta:any,estanteriaDestino:any,estanteriaOrigen:any):Observable<any>{
      return this.http.post(this.url +"material/material.php?id=movimientoMAsignada",
      {'asignadaOrigen':asignadaOrigen , 'codigoSap':codigoSap , 'idMaterial': idMaterial , 
      'idPaletEtiqueta' : idPaletEtiqueta, 'estanteriaDestino':estanteriaDestino , 'estanteriaOrigen':estanteriaOrigen})
      .pipe(
        map((e)=> {    
          return e
        }));
    }

   


}
