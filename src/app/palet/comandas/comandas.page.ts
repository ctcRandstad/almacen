import { Component, ViewChild } from '@angular/core';
import { PaletService } from 'src/app/Services/palet/palet.service';
import { ToastService } from 'src/app/Services/toast.service';

import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Comanda } from './comanda';
import { SplashScreen } from '@capacitor/splash-screen';



@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage  {


  @ViewChild('estanteria' , {static: false})  sInput:any;
  @ViewChild('palet' , {static: false})  pInput:any;
  @ViewChild('bumaid' , {static: false})  bInput:any;

  
  constructor(
    private _sobpeti: PaletService,
   
    private alerta : ToastService,
    public plt:Platform,
    public alertController: AlertController,
    private ruta:Router,
  
    ) {
    
  }

  async desestimarInstruccion(instruccion:any) {
    const alert = await this.alertController.create({
      header: 'Desestimar! ' + instruccion,
      message: '¿Quiere <strong>ELIMINAR</strong> la comanda?!!!',
      buttons: [
        {
          text: 'No, Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            // console.log('Confirm Okay');
            this.desestimar();
          }
        }
      ]
    });

    await alert.present();
  }
  
  async desestimarPalet(nombreCategoria:any, ancho:any , largo:any) {
    const alert = await this.alertController.create({
      header: 'Desestimar! ' + nombreCategoria + ' ' + ancho + ' x ' + largo,
      message: '¿Quiere <strong>ELIMINAR</strong> la comanda?!!!',
      buttons: [
        {
          text: 'No, Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            // console.log('Confirm Okay');
            this.desestimar1();
          }
        }
      ]
    });

    await alert.present();
  }

  largos!:number;
  movil:boolean=false;
 
  ionViewWillEnter(){
  
   
    setInterval(()=>{
      this.getComandasPalet();
      this.getComandasMaterial();

    },1000)
  }

  data:any=[];
  nadaData:boolean=false;
  getComandasPalet(){
  this._sobpeti.getComandasPalet()
  .subscribe(res=>{
   
    if (res != 'error') {
      this.nadaData = false;
      this.data =res;  
    }else{
      this.nadaData = true;
    }
  })
}


datas:any=[];
nadaDatas:boolean=false;
getComandasMaterial(){
this._sobpeti.getComandasMateriales()
.subscribe(res=>{
  if (res != 'error') {
    this.nadaDatas = false;
    this.datas =res;  
    
  }else{
    this.nadaDatas = true;
  }
})
}






    cantidad!:number;
    idPalet!:any;
    ancho!:number;
    largo!:number;
    idUbicacion!:number;
    usuarioS:any;
    usuario:any='almacen';
    instruccion:any;
    porPila:boolean=false;
    cantidadPalet:any;
    id:any;
    errorCantidad:boolean = false;
    select:boolean=false;
    instruT:boolean=false;
    cero:boolean=false;
    nombreCategoria!:string;
    nombreUbicacion!:string;
    idComanda!:number
    instruccionOriginal!:number;
    instruccionOriginal1!:number;
    idSobrantes!:number;
    sobranteSolo!:boolean;
    detalleSolo!:boolean;
    combinada!:boolean;
    todaInstruccionNueva!:boolean;
    dispoDetalle!:number;
    dispoSobrante!:number;
    can:number=0;
myFunction(item:Comanda){

  
  this.idComanda = item.idComanda;
  this.ancho = item.ancho;
  this.largo = item.largo;
  this.cantidad = item.cantidad;
  this.idPalet = item.idPalet;
  this.idUbicacion = item.idUbicacion;
  this.usuarioS = this.usuario;
  this.instruccion = item.instruccion;
  this.nombreCategoria = item.nombreCategoria;
  this.nombreUbicacion = item.nombreUbicacion;
  this.idPalet = item.idPalet;
  this.cantidadPalet = this.cantidad;
  
  if (this.instruccion == null ) {
    this._sobpeti.comprobarStockNuevo(this.cantidadPalet , this.idPalet)
    .subscribe(res=> {
      if (res == 'cero') {
         this.cero = true;
         return;
      }
      
      if (res < this.cantidadPalet) {
        this.cantidad = res;
        this.errorCantidad = true;
      } else {
        this.errorCantidad = false;
      }
    })
    
  }else{
    //comprobar stock de la instruccion.
    this._sobpeti.comprobarStockNuevoInstrucccion(this.instruccion)
    .subscribe(res=>{
     
      if (res.iStock < this.cantidadPalet) {
        this.can=res.iStock;
         this.cero = true;
        return
      }
    })
  }
  
 this.select = true;
    
}

desestimar1(){
  this._sobpeti.desestimar1(this.idComanda)
  .subscribe(res=>{
   
    
    if (res == 'desestimado') {
      SplashScreen.show();
          location.reload();
    }else{
       alert('No se puede desestimar::')
    }
  })
}

aceptar(){
  // console.log(this.idComanda);

  this.boton = true;
  const suscribir = this._sobpeti.desestimar(this.idComanda)
  .subscribe(res=>{

    if (res == 'desestimado') {
      const suscribir1 =   this._sobpeti.salidaPalet(this.cantidad ,this.idPalet,this.idUbicacion ,this.usuarioS)
      .subscribe(res=>{
        if (res == 'success') {
          // this.desestimar();
          SplashScreen.show();
          location.reload();
        } else {
          alert('no se ha podido quitar los palet.intentelo mas tarde..');
        }
      })
      setTimeout(() => { 
        suscribir1.unsubscribe(); 
       SplashScreen.show();
      }, 6000);
    }else{
      alert('La comanda ya fue retirada..');
      SplashScreen.show();
        location.reload();
    }
  })
  setTimeout(() => { 
         suscribir.unsubscribe();
         location.reload();
  }, 6000);
}

boton:boolean=false;
aceptarI(){

  this.boton = true;

  
  const suscribir =   this._sobpeti.salidaPaletINueva(this.cantidad ,this.instruccion,this.idUbicacion ,this.usuarioS,this.idPalet)
    .subscribe(res=>{
      if (res == 'success') {
        this._sobpeti.comprobarStockNuevoInstrucccion(this.instruccion)
        .subscribe(res=>{
  
    
          if (res.iStock == 0) {
            this._sobpeti.bajaInstru(this.instruccion)
            .subscribe(re=>{ 
             
            if (re == 'success') {
              alert('Instrucción dada de baja');
              this.desestimar();
            } else {
              alert('Error al dar de baja la instrucción, contacta con tu superior');
              this.desestimar();
            }
           });
          }else{
            alert('Instrucción retirada correctamente');

            this.desestimar();
          }
        })
      } else {
        alert('no se ha podido quitar los palet.intentelo mas tarde..');
      }
    })
    setTimeout(() => {
       suscribir.unsubscribe(); 
       SplashScreen.show();
       location.reload();
    }, 6000);
  

}

salir(){
 SplashScreen.show();
  location.reload();
}

desestimar(){
  this._sobpeti.desestimar(this.idComanda)
  .subscribe(res=>{
    if (res== 'desestimado') {
     SplashScreen.show();
        location.reload();
    }else{
      alert('Error en el servidor..');
    }
  })
}

desestimarAhora(idComanda:any){
   this.idComanda = idComanda;
   this.desestimar();
}

atras(){
  this.ruta.navigate(['./main1']);

 this.select = false;
  this.instruT=false;
}






back(){
 SplashScreen.show();
  location.reload();
}




}
