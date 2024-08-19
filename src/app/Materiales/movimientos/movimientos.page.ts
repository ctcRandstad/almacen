import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { MaterialService } from 'src/app/Services/material/material.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Keyboard } from '@capacitor/keyboard';



@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})
export class MovimientosPage implements OnInit {


  @ViewChild('estanterias' , {static: false})  sInput:any;
  @ViewChild('palet' , {static: false})  pInput:any;

  
  constructor( 
    private rutaActiva: ActivatedRoute,
    private _material:MaterialService,
    private ruta:Router,
    private toast:ToastService,
    public alertController: AlertController,
    public plt:Platform,
 
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
    this.getUbicaciones();
  }


  dataU:any;
  movi!:boolean;
  asignada!:number;
  fifo!:number;
  getUbicaciones(){
  this._material.getUbicacionesMateriales(this.idMaterial)
  .subscribe(data=>{ 

    if (data != 'error' ) {
      this.dataU = data;      
    } else {
      alert('No hay ubicaciones asociadas al material.')
    }
  });
  }

  getUbicacionesId(){
    this._material.getUbicacionesMaterialesId(this.idMaterial , this.idEstanteria)
    .subscribe(data=>{ 
      if (data != 'error' ) {
        this.dataNueva = data;      
      } else {
        alert('No hay ubicaciones asociadas al material.');
        this.back();
      }
    });
    }


    dispo:any=[];
    countEstanteriasDisponible(){
      this._material.countEstanteriasDisponible(this.idEstanteria, this.idMaterial)
      .subscribe(resp=>{ 
      
       if (resp != 'error') {
        // this.descr = true;
           this.dispo = resp
       
       }else{
        // this.descr = false;
       }
     })

    }
  



nombreEs:any;
idEstanteria!:number;
disponible!:number;
dataNueva!:any[];
  movimientos(item:any){
    this.fifo = item.fifoM;
    this.asignada = item.asignada;
    this.idEstanteria = item.idEstanteria;
    this.nombreEs=item.nombre;
    this.disponible=item.disponible;
    if (this.disponible > 0) {
      this.movi=true;
      if (this.asignada == 0) {
        this.getUbicacionesId();
      } else {
        this.getUbicacionesId();
        this.countEstanteriasDisponible();
        
      }
 
    } else {
      return;
    } 
  }


  materiales:any;
  mostrarM!:boolean;
  estan!:number;
  estanteria(event:any){
   this.estan= event.target.value;
    this._material.getMaterialesIdUbicaciones(this.idMaterial,event.target.value)
    .subscribe(data=>{ 
    
      if (data == 'error') {
        alert('No hay material ubicado en la ubicación seleccionada.');
        this.back();
      } else {
        this.materiales = data;
        this.mostrarM=true;
      }
    });
  }

  sinFifo:boolean=false;
  conFifo:boolean=false;
  bulto:any;
  palet:any;
  idPalet:any;
  sap!:number;
  mate(event:any){
  
    this._material.materialesMover(event.target.value , this.fifo, this.estan, this.idMaterial)
    .subscribe(data=>{ 
    
   this.palet=data;
   if (this.fifo == 1) {
     this.idPalet=this.palet[0].etiqueta;
     this.asignadaOrigen=this.palet[0].asignada;
     this.estanteriaOrigen=this.palet[0].idEstanteria;
     this.sap=this.palet[0].codigoSap;
     
     this.sinFifo=false;
     this.conFifo = true;
   } else {
    this.sinFifo=true;
    this.conFifo = false;  
   }
    });
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
    setTimeout(() => {
    //  this.keyboard.hide();
    Keyboard.hide();
    }, 800);
  }


  mostraPanel!:boolean;
  mate1(item:any){
    this.palet=[];
    this.palet.push( item.target.value);
    this.idPalet=this.palet[0].etiqueta;
     this.asignadaOrigen=this.palet[0].asignada;
     this.estanteriaOrigen=this.palet[0].idEstanteria;
     this.sap=this.palet[0].codigoSap;
    this.mostraPanel = true;
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
    setTimeout(() => {
    //  this.keyboard.hide();
    Keyboard.hide();
    }, 800);
    
  }


  correcta!:boolean;
erronea!:boolean;
es:any;
scanEsta(idEstanteria:any){
  if (idEstanteria == this.idEstanteria) {
    this.correcta = true;
    this.erronea = false;
    setTimeout(() => {
    this.pInput.setFocus();
  }, 500);
  setTimeout(() => {
  //  this.keyboard.hide();
  Keyboard.hide();
  }, 800);
   } else {
     this.es=null;
     this.correcta = false;
     this.erronea = true;
     setTimeout(() => {
       this.sInput.setFocus();
     }, 500);
     setTimeout(() => {
      // this.keyboard.hide();
      Keyboard.hide();
     }, 800);
   }
  
}

correcta1!:boolean;
erronea1!:boolean;
pa:any;
datos:any=[];
todoOk!:boolean;
scanP(idPalet:any){
  if (idPalet == this.idPalet) {
    setTimeout(() => {
      // this.keyboard.hide();
      Keyboard.hide();
     }, 800);
    this.correcta1 = true;
    this.erronea1 = false;
    this.todoOk = true;
   } else {
    //  this.pInput.setFocus();
     this.pa = null;
     this.correcta1 = false;
    this.erronea1 = true;
    this.todoOk = false;

    setTimeout(() => {
      this.pInput.setFocus();
    }, 500);
    setTimeout(() => {
      // this.keyboard.hide();
      Keyboard.hide();
     }, 800);
  }

}


estanteriaOrigen!:number;
estanteriaDestino!:number;
idPaletEtiqueta:any;
asignadaOrigen!:number;
asignadaDestino!:number;
btn!:boolean;
configSinAsignar(){
  this.btn = true;
  this.asignadaDestino = this.asignada;
  this.idPaletEtiqueta = this.idPalet;
  this.estanteriaDestino = this.idEstanteria;
  let con= this._material.movimientoM(this.asignadaOrigen,this.sap,this.idMaterial,this.idPaletEtiqueta,this.estanteriaDestino,this.estanteriaOrigen)
  .subscribe(data=>{ 
    if (data == 'success') {
      this.toast.presentLoadimensajeng('Moviendo bulto. Espere por favor');
      this.back();
    }   
  });
  setTimeout(()=>{
    con.unsubscribe();
  },3000)


  

}


retirada!:boolean;
retirarM(codigoSap:any,desOpcional:any){
this.retirada = true;
this._material.materialesMoverAsi(codigoSap , this.fifo, this.idEstanteria, this.idMaterial)
.subscribe(data=>{ 
 
  this.materialMaquina(codigoSap);
if (data != 'error') {
  this.palet=data;
  if (this.fifo == 1) {
   this.idPalet=this.palet[0].etiqueta;
   this.asignadaOrigen=this.palet[0].asignada;
   this.estanteriaOrigen=this.palet[0].idEstanteria;
   this.sap=this.palet[0].codigoSap;
   
   this.sinFifo=false;
   this.conFifo = true;
   if (this.idPalet == null) {
    alert('No hay stock de la referencia seleccionada.');
    this.back();
   }
  } else {
  this.sinFifo=true;
  this.conFifo = false;  
  }
  
}else{
  alert('No hay stock de la referencia seleccionada.');
  this.back();
}
});

}

materialMaquina(sap:any){
  this._material.materialMaquina(sap)
  .subscribe(data=>{ 
//  console.log(data);
 
     if (data != 'error') {
       alert('Esta referencia se encuentra ubicada en ' + data[0].nombre + ' Bulto # '  + data[0].idM)
     }
  });
}


configAsignar(){
  this.btn = true;
  this.asignadaDestino = this.asignada;
  this.idPaletEtiqueta = this.idPalet;
  this.estanteriaDestino = this.idEstanteria;
  
  
  let con= this._material.movimientoMAsignada(this.asignadaOrigen,this.sap,this.idMaterial,this.idPaletEtiqueta,this.estanteriaDestino,this.estanteriaOrigen)
  .subscribe(data=>{ 
    if (data == 'success') {
      this.toast.presentLoadimensajeng('Moviendo bulto. Espere por favor');
      this.back();
    }   
  });
  setTimeout(()=>{

  con.unsubscribe();
  
  },3000)


  

}


  back(){
    this.movi=false;
    this.mostrarM=false;
    this.conFifo = false;
    this.sinFifo=false;
    this.correcta1 = false;
    this.erronea1 = false;
    this.todoOk = false;
    this.correcta = false;
    this.erronea = false;
    this.pa=null;
    this.es = null;
    this.btn = false;
    this.retirada = false;

    this.mostraPanel = false;

    this.getUbicaciones();

  }

  doRefresh(event:any) {
    setTimeout(() => {
      // this.splashScreen.show();
      location.reload();
      event.target.complete();
    }, 2000);
  }
}
