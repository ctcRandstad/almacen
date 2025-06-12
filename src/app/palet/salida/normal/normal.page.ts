import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PaletService } from 'src/app/Services/palet/palet.service';
import { CategoriaService } from 'src/app/Services/categorias/categoria.service';
import { Pedido } from '../pedidos';
import { ToastService } from '../../../Services/toast.service';
import { AlertController, Platform } from '@ionic/angular';
import { PedidoService } from 'src/app/Services/pedido/pedido.service';
import { SplashScreen } from '@capacitor/splash-screen';



@Component({
  selector: 'app-normal',
  templateUrl: './normal.page.html',
  styleUrls: ['./normal.page.scss'],
})
export class NormalPage implements OnInit {


  constructor(
    private _ped: PedidoService,
    private  _cat : CategoriaService,
    private _pal : PaletService,
    private ruta :Router,
    private alerta : ToastService,
    public plt:Platform,
    ) {
     this.ionViewDidEnter();
     }



  ngOnInit() {
  }

pilas:boolean=false;
    inicio!:boolean;
    ionViewDidEnter(){
      let ms:string = 'Cargando...'
      this.alerta.cargando(ms)
       this.inicio = true;
       setTimeout(()=>{
         this.inicio=false;
         this.categoriaP = false;
         this.palet = false;
       },500)
    }

  largo:any;
  movil:boolean=false;
  usuario:any='almacen';
  ionViewWillEnter(){
    this.getCatPalet();
    this.getUbicaciones();
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
    
  } 
  
  catPalet:any=[];
  getCatPalet(){
    this._cat.getCategoria().subscribe(data=>{
      this.catPalet = data;
    })
  }

  palet1:boolean=false;
  stockR!:number;
  mostrarS:boolean = false;
  valorM(idPalet:any){
    this.palet1 = true;
    this.id = idPalet;
    this._ped.stock(this.id).subscribe(res=>{
        if (res  != 'no') {
          this.stockR = res;
          this.mostrarS = true;
        } else {
          this.mostrarS = false;
          alert('Se ha procucido algun error en el servidor.');
        }
    })
    
  }

  si:boolean=false;
  idC!:number;
  seleccionarCat(idPalet:any,idCategoria:any){
    this.idC=idCategoria
    this.cat(idPalet)
   this.si=true;
   }

  ancho:any;
  // largo:number;
  categoriaP:boolean=false;
  error1:boolean=false;
  idPalet!:number;
  conInst:boolean=false;
  buscarPalet(buscar:any){
  this.ancho=  buscar.value.ancho;
   this.largo = buscar.value.largo;
   
   this._ped.buscarPalet(this.ancho, this.largo)
   .subscribe(resp=>{
   
     if (resp == 'error') {
       this.error1= true;
       this.categoriaP= false;
      }else{
        this.idPalet = resp[0].idPalet;
        this.catPalet = resp;
        this._ped.comprobarInstruccionByPAlet(this.idPalet)
        .subscribe(res=>{
        
          if(res[0].instruccion){
            this.conInst=true;
          }else{
            this.conInst=false;
            this.palet1 = true; 
            this.categoriaP=true;
            this.error1= false;
             this.palet1 = true;
             this.si=true;
          }
          
        })
      }

    })
  }
  ir(){
    this.conInst = false;
    this.ruta.navigate(['salida/normal/instruccion']);
  }

  paletById:any=[];
  palet:boolean=false;
  error:boolean=false;
  observaciones:any;
  cat(idPalet:any){
    this._pal.getPaletIdCat(idPalet)
    .subscribe(res=>{
     this.paletById = res;
     this.observaciones =  this.paletById[0].observaciones;
     this.stockR = this.paletById[0].stockReal;
     this.idPalet = this.paletById[0].idPalet;
      if (res == "error") {
        this.error = true;
        this.palet = false;
        return
      }else{
        this.error=false;
      }
     if (this.paletById.length >=1) {
       this.palet = true;
       this.palet1 = true;
      
     } else {
       this.palet = false;
       return
     }
     
    })
   
  }

  catByPalet(idCategoria:any){
    this._pal.getPaletCat(idCategoria)
    .subscribe(res=>{
     this.paletById = res;
     this.observaciones =  this.paletById[0].observaciones;
     this.stockR = this.paletById[0].stockReal;
     this.idPalet = this.paletById[0].idPalet;
      if (res == "error") {
        this.error = true;
        this.palet = false;
        return
      }else{
        this.error=false;
      }
     if (this.paletById.length >=1) {
       this.palet = true;
       this.palet1 = true;
      
     } else {
       this.palet = false;
       return
     }
     
    })
   
  }


  totales:any;
  total:number=0;
  noMostrar:boolean=false;
  getTotales(){
    this._ped.getTotalesPedido()
    .subscribe(res=>{
      if (res != 'error') {
        this.noMostrar=true;
        this.totales = res;
        this._ped.getTotalPedido()
        .subscribe(resp=>{    
          this.total =resp;
        })
      }else{  
       this.noMostrar=false;
      }
       })
      
  }

  data:any=[];
  getUbicaciones(){
    this._ped.getUbicaciones()
    .subscribe(data=>{
      console.log(data);
      
      this.data = data;   
    })
  }

  pedido:any = new Pedido
  exito:boolean = false;
  boton:boolean = false;
  addPedidosTemp(pedidoTemp:NgForm){
    this.boton = true;
    this.pedido = pedidoTemp.value;
   
  const suscribir =  this._ped.salidaPalet(this.pedido)
    .subscribe(data=>{
      console.log(data);
      
     if (data == 'success') {
       const ms = 'Guardando cambios..';
       this.alerta.presentLoadimensajeng(ms);
       this.exito = true;
       this.palet=false;
       this.palet1=false;
       this.si = false;
       this.categoriaP=false;
       SplashScreen.show();
       setTimeout(()=>{
         location.reload();
       },2000);
      // this.ionViewWillEnter();
     }else{
       this.alerta.presentToast('Error, inténtelo más tarde')
     }
    })
   
    setTimeout(() => { 
      suscribir.unsubscribe();
      this.boton = false;
     }, 2000);
    
  }

  
  dataN:any;
  getPaletN(){
    this._pal.getPaletN()
    .subscribe(data=>{
      this.dataN = data;      
      // this.notify();
          
      for (let i = 0; i < this.dataN.length; i++) {
        const real = this.dataN[i].stockReal;
        const minimo = this.dataN[i].stockMinimo;
        // debugger
        if(parseInt(this.dataN[i].stockReal) <=parseInt(this.dataN[i].stockMinimo) ){
          // console.log(this.dataN[i].stockMinimo - this.dataN[i].stockReal + this.dataN[i].idPalet);
          this._ped.addPedidoN(this.dataN[i].stockMinimo - this.dataN[i].stockReal , this.dataN[i].idPalet )
          .subscribe(()=>{
            // this.getPedido();
          })
        }
        
      }
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
      this._ped.comprobarStock(this.cantidadPalet , this.idPalet)
      .subscribe(res=>{
        if (res == 'si') {
        return  this.errorCantidad = false;
        } else {
         return this.errorCantidad = true;
        }
      })
    },800)
    
    
  }


  sumaStockM:any;
  pilaPaletM(pedidoTemp:any){
    setInterval(()=>{
      if(pedidoTemp.value.pila){
        this.porPila=true;
        this.sumaStockM = pedidoTemp.value.cantidad;
        this.sumaStockM = this.sumaStock * 25 ;
        this.cantidadPalet = this.sumaStock;
      }else{
        this.sumaStockM = pedidoTemp.value.cantidad;
        this.porPila=false;
      }
      if (this.sumaStockM <= this.stockR) {
        return  this.errorCantidad = false;
        } else {
         return this.errorCantidad = true;
        }
      },800)
  }

  doRefresh(event:any) {
    setTimeout(() => {
      // this.splashScreen.show();
      location.reload();
      event.target.complete();
    }, 2000);
  }

}
