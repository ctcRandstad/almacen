import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, Platform } from '@ionic/angular';

import { MaterialService } from 'src/app/Services/material/material.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VariosService } from 'src/app/Services/varios/varios.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {

  constructor( 
    private rutaActiva: ActivatedRoute,
    private _material:MaterialService,
    private ruta:Router,
    private toast:ToastService,
    public alertController: AlertController,
    public plt:Platform,
    private _varios:VariosService,
 
    ) { }
  idMaterial:any;
  datas:any;
  ngOnInit() {
    this.idMaterial=  this.rutaActiva.snapshot.params['id'];
    this._material.getMateterialId( this.idMaterial)
    .subscribe(data=>{ 
      if (data == 'error') {
        alert('Error en el material.')
      } else {
        this.datas = data[0].nombreMaterial;
        // console.log(this.data);
        
      }
    });
     

  }




  
  fecha:any;
  largo!:number;
  movil:boolean=false;
  ionViewWillEnter(){
    let msj:string = 'Cargando pedidos..';
    this.toast.cargando(msj);
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
    setInterval(()=>{
      this.getPedidosRealizados();
    },1500)
    let f = new Date();
// document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
this.fecha = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();


    
  }

  data:any=[];
  noPedido!:boolean;
  getPedidosRealizados(){
  
    this._varios.getPedidoRealizados(this.idMaterial).subscribe(res=>{ 
    if (res != 'error') {
      this.data=res;
      this.noPedido = false;
    }else{
      this.data=[];
      this.noPedido = true;
    }
      
      })
  }

palet!:number;
cantPaletCajas(idDetalle:any ,palet:any){
  // console.log(palet.value);
  this._varios.modeficaPalet(idDetalle, palet.value, this.idMaterial)
  .subscribe(resp=>{
   if (resp == 'success') {
     this.toast.presentLoadimensajeng('Cambio en la cantidad de bultos,  se imprimirá ' + palet.value + ' etiquetas' )
   } else {
     alert('Error.');
     this.hide();
   }
    
  })
}
  m:boolean=false;
  boton:boolean=false;
  pRealizado:any= [];
  idPedido!:number;
  ve:boolean=false;
  paraF:any;
  fech:any;
  idAlbaran:any;
  razonSocial!:string;
  verPedido(idPedido:any,razonSocial:any){
  this.razonSocial=  razonSocial
   this.idPedido = idPedido;
   this._varios.getPediRealizadoById(idPedido, this.idMaterial)
   .subscribe(res=>{
     this.ve =true;
     this.pRealizado = res; 
    
     for (let i = 0; i < this.pRealizado.length; i++) {
      this.fech = this.pRealizado[0].fechaPedido;
      this.paraF = this.pRealizado[0].fechaEntrega;
     }
    //  frame.show();
     this.getTotales();
   })
  }

  hide(){
    this.ve=false;
    this.getPedidosRealizados();
   
  }


  totales:any=[];
  total:number=0;
  getTotales(){
   this._varios.getTotalPedidoRealizado(this.idPedido , this.idMaterial)
   .subscribe(resp=>{
     this.total =resp;
   })
  
  }

btnTabs!:boolean;
 async validadL(descripcion:any, cantidad:any, cantidadM:any,idPedido:any , codigoSap:any,idDetalle:any,palet:any,idProveedor:any, stockF:any ){
   
  this.btnTabs = true;
     const alert = await this.alertController.create({
       header: 'Validar linea!',
       message: '¿Estas <strong class="text-success">seguro  de validar ' + descripcion + ' '  + codigoSap +  '  </strong> ?',
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           cssClass: 'btn-danger',
           handler: () => {
            this.btnTabs = false;
             return;
           }
         }, {
           text: 'Validar',
           cssClass: 'btn-success',
           handler: () => {
            const msj = 'Validando referencia...'
            this.toast.presentLoadimensajeng(msj);
            
           //  acepto los validación
           let con=     this._varios.validarEntrada(idDetalle,cantidad,  cantidadM, codigoSap, idPedido, palet,this.idMaterial ,idProveedor , stockF)
          .subscribe(re=>{
            // console.log(re);
            if (re == 'success') {
              this.btnTabs = false;
             this.verPedido(idPedido, this.razonSocial);
            }
          })
          }
         }
       ]
     });
    //  this.btnTabs = false;
     await alert.present();
 }

 alertaAlert(con:any){
  alert(con)
 }


   modi:boolean=false; 
 async modificarC(descripcion:any, cantidad:any, cantidadM:any,idPedido:any , codigoSap:any,idDetalle:any){
  // console.log(this.comentario);
    const alert = await this.alertController.create({
      header: 'Modificar linea!',
      message: '¿Estas <strong class="text-danger">seguro  de modificar ' + descripcion + ' '  + codigoSap +  ' </strong> ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-danger',
          handler: () => {
            this.modi = false;
            return;
          }
        }, {
          text: 'Modificar',
          cssClass: 'btn-success',
          handler: () => {
          //  acepto los eliminación
          this.modi = true;
          this.modificarCantidadCajas(idDetalle,cantidad,  cantidadM, codigoSap, idPedido);
        }
      }
    ]
  });
  await alert.present();
}




codigoSap:any;


async modificarCantidadCajas(idDetalle:any,cantidad:any,  cantidadM:any, codigoSap:any, idPedido:any) {
  const alert = await this.alertController.create({
    header: 'Nueva Cantidad!',
    inputs: [
      {
        name: 'cant',
        type: 'number',
        placeholder: 'Cantidad entregada ',
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Aceptar',
        handler: data => {

          if (data.cant < 0) {
            this.alerta();
          } else {
            this._varios.modificarEntrada(idDetalle,data.cant,this.idMaterial)
           .subscribe(res=>{
            this.verPedido(idPedido,this.razonSocial)
           })
            
          }
          
        }
      }
    ]
  });

  await alert.present();
}

volver(){
  // this.verPedidoAlbaran(this.idPedido);
    this.ve = false;
    this.getPedidosRealizados();
  }

  alerta(){
    alert('La cantidad tiene que ser mayor o igual a CERO');
  }



aceptar(idPedido:number){
  this._varios.getValidadosById(idPedido,this.idMaterial)
  .subscribe(res=>{
     if (res >= 1 ) {
       alert('Falta confirmar campos..');
     }else{
       const msj = 'Confirmando albarán....'
      this.toast.presentLoadimensajeng(msj);
      this._varios.confirmarAlbaranApp(idPedido, this.idMaterial)
      .subscribe(res=>{
        if (res == 'success') {
          this.ruta.navigate(['ubicarM' , this.idMaterial]);
        }else{
          alert('no se ha podido confirmar');
        }
      })
     }
  })
  
}


doRefresh(event:any) {

  setTimeout(() => {
    SplashScreen.show();
    location.reload();
    event.target.complete();
  }, 2000);
}


}
