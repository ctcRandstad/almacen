import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../Services/pedido/pedido.service';
import { Pedido } from '../pedidos';
import { Platform } from '@ionic/angular';
import { ToastService } from '../../../Services/toast.service';


@Component({
  selector: 'app-devolver',
  templateUrl: './devolver.page.html',
  styleUrls: ['./devolver.page.scss'],
})
export class DevolverPage implements OnInit {

  constructor(
    private _ped:PedidoService,
    public plt:Platform,
    private alerta : ToastService,
    
  ) {
    }

    ngOnInit(){
    
    }
    

   
    public filterQuery = "";
    
 
   dataToggle2(ins:any){
     this.selectTropa(ins.value);
    }
   
 
   exito!:boolean;
   instruccion:any;
   palet:any=[];
   paletInst!:any[];
   tabla:boolean=false;
   idPalet!:number;
   tabla1!:boolean;
   tipo!:string;
   nada!:boolean;
   ancho:any;
   largo:any;
   disponible:number=0;
   entrada:number=0;
   salida:number=0;
   toggle:boolean = false;
   idSalidaPalet:any;
   selectTropa(value:any){
     this.instruccion = value;
     this.toggle=true;
     this._ped.getPaletByIdDevolver(this.instruccion)
     .subscribe(res=>{
         if (res == 'nada') {
           this.nada = true;
           return;
         }else{
           this.tabla1 = true;
           this.palet = res; 
           if (this.palet) {
             setTimeout(()=>{
               this.tabla1 = false;
               this.tabla = true;
               
             },1500)
            for (let i = 0; i < this.palet.length; i++) {
            this.idPalet = this.palet[i].idPalet;
            this.tipo = this.palet[0].nombreCategoria;
            this.ancho = this.palet[0].ancho;
            this.largo = this.palet[0].largo;
            this.salida = this.palet[0].iSalida;
            this.idSalidaPalet = this.palet[0].sobrante;
                
            }
          }
 
         }
     })
  }
 
  volver(){
  
   this.tabla =false;
   this.instruccion = "";
   this.disponible = 0;
   this.salida = 0;
   this.entrada = 0;
   location.reload()
 }
 
 usuario:any='almacen';
 
  cantidad:number=0;
  errorCant!:boolean;
  comprobar(devInstr:any){
   
    this.cantidad =devInstr.value.cantidadDevuelta;
     
    if (this.cantidad <= 0) {
      return alert ('La cantidad deve ser mayor a cero');
    }
    
    if (this.cantidad > this.salida) {
      this.errorCant = true;
    } else {
      this.errorCant = false
    }
    
  }
 
 
  
  
 
   salir(){
     this.exito = true;
     setTimeout(()=>{
       this.exito = false;
       this.toggle=false;
       this.instruccion=null;
     },500)
   }
 
   err:boolean=true;
   pedido = new Pedido;
   addDevolver(devInstr:any){
     
     this.pedido =devInstr.value
     this.err=false;
    let con= this._ped.devolverPaletInstruccion(devInstr.value)
     .subscribe(resp=>{
      this.alerta.cargando('Compobrando los datos.');
     
    if (resp == 'success') {
      this.exito=true;
      this.alerta.presentLoadimensajeng('Enhorabuena, la devolución de la instrucción fue satisfactoria');
      setTimeout(()=>{
       this.exito = false;
       this.toggle=false;
       this.instruccion=null;
      
       location.reload();
     },3000)
    }else{
      alert('Errro, inténtelo mas tarde.');
      location.reload();

    }
  })
  setTimeout(()=>{
    con.unsubscribe();
      this.alerta.presentToast('El servidor no responde.');
      // this.err=true;
  },6100)
     
   }

   
  doRefresh(event:any) {
    setTimeout(() => {
      // this.splashScreen.show();
      location.reload();
      event.target.complete();
    }, 2000);
  }
 
 }
 