import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Browser } from '@capacitor/browser';

import { MaterialService } from 'src/app/Services/material/material.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VariosService } from 'src/app/Services/varios/varios.service';
import { Keyboard } from '@capacitor/keyboard';

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
  ubicar(action:any){
    this.boton = true;
    
    this._material.materialMaquina(action.value.codigoSap)
    .subscribe(data=>{ 
        
       if (data != 'error') {
           let a  =  confirm('Esta referencia se encuentra ubicada en ' + data[0].nombre + ' Bulto # '  + data[0].idM);
               if (a) {

                this._material.materialEstanterias(action.value.codigoSap,this.idMaterial, this.idEstanteria)
                .subscribe(data=>{ 
              //  console.log(data);
               
                   if (data != 'error') {
                    let b  =  confirm('Hay más bulto de esta referencia en otra ubicación no asignada' );

                      if (b) {
                         
                          this.datos = action.value
                        let ubicar1 =  this._varios.ubicarMaterial(this.datos)
                          .subscribe(data=>{
                            if (data == 'success') {
                              this.onClick1();
                            }
                          })
                        setTimeout(()=>{
                          ubicar1.unsubscribe();
                         
                        },2000)
                      } else {
                        this.onClick1();
                      }
                   }else{
                      
                        this.datos = action.value
                      let ubicar1 =  this._varios.ubicarMaterial(this.datos)
                        .subscribe(data=>{
                          if (data == 'success') {
                            this.onClick1();
                          }
                        });
                        setTimeout(()=>{
                          ubicar1.unsubscribe();
                        
                     },2000)
                   }
                });
              
              }else{
                
                this.onClick1();
               }
       }else{
         // no hay material 

         this._material.materialEstanterias(action.value.codigoSap,this.idMaterial, this.idEstanteria)
         .subscribe(data=>{ 
       //  console.log(data);
        
            if (data != 'error') {
             let b  =  confirm('Hay más bulto de esta referencia en otra ubicación no asignada' );

               if (b) {
                  
                   this.datos = action.value
                 let ubicar1 =  this._varios.ubicarMaterial(this.datos)
                   .subscribe(data=>{
                     if (data == 'success') {
                       this.onClick1();
                     }
                   })
                 setTimeout(()=>{
                  ubicar1.unsubscribe();
                        
                 },2000)
               } else {
                 this.onClick1();
               }
            }else{
            
              this.datos = action.value
            let ubicar1 =  this._varios.ubicarMaterial(this.datos)
              .subscribe(data=>{
               
                if (data == 'success') {
                  this.onClick1();
                }
              });
              setTimeout(()=>{
                ubicar1.unsubscribe();
                
        },2000)
            }
         });
       

       }
    }); // fin de la verificación en máquina! 
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
  onClick(item:any){
    
    this.individual = true;
    if (this.fifoE == 1) {
          if (item.idM !== this.minIdMaterial) {
            alert('Debe colocar el bulto mas pequeño...');
            SplashScreen.show();
            location.reload();
            
          }else{
            this.datos = item;
         }
    } else {
          this.datos = item;
    }

    
 // buscamo la estanteria disponible
 this._varios.getUbicacionMaterial(this.datos.codigoSap,this.idMaterial)
 .subscribe(res=>{
 
   if (res != 'error') {
     this.estanteriasDatas=res;
     for (let i = 0; i < this.estanteriasDatas.length; i++) {
       if ( this.estanteriasDatas[i].libres > 0) {
         const element = this.estanteriasDatas[i].idEstanteria;
         this.destino.push(element);
         
       }
       

      }
      
      if (this.destino.length == 0) {
         alert('Error, no hay más huecos disponibles para ubicar. Dirígete al departemanto técnico. ');
         SplashScreen.show();
          location.reload();
      }
   } else {
     alert('Error, no hay ubicación asociada al material. Dirígete al departemanto técnico. ');
     SplashScreen.show();
     location.reload();
   }

 })

    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
    setTimeout(() => {
      // this.keyboard.hide();
        Keyboard.hide();
     }, 800);
  }
 
  
  ubi:any;
  disponibleEstanteria:number=0;
  nomUbi!:string;
  errorDisponible!:boolean;
  bienE!:boolean;
  destino:any[] = [];
  idEstanteria!:number;
  scan(estanteria:any ){
  
    this.idEstanteria = estanteria;
    let a = this.destino.includes(this.idEstanteria);
    if (a) { 
      this._varios.estanteriaById(this.idEstanteria)
      .subscribe(data=>{ 
    
        this.nomUbi = data[0].nombre;
      });
      this.bienE = true;
       this.errorU=false;
    } else {
      this.errorU=true;
      this.bienE=false;
      setTimeout(() => {
            this.sInput.setFocus();
              this.ubi=null;
          }, 500);
          setTimeout(() => {
            // this.keyboard.hide();
            Keyboard.hide();
            this.ubi=null;
            this.errorU=false;
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