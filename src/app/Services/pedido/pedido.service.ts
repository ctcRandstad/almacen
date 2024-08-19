import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
// import { Pedido } from 'src/app/component/pedidos/pedido';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor( private http:HttpClient) { }
  url = environment.url;

  getPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getTotalesPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getTotalesPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getNroPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getNroPedido")
    .pipe(
      map((e)=> {        
        return e
      }));
  }

  getTotalPedido():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getTotalPedido")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  delete(idPedidoTemp:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=eliminar",{'idPedidoTemp': idPedidoTemp})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  confirmaPedidos(confirmarPed:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=confirmaPedido",confirmarPed)
    .pipe(
      map((e)=> {        
        return e
      }));
  }

  addPedidoN(cantidad:any ,idPalet:any ):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=addPedidoN",
    {'cantidad':cantidad , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  modificarCant(cantidad:any ,idPalet:any ):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=modificarCant",
    {'cantidad':cantidad , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  modificarObs(observaciones:any ,idPalet:any ):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=modificarObs",
    {'observaciones':observaciones , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  modificarIns(instruccion:any ,idPalet:any ):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=modificarIns",
    {'instruccion':instruccion , 'idPalet': idPalet })
    .pipe(
      map((e)=> {
        return e
      }));
  }

  comprobarCat(nombreCategoria:any,idMaterial:any):Observable<any>{
    return this.http.post(this.url +"categoria/categoria.php?id=comprobar",
    {'nombreCategoria': nombreCategoria , 'idMaterial' : idMaterial})
    .pipe(
      map((e)=> {
        return e
      }));
  }

  // addPedidoTemp(pedido:Pedido){
  //   return this.http.post(this.url +"pedido/pedido.php?id=addPedido", pedido)
  //   .pipe(
  //     map((e)=> {
  //       return e
  //     }));
    
  // }

  // pedidos realizados.

  getPedidoRealizados():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getPedidoRealizadosApp")
    .pipe(
      map((e)=> {
        return e
      }));
  }


  getPedidoRealizados1():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getPedidoRealizados1")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  getPedidoFiltros(tipo:any, cargado:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=getPedidoFiltros" , {'tipo' : tipo , 'cargado' : cargado} )
    .pipe(
      map((e)=> {
      return e
      }));
  }


  
  getPedidoRealizadosU():Observable<any>{
    return this.http.get(this.url +"pedido/pedido.php?id=getPedidoRealizadosU")
    .pipe(
      map((e)=> {
        return e
      }));
  }

  

    getPediRealizadoById(idPedido:any):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=getPById",{'idPedido': idPedido})
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
      
      
      getTotalesPedidoRealizados(idPedido:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=getTotalesPedidoRealizado", { 'idPedido' : idPedido} )
        .pipe(
          map((e)=> {
            return e
          }));
        }
        
        getTotalPedidoRealizado(idPedido:any):Observable<any>{
          return this.http.post(this.url +"pedido/pedido.php?id=getTotalPedidoRealizado", {'idPedido' : idPedido})
          .pipe(
            map((e)=> {
              return e
            }));
          }

          // totalEuros(idPedido):Observable<any>{
          //   return this.http.post(this.url +"pedido/pedido.php?id=totalEuros", {'idPedido' : idPedido})
          //   .pipe(
          //     map((e)=> {
          //       return e
          //     }));
          //   }
          
          eliminarPedido():Observable<any>{
            return this.http.get(this.url +"pedido/pedido.php?id=eliminarPedido")
            .pipe(
              map((e)=> {
                return e
              }));
            }
            
            //garolera
               
            getPedidoRealizadosGa():Observable<any>{
              return this.http.get(this.url +"pedido/pedido.php?id=getPedidoRealizadosGa")
              .pipe(
                map((e)=> {
                  return e
                }));
            }
          
            getPediRealizadoByIdGa(idPedido:any):Observable<any>{
              return this.http.post(this.url +"pedido/pedido.php?id=getPByIdGa",{'idPedido': idPedido})
              .pipe(
                map((e)=> {
                  return e
                }));
              }

              eliminarPalet(idDetalle:any,comentarios:any):Observable<any>{
                return this.http.post(this.url +"pedido/pedido.php?id=eliPalet",{'idDetalle': idDetalle , 'comentarios':comentarios})
                .pipe(
                  map((e)=> {               
                    return e
                  }));
              }

              editarPedido(idPedido:any):Observable<any>{
                return this.http.post(this.url +"pedido/pedido.php?id=ediPalet",{'idPedido': idPedido})
                .pipe(
                  map((e)=> {   
                    return e
                  }));
              }

              confirmarPedidoG(pedido:any):Observable<any>{
                return this.http.post(this.url +"pedido/pedido.php?id=confirmarPedido", pedido)
                .pipe(
                  map((e)=> { 
                    return e
                  }));
              }

                
                modifiPrecio(precio:any, idDetalle:any):Observable<any>{
                  return this.http.post(this.url +"pedido/pedido.php?id=ediPrecio",{'precio': precio , 'idDetalle' :idDetalle})
                  .pipe(
                    map((e)=> {   
                    return e
                  }));
              }
          
  // addPedidoG(pedido:Pedido){
  //   return this.http.post(this.url +"pedido/pedido.php?id=addPedidoG", pedido)
  //   .pipe(
  //     map((e)=> {     
  //   return e
  //     }));
    
  // }

  addTratamineto(idDetalle:any , tratamiento:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=addTratamiento",{'idDetalle' :idDetalle , 'tratamiento' : tratamiento})
    .pipe(
      map((e)=> {     
      
        return e
      }));
    }
      
    addAgente(idPedido:any , agente:any):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=addAgente",{'idPedido' :idPedido , 'agente' : agente})
      .pipe(
        map((e)=> {  
            
         return e
        }));
      }

      addIdAlbaran(idPedido:any , idAlbaran:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=addIdAlbaran",{'idPedido' :idPedido , 'idAlbaran' : idAlbaran})
        .pipe(
          map((e)=> {        
           return e
          }));
        }
  
      getAgente(idPedido:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=getAgente", {'idPedido' :idPedido })
        .pipe(
          map((e)=> {     
            return e
          }));
      }

      getAlabara(idPedido:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=getAlbaran", {'idPedido' :idPedido })
        .pipe(
          map((e)=> {     
            return e
          }));
      }
      getTratamiento(idPedido:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=getTratamiento", {'idPedido' :idPedido })
        .pipe(
          map((e)=> {     
            return e
          }));
      }

      cambiarFecha(idPedido:any , paraFecha:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=cambiarFecha",{'idPedido' :idPedido , 'paraFecha': paraFecha})
        .pipe(
          map((e)=> {         
            return e
          }));
      }
        
      getIdentificadorInstruccion():Observable<any>{
        return this.http.get(this.url +"pedido/pedido.php?id=getIdentificadorInstruccio")
        .pipe(
          map((e)=> {
            return e
          }));
      }  
      
      
      addEliminadosGa(idDetalle:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=addEliminadosG",{'idDetalle': idDetalle})
        .pipe(
          map((e)=> {      
            return e
          }));
        }

//  Pedidos para aka app

modifiCantApp(cantidad:any, idDetalle:any):Observable<any>{
  return this.http.post(this.url +"pedido/pedido.php?id=ediCantApp",{'cantidad': cantidad , 'idDetalle' :idDetalle})
  .pipe(
    map((e)=> {      
      return e
    }));
  }

  validarEntrada(idDetalle:any, cantidad:any , cantidadM:any , cantidadE:any  , idPalet:any , idPedido:any , comentario:any , instruccion:any):Observable<any>{
    return this.http.post(this.url +"pedido/pedido.php?id=validarEntrada",
    {'idDetalle' :idDetalle , 'cantidad' : cantidad , 'cantidadM' : cantidadM, 'cantidadE':cantidadE , 'idPalet' : idPalet , 'idPedido': idPedido, 'comentario': comentario , 'instruccion': instruccion})
    .pipe(
      map((e)=> {              
   return e
      }));
    }

    eliminarEntrada(idDetalle:any , cantidadM:any , idPalet:any , idPedido:any):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=eliminarEntrada",
      {'idDetalle' :idDetalle , 'cantidadM' : cantidadM ,  'idPalet' : idPalet , 'idPedido': idPedido})
      .pipe(
        map((e)=> {     
          return e
        }));
      }
      
      
      getValidadosById(idPedido:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=getValidadosByIdApp",{'idPedido': idPedido})
        .pipe(
          map((e)=> {
          return e
        }));
    }

    confirmarAlbaranApp(idPedido:any):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=confirmarAlbaranApp",{'idPedido': idPedido})
      .pipe(
        map((e)=> {
          return e
        }));
      }
      
      
      quitarEliminado(idDetalle:any  , idPalet:any , idPedido:any , cantidad:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=quitarEliminadoApp",
        {'idDetalle' :idDetalle ,'idPalet' : idPalet , 'idPedido': idPedido , 'cantidad':cantidad})
        .pipe(
          map((e)=> {    
            return e
          }));
        }
        
        getPedidoDescargadoApp():Observable<any>{
          return this.http.get(this.url +"pedido/pedido.php?id=getPedidoDescargadoApp")
          .pipe(
            map((e)=> {
            
              
          return e
        }));
    }

    buscarF(fechaInicial:any  , fechaFinal:any ):Observable<any>{
      return this.http.post(this.url +"pedido/pedido.php?id=buscarFApp",
      {'fechaInicial' :fechaInicial ,'fechaFinal' : fechaFinal })
      .pipe(
        map((e)=> {    
          return e
        }));
      }

      cambiarComent(comentario:any  , idPalet:any , idPedido:any):Observable<any>{
        return this.http.post(this.url +"pedido/pedido.php?id=cambiarComentApp",
        {'comentario' :comentario ,'idPalet' : idPalet , 'idPedido': idPedido})
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

        // salida de palet

        salidaPalet(salida:any){
          return this.http.post(this.url +"pedido/pedido.php?id=salidaApp", salida)
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
          
          comprobarStock(cantidadPalet:any  , id:any ):Observable<any>{
            return this.http.post(this.url +"pedido/pedido.php?id=comprobarStockApp",
            {'cantidadPalet' :cantidadPalet ,'id' : id })
            .pipe(
              map((e)=> {    
       
              return e
            }));
          }

          stock( id :any):Observable<any>{
            return this.http.post(this.url +"pedido/pedido.php?id=stockApp",
            {'id' : id })
            .pipe(
              map((e)=> {    
              return e
            }));
          }

          comprobarInstruccionByPAlet( idPalet :any):Observable<any>{
            return this.http.post(this.url +"palet/palet.php?id=comprobarInstruccionByPAlet",
            {'idPalet' : idPalet })
            .pipe(
              map((e)=> {   
              return e
            }));
          }

          buscarPalet( ancho:any , largo:any):Observable<any>{
            return this.http.post(this.url +"palet/palet.php?id=buscarPalet",
            {'ancho' : ancho, 'largo':largo })
            .pipe(
              map((e)=> {    
              return e
            }));
          }
          buscarPaletDevolver( idPalet:any ):Observable<any>{
            return this.http.post(this.url +"palet/palet.php?id=buscarPaletDevolver",
            {'idPalet' : idPalet })
            .pipe(
              map((e)=> {   
              return e
            }));
          }
          buscarPaletDevolver1( idPalet:any ):Observable<any>{
            return this.http.post(this.url +"palet/palet.php?id=buscarPaletDevolver1",
            {'idPalet' : idPalet })
            .pipe(
              map((e)=> {   
              return e
            }));
          }
          
      devolverPalet(pedido:any):Observable<any>{
        return this.http.post(this.url +"palet/palet.php?id=devolverPalet",pedido)
        .pipe(
          map((e)=> {  
            return e
          }));
      }

      // devolver por instrucción


      getInstruccionDevolver():Observable<any>{
        return this.http.get(this.url +"estadistica/estadistica.php?id=getInstruccionDevolver")
        .pipe(
          map((e)=> {
            return e
          }));
      }
    
      devolverPaletInstruccion(pedido:any):Observable<any>{
        return this.http.post(this.url +"palet/palet.php?id=devolverPaletInstruccion",pedido)
        .pipe(
          map((e)=> { 
            return e
          }));
      }


      getSobrante(pedido:any):Observable<any>{
        return this.http.post(this.url +"estadistica/estadistica.php?id=getSobranteApp",pedido)
        .pipe(
          map((e)=> {    
            return e
          }));
      }

      getPaletByIdDevolver(instruccion:any):Observable<any>{
        return this.http.post(this.url +"estadistica/estadistica.php?id=getPaletByIdDevolver",{'instruccion': instruccion})
        .pipe(
          map((e)=> {    
        
            return e
          }));
      }

  }
          