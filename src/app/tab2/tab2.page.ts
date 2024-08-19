import { Component } from '@angular/core';
import { PedidoService } from '../Services/pedido/pedido.service';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  constructor(
    private _ped:PedidoService,
    private ruta:Router,
    private toast:ToastService,
    public alertController: AlertController,
    public plt:Platform,
  ) {}
  

  ngOnInit(){
  }
  
  largo:any;
  movil:boolean=false;
  ionViewWillEnter(){
    this.mostrarForm=false;
    this.getPedidosRealizados();
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
  } 
  
  public filterQuery = "";
  data:any=[];
  getPedidosRealizados(){
  
      this._ped.getPedidoDescargadoApp().subscribe(res=>{
        if (res != 'error') {
          
          let m:string = 'Cargando los pedidos'
          this.toast.presentLoadimensajeng(m);
          this.data=res;
        }else{
       return  alert('no hay datos para mostrar');
        }
        })

}

doRefresh(event:any) {
 
  setTimeout(() => {
    this.mostrarForm=false;
    this.getPedidosRealizados();
    event.target.complete();
  }, 2000);
}

mostrarForm:boolean=false;
myChange(event:any) {
  if (event.detail.checked) {
    this.mostrarForm = true;
  } else {
    this.mostrarForm = false;    
  }

 
}


fechaInicio!:Date;
fechaFinal!:Date;
filtro:boolean = false;
filtarF(filtroFecha:any){
   this.fechaInicio = filtroFecha.value.fechaInicial;
   this.fechaFinal = filtroFecha.value.fechaFinal;
   if (this.fechaInicio > this.fechaFinal) {
     alert('Error!! . La fecha inicial no puede ser mayor que a la fecha final.')
   } else {
    this._ped.buscarF(this.fechaInicio, this.fechaFinal)
    .subscribe(data=>{  
    if (data == 'error') {
      const msj = 'No hay pedidos en las fecha selecionadas.';
      const sub = 'Seleccione otras fechas';
      this.toast.presentAlert(msj , sub);
      setTimeout(()=>{
      this.ionViewWillEnter();
      },2000)
    } else {
      this.data = data;
     this.filtro = true;
    }
      
    })
     
   }
  
}

show!:boolean;
volver(){
//   this.mostrarForm=false;
// // this.verPedidoAlbaran(this.idPedido);
//   this.ve = false;
//   this.alba=false;
//   this.show= false;
//   this.getPedidosRealizados();
}

fechas:any;
albaran:any=[];
alba:boolean=false;
euros:number=0;
verPedidoAlbaran(idPedido:any ){
  
  this.idPedido = idPedido;
  this._ped.getPediRealizadoByIdGa(idPedido)
  .subscribe(res=>{
    this.alba =true;
    this.ve = true;
    this.albaran = res;
    this.fechas= res[0].fechaConfirmado;
     this.idAlbaran = res[0].idAlbaran;
  this.getTotales();
  this.getAgente();
})
// setTimeout(()=>{
//   this.inprimir(impresion, frame);
//   this.alba=false
// },1500)
}


m:boolean=false;
boton:boolean=false;
//  albaranC:AlbaranC;
agente1!:string;
getAgente(){
  this._ped.getAgente(this.idPedido)
  .subscribe(res=>{
  this.agente1 = res.agente;
  if (this.agente1 == null) {
    this.m=false;
  }else{
    this.m=true;
   this.boton = true;
  }

  
  })

}



pRealizado:any= [];
idPedido!:number;
ve:boolean=false;
paraF:any;
fech:any;
idAlbaran:any;
verPedido(idPedido:any){
 
  
 this.idPedido = idPedido;
 this._ped.getPediRealizadoById(idPedido)
 .subscribe(res=>{
   this.ve =true;
   this.pRealizado = res; 
  
   
   for (let i = 0; i < this.pRealizado.length; i++) {
    this.fech = this.pRealizado[0].fecha;
    this.paraF = this.pRealizado[0].paraFecha;
   }
  //  frame.show();
   this.getTotales();
 })
}
hide(){
  this.ve=false;
  
}



cantidadM:any;
canmtidadNueva:number = 0;
idDetalle!:number
modCant(cantidadM:any, idDetalle:any){
  this.show = true;
  this.cantidadM = cantidadM; 
  this.canmtidadNueva = this.cantidadM
  this.idDetalle = idDetalle;
   
}

sumar:number=0;
suma(){
  this.restar = 0;
  let a:any = 1;
  this.sumar = this.sumar + a ;

  this.canmtidadNueva = parseInt( this.cantidadM) +  a ;
  this.cantidadM = this.canmtidadNueva,
 
  this._ped.modifiCantApp(this.cantidadM, this.idDetalle)
  .subscribe(data=>{ 
  })
  
  this.verPedidoAlbaran(this.idPedido)
}

restar:number=0;
resta(){
  this.sumar=0;
  let a:any = 1
  this.restar = this.restar + a ;

  this.canmtidadNueva = this.cantidadM -  a ;
  this.cantidadM = this.canmtidadNueva,
  
  console.log(this.cantidadM);
  this._ped.modifiCantApp(this.cantidadM, this.idDetalle)
  .subscribe(data=>{

    
  })
  this.verPedidoAlbaran(this.idPedido)
}

salirSinEditar(){
  const mensaje:string = "Guardando cambios"
  this.toast.presentLoadimensajeng(mensaje)
  this.show=false;
}


// async validadL(idDetalle , categoria , ancho , largo ,cantidadM ,  cantidadE , idPalet, idPedido){

//     const alert = await this.alertController.create({
//       header: 'Validar linea!',
//       message: '¿Estas <strong>seguro  de validar ' + categoria + ' ' +  ancho  + ' x ' + largo +  ' </strong> ?',
//       buttons: [
//         {
//           text: 'Cancelar',
//           role: 'cancel',
//           cssClass: 'btn-danger',
//           handler: () => {
//             return;
//           }
//         }, {
//           text: 'Validar',
//           cssClass: 'btn-success',
//           handler: () => {
//             // console.log(idDetalle, cantidadM , cantidadE  , idPalet, idPedido);
//           //  acepto los validación
//          this._ped.validarEntrada(idDetalle,0 , cantidadM , cantidadE  , idPalet , idPedido)
//          .subscribe(()=>{
//           this.verPedidoAlbaran(this.idPedido)
//          })
//          }
//         }
//       ]
//     });
  
//     await alert.present();
//   this.idDetalle = idDetalle;


// }

borrado:boolean = false;
async eliminarL(idDetalle:any ,nombreCategoria:any,ancho:any, largo:any, cantidadM:any , idPalet:any ,idPedido:any){
  const alert = await this.alertController.create({
    header: 'Validar linea!',
    message: '¿Estas <strong>seguro  de eliminar ' + nombreCategoria + ' ' +  ancho  + ' x ' + largo +  ' </strong> ?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'btn-success',
        handler: () => {
          return;
        }
      }, {
        text: 'Eliminar',
        cssClass: 'btn-danger',
        handler: () => {
          // console.log(idDetalle, cantidadM , cantidadE  , idPalet, idPedido);
        //  acepto los validación
       this._ped.eliminarEntrada(idDetalle , cantidadM , idPalet , idPedido)
       .subscribe(()=>{
         
        this.verPedidoAlbaran(this.idPedido);
        this.borrado=true;
       })
       }
      }
    ]
  });

  await alert.present();
this.idDetalle = idDetalle;
}

aceptar(idPedido:any){
  
  this._ped.getValidadosById(idPedido)
  .subscribe(res=>{
     
     if (res >= 1 ) {
       alert('Falta confirmar campos..');
     }else{
       const msj = 'Confirmando albarán....'
      this.toast.presentLoadimensajeng(msj);
      this._ped.confirmarAlbaranApp(idPedido)
      .subscribe(res=>{
        if (res == 'success') {
          this.volver();
        }else{
          alert('no se ha podido confirmar');
        }
      })
     }
    
  })
}


recuperar(idDetalle:any,idPalet:any ,idPedido:any,cantidad:any){
this.idPedido =idPedido;

 this._ped.quitarEliminado(idDetalle,idPalet ,idPedido,cantidad)
 .subscribe(resp=>{
   if (resp == 'success') {
     const msj = 'Restableciendo linea....'
     this.toast.presentLoadimensajeng(msj);
     this.verPedidoAlbaran(this.idPedido);
     this.borrado=true;
   } else {
     alert('no se ha podido recuperar la linea..');
   }
 })
}

 
totales:any;
total:number=0;
getTotales(){
  this._ped.getTotalesPedidoRealizados(this.idPedido)
  .subscribe(res=>{
 this.totales = res;

 
 this._ped.getTotalPedidoRealizado(this.idPedido)
 .subscribe(resp=>{
   this.total =resp;
  //  this._ped.totalEuros(this.idPedido)
  //  .subscribe(data=>{
  //    this.euros = data;
  //  })  
   
 })
  })
}

}
