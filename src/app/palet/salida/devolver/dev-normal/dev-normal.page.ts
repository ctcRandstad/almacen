import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { PedidoService } from 'src/app/Services/pedido/pedido.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Pedido } from '../../pedidos';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-dev-normal',
  templateUrl: './dev-normal.page.html',
  styleUrls: ['./dev-normal.page.scss'],
})
export class DevNormalPage implements OnInit {

  constructor(
    private _ped:PedidoService,
    public plt:Platform,
    private alerta : ToastService,
  
  ) {
    this.ionViewDidEnter();
    }

    reset(){
      SplashScreen.show();
      location.reload();
    }

   sobrante(devInstr:any){
   this.pedido = devInstr.value;
    this._ped.getSobrante(this.pedido)
    .subscribe(res=>{
     console.log(res);
     
      if(res == 'success'){
        this.reset();
      }  
    })  
   }

 
    inicio!:boolean;
    ionViewDidEnter(){
      this.getInstruccion();
      let ms:string = 'Cargando...'
      this.alerta.cargando(ms)
       this.inicio = true;
       setTimeout(()=>{
         this.inicio=false;
         this.categoriaP = false;
         this.palet = false;
         this.palet1 = false;
       },500)
    }

  ngOnInit() {
  }

  movil:boolean=false;
  usuarioD:string ='almacen';
  ionViewWillEnter(){

    
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
  } 
  



  catPalet:any=[];
  ancho:any;
  largo:any;
  categoriaP:boolean=false;
  error1:boolean=false;
  idPalet!:number;
  palet1!:boolean
  buscarPalet(buscar:any){
    this.ancho=  buscar.value.ancho;
     this.largo = buscar.value.largo;
      this._ped.buscarPalet(this.ancho, this.largo)
      .subscribe(resp=>{
 
        if (resp == 'error') {
          this.error1= true;
          this.categoriaP= false;
        }else{
          this.catPalet = resp;  
          
          if (this.catPalet.length == 1) {
            this.palet1 = true; 
            this.idPalet = this.catPalet[0].idPalet;
           this.seleccionarCat(this.idPalet,this.cate,0)
          }
          this.categoriaP=true;
          this.error1= false; 
        }
      })
     
    }

    refresh(){
      location.reload();
    }

    ir(){
      this.nosepuede = false;
      this.categoriaP = false;
      // this.ruta.navigate(['salida/normal/instruccion']);
    }
  

  pedido:any = new Pedido;
  exito:boolean = false;
  boton:boolean = false;
  addDevolucion(pedidoTemp:any){
   this.boton=true;
    
    if(this.errorCantidad){
      alert('ERROR EN LA CANTIDAD!');
      this.boton=false;
    }else{

      const suscribir = this._ped.devolverPalet(pedidoTemp.value)
      .subscribe(resp=>{
     console.log(resp);
     
        if (resp.status == 'success') {
          this.categoriaP = false;
          // frame.show();
           this.exito = true;
           this.palet1=false;
           const ms = 'Guardando cambios..';
           this.alerta.presentLoadimensajeng(ms);
           setTimeout(()=>{
            // frame.hide();
             this.exito = false;
            location.reload();
            
          },2000)
        } else {
          this.alerta.presentToast('Error, inténtelo más tarde')
        }
        
      })
      setTimeout(() => {
         suscribir.unsubscribe();
        //  this.boton=false;
         }, 2000);
    }
    this.pedido = pedidoTemp.value;
    
  }

  
  totalRetiro!:number;
  totalDevolucion!:number;
  totalDiff:number=0;
  totalDiff1!:number;
  palet:boolean=false;
  nosepuede!:boolean;
  cate!:string;
  idC!:number;
   seleccionarCat(idPalet:any, nombreCategoria:any,idCategoria:any){
    this.idPalet = idPalet;
    this.idC = idCategoria;
    this.cate = nombreCategoria;
   this._ped.buscarPaletDevolver(idPalet)
   .subscribe(resp=>{
    
     this.totalRetiro = resp.total;
     this._ped.buscarPaletDevolver1(idPalet)
     .subscribe(da=>{
       
    this.totalDevolucion = da.totalD;
     this.totalDiff = this.totalRetiro - this.totalDevolucion;
    })
    
    this.totalDiff1 =  this.totalDiff;
    this.palet1=true;
  })
    this.palet=true;
  }


  cantidad!:number;
  errorCantidad!:boolean;
  pilaPalet(cantidad:any){
    this.cantidad = cantidad.value;

    if (this.cantidad > 100) {
      this.errorCantidad = true;
    }else if( this.cantidad < 1){
      this.errorCantidad = true;
    }else {
      this.errorCantidad = false;      
    }
    
  }

  // devolver por instrucción

  public filterQuery = "";
   

  toggle2:boolean=false;
  dataToggle2(){
    this.toggle2 =true;
  
  }


  instruccion:any;
  paletInst:any=[];
  tabla:boolean=false;
  tabla1!:boolean;
  tipo!:string;

  disponible:number=0;
  entrada:number=0;
  salida:number=0;
  toggle:boolean = false;
  idSalidaPalet:any;
  selectTropa(value:any){
   
   this.instruccion = value.instruccion;
   this.salida = value.cantidadSalida;
   this.tipo = value.tipo;
   this.ancho = value.ancho;
   this.largo = value.largo;
   this.idPalet= value.idPalet;
   this.idSalidaPalet =value.idSalidaPalet
   this.toggle2 =false;
   this.toggle=true;
 }
  data:any=[];
  getInstruccion(){
    this._ped.getInstruccionDevolver()
    .subscribe(res=>{
      this.data = res;
    })
  }
 

  
 errorCant!:boolean;
 comprobar(devInstr:any){
   this.cantidad =devInstr.value.cantidadDevuelta;
    
  //  if (this.cantidad <= 0) {
  //    return alert ('La cantidad deve ser mayor a cero');
  //  }
    if (this.cantidad > this.salida) {
      this.errorCant = true;
    } else {
      this.errorCant = false
    }
    
  }

  
  addDevolver(devInstr:any ){
    
    this.pedido =devInstr.value
    console.log(this.pedido);
    this._ped.devolverPaletInstruccion(devInstr.value)
    .subscribe(resp=>{
   if (resp == 'success') {
   this.reset();
   }
    })
    
  }

  
  doRefresh(event:any) {
    setTimeout(() => {
      // this.splashScreen.show();
      location.reload();
      event.target.complete();
    }, 2000);
  }

}
