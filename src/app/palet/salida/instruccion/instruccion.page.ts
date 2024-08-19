import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../../Services/material/material.service';
import * as _ from 'lodash';

import { ToastService } from 'src/app/Services/toast.service';
import { Pedido } from '../pedidos';
import { NgForm } from '@angular/forms';
import { PedidoService } from 'src/app/Services/pedido/pedido.service';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';




@Component({
  selector: 'app-instruccion',
  templateUrl: './instruccion.page.html',
  styleUrls: ['./instruccion.page.scss'],
})
export class InstruccionPage implements OnInit {
  pilas:boolean=false;
 usuario:any='almacen'
  constructor(
   private _instruccion:MaterialService,
   private alerta : ToastService,
   private _ped: PedidoService,
   private ruta:Router,
   public plt:Platform,
  ) {
    this.ionViewDidEnter();

  }

  error!:boolean;
  inicio!:boolean;
  ionViewDidEnter(){
    let ms:string = 'Cargando...'
    this.alerta.cargando(ms)
     this.inicio = true;
     setTimeout(()=>{
       this.inicio=false;
       this.palet1 = false;
       this.tabla = false;
     },500)
  }
  ngOnInit() {
  }


    largo:any;
    movil:boolean=false;

  public filterQuery = "";
  ionViewWillEnter(){
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
    this.getInstruccion();
  
    this.getUbicaciones();
  }

  toggle2:boolean=false;
  dataToggle2(){
    this.toggle2 =true;
  
  }
 
 
  instruccion:any;
  palet:any=[];
  paletInst:any=[];
  tabla:boolean=false;
  idPalet!:number;
  tabla1!:boolean;
  tipo!:string;
  ancho:any;
  disponible:number=0;
  entrada:number=0;
  salida:number=0;
  toggle:boolean = false;
  nada:boolean = false;
   selectTropa(value:any){
    this.instruccion = value.instruccion;
    this.toggle2 =false;
    this.toggle=true;
    this._instruccion.getPaletById(this.instruccion)
    .subscribe(res=>{
      if (res == 'nada') {
        this.nada = true;
        return;
       }      
      this.tabla1 = true;
      this.palet = res; 
      this._instruccion.salidaP(this.instruccion)
      .subscribe(resp=>{
     
        this.paletInst = resp;
        
        if (resp == 'error') {
          this.salida = 0;
        } else {
          
          for (let i = 0; i < this.paletInst.length; i++) {
            this.salida =  parseInt(this.paletInst[i].cantidadSalida) + this.salida;
          }
        }
        for (let i = 0; i < this.palet.length; i++) {
         this.entrada =  this.entrada +  parseInt(this.palet[i].cantidadE);  
        }
        this.disponible = this.entrada - this.salida;
        
      })
      
      if (this.palet) {
        setTimeout(()=>{
          // this.tabla1 = false;
          this.tabla = true;
          this.palet1=true;
        },1500)
       for (let i = 0; i < this.palet.length; i++) {
       this.idPalet = this.palet[i].idPalet;
       this.tipo = this.palet[0].nombreCategoria;
       this.ancho = this.palet[0].ancho;
       this.largo = this.palet[0].largo;
           
       }
     }
     // this.instruccion = "";
      
    })
   
  }
  
 
 data:any=[];
 getInstruccion(){
   this._instruccion.getInstruccion()
   .subscribe(res=>{
     this.data = res;
    //  console.log(this.data);
     
   })
 }

 sumaStock:any;
 porPila:boolean=false;
 cantidadPalet:any;
 id:any;
 errorCantidad:boolean = false;
 pilaPalet(pedidoTemp:any){
  setInterval(()=>{
    if(pedidoTemp.value.pila){
      this.porPila=true;
      this.sumaStock = pedidoTemp.value.stockReal;
      this.sumaStock = this.sumaStock * 25 ;
      this.cantidadPalet = this.sumaStock;
    }else{
      this.sumaStock = pedidoTemp.value.stockReal;
      this.porPila=false;
    }
    this.cantidadPalet = this.sumaStock;
    this.id =pedidoTemp.value.idPalet;
    if ( this.sumaStock <= this.disponible) {
      this.errorCantidad = false; 
      
    } else {
      this.errorCantidad = true;
    } 
  },80)
}
//  pilaPalet(pedidoTemp){
   
//    setInterval(()=>{

//      if(pedidoTemp.value.pila){
//        this.porPila=true;
//        this.sumaStock = pedidoTemp.value.stockReal;
//        this.sumaStock = this.sumaStock * 25 ;
//        this.cantidadPalet = this.sumaStock;
//      }else{

//        this.sumaStock = pedidoTemp.value.stockReal;
//        this.porPila=false;
//      }
//      this.cantidadPalet = this.sumaStock;
//      this.id =pedidoTemp.value.idPalet;
//      this._ped.comprobarStock(this.cantidadPalet , this.id)
//      .subscribe(res=>{
//        if (res == 'si') {
//          this.errorCantidad = false;
//        } else {
//          this.errorCantidad = true;
//        } 
//      })
//    },800)
   
   
//  }

 datas:any=[];
  getUbicaciones(){
    this._ped.getUbicaciones()
    .subscribe(data=>{
      this.datas = data;   
    })
  }

 
 pedido:any = new Pedido
 exito:boolean = false;
 palet1:boolean=false;
 addPedidosTemp(pedidoTemp:NgForm){ 
   this.pedido = pedidoTemp.value;
   if (this.sumaStock == this.disponible) {
    this._ped.retirarInstruccionTotal(this.instruccion)
    .subscribe(()=>{
    })
  }
   this._ped.salidaPalet(this.pedido)
   .subscribe(data=>{
    if (data == 'success') {
      const ms = 'Guardando cambios..';
      this.alerta.presentLoadimensajeng(ms);
      this.exito = true;
     this.tabla =false;
     this.palet1=false;
     this.instruccion = "";
    //  this.ruta.navigate(['palet']);
    SplashScreen.show();
    location.reload();
    }
   })

   
 }

 nConsulta(){
  SplashScreen.show();
  location.reload();
 }

 doRefresh(event:any) {
   this.toggle2 = false;
  this.exito = false;
  this.tabla=false;
  this.palet1 = false;
  this.instruccion = "";
  setTimeout(() => {
    event.target.complete();
  }, 2000);
}
      
    }
