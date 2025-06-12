import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Browser } from '@capacitor/browser';

import { MaterialService } from 'src/app/Services/material/material.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VariosService } from 'src/app/Services/varios/varios.service';
import { Keyboard } from '@capacitor/keyboard';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ubicar',
  templateUrl: './ubicar.page.html',
  styleUrls: ['./ubicar.page.scss'],
 
})
export class UbicarPage implements OnInit {


  idMaterial:any;

  @ViewChild('esta', {static: false})  sInput:any;

  constructor(
   
    private _varios : VariosService,
    private toast : ToastService, 
    private ruta:Router,
    private rutaActiva: ActivatedRoute,
    private _material:MaterialService,
      public loadingController: LoadingController,
    
    ) {}


    datas:any;
    fifoE!:number;
    urlOpen:any;
    ngOnInit() {
      this.idMaterial=  this.rutaActiva.snapshot.params['id'];
      this._material.getMateterialId( this.idMaterial)
      .subscribe(data=>{ 
       console.log(data);
       
        if (data == 'error') {
          alert('Error en el material.')
        } else {
          this.datas = data[0].nombreMaterial;
          this.urlOpen = data[0].url;
          this.fifoE = data[0].fifoE;
          // console.log(this.data);
          
        }
      });
    }
  

///fin    

confirmar:boolean=false;


si(){
  this.confirmar = true;
  this.printer = false; 
  Browser.open({ url: this.urlOpen + '/etiquetas/#/etiquetas/' + this.idMaterial});
 
}
 
no(){
  this.confirmar = true;
  this.printer = false;

}


  todo: any
  public bar:any;

  data:any=[];

    ionViewWillEnter(){
      this.getEntrada();
    
  }



  a:string ='bbfbfdbdf'
  sinEntrada:boolean=false;
  printer!:boolean;
  minIdMaterial!:any;
  getEntrada(){
  this._varios.getEntradaVarios(this.idMaterial)
  .subscribe(data=>{
    if (this.fifoE == 1) {
      this.minIdMaterial= data[0].idM;
    }else{
      this.minIdMaterial = null;
    }
    if (data != 'error') {
      this.data = data;
      this.sinEntrada = false;
      this.todo = data
      
    }else{
     this.sinEntrada = true;
     this.confirmar = true;
    }
  })

  if (!this.sinEntrada) {
    this.printer = true;
  } else {
    this.printer=false;
  }
  
  }

  onClick1(){
    this.individual = false;
    this.ubi = null;
    this.nomUbi= "";
    this.errorU = false;
    this.errorDisponible = false;
    this.sinEntrada = false;
    this.estanteriasDatas=[];
    this.estanteriasData=[];
    this.getEntrada();
    this.confirmar = true;
    this.printer = false;
    this.bienE=false;
    this.boton=false;
    // console.log(this.estanteriasDatas);
    this.destino=[];
    
  }




  boton!:boolean;
processing = false; // Agrega esto como propiedad de clase

async ubicar(action: any) {
  if (this.processing) return;
  this.processing = true;

  const loading = await this.loadingController.create({
    message: 'Ubicando material...',
    mode: 'ios'
  });
  await loading.present();

  const { codigoSap } = action.value;
  this.datos = action.value;

  const sub = this._varios.ubicarMaterial(this.datos).subscribe({
    next: resp => {
      console.log(resp);
      
      if (resp.status === 'success') {
        this.onClick1();
      } else {
        alert(resp.message || 'No se pudo ubicar.');
      }
      this.terminarUbicacion();
      loading.dismiss();
    },
    error: () => {
      alert('Error al ubicar. Verifica tu conexión.');
      this.terminarUbicacion();
      loading.dismiss();
    }
  });

  setTimeout(() => {
    sub.unsubscribe();
    this.terminarUbicacion();
    loading.dismiss();
  }, 3000);
}


terminarUbicacion() {
  this.boton = false;
  this.processing = false;
}


  error:boolean = false;
  errorU:boolean = false;
  datos:any;
  individual:boolean= false;
  cantidadPalet!:number;
  estanteriasData:any=[];
  estanteriasDatas:any=[];
  codigoSap!:number;
  idM!:number;
onClick(item: any) {
  this.individual = true;

  // FIFO obligatorio: se controla el bulto más pequeño
  if (this.fifoE === 1 && item.idM !== this.minIdMaterial) {
    alert('Debe colocar el bulto más pequeño...');
    SplashScreen.show();
    location.reload();
    return;
  }

  this.datos = item;

  // Buscar estanterías disponibles para ese código SAP
this._varios.getUbicacionMaterial(this.datos.codigoSap, this.idMaterial).subscribe(res => {
  if (res.status !== 'success' || !Array.isArray(res.data)) {
    this.mostrarError('No hay ubicación asociada al material. Dirígete al departamento técnico.');
    return;
  }

  this.estanteriasDatas = res.data;
  this.destino = this.estanteriasDatas
    .filter((e: any) => e.libres > 0)
    .map((e: any) => e.idEstanteria);

  if (this.destino.length === 0) {
    this.mostrarError('No hay más huecos disponibles para ubicar. Dirígete al departamento técnico.');
  }
});


  // Enfocar input y ocultar teclado
  setTimeout(() => this.sInput.setFocus(), 500);
  setTimeout(() => Keyboard.hide(), 800);
}

private mostrarError(mensaje: string) {
  alert('⚠️ ' + mensaje);
  SplashScreen.show();
  location.reload();
}

  
  ubi:any;
  disponibleEstanteria:number=0;
  nomUbi!:string;
  errorDisponible!:boolean;
  bienE!:boolean;
  destino:any[] = [];
  idEstanteria!:number;
scan(estanteria: any): void {
  
  this.idEstanteria = estanteria;

  const esDestinoValido = this.destino.includes(Number(this.idEstanteria));


  if (esDestinoValido) {
    this._varios.estanteriaById(this.idEstanteria).subscribe({
      next: (data) => {
        this.nomUbi = data?.[0]?.nombre || 'Ubicación desconocida';
        this.bienE = true;
        this.errorU = false;
      },
      error: () => {
        this.mostrarError('No se pudo obtener el nombre de la estantería.');
      }
    });
  } else {
    this.errorU = true;
    this.bienE = false;

    setTimeout(() => this.sInput.setFocus(), 500);

    setTimeout(() => {
      Keyboard.hide();
      this.ubi = null;
      this.errorU = false;
    }, 3000);
  }
}


  doRefresh(event:any) {
    setTimeout(() => {
      SplashScreen.show();
      location.reload();
      event.target.complete();
    }, 2000);
  }
 
}