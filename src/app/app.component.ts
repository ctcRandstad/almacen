import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { MaterialService } from './Services/material/material.service';
import { PushService } from './Services/push.service';
import { ToastService } from './Services/toast.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
   

    private menu: MenuController,
    private ruta :  Router,
    private toast:ToastService,
    private _push: PushService,
    private _ser:MaterialService,
  ) {
    this.initializeApp();
    this._push.configuracionInicial();
  }

  rol:any;
  initializeApp() {
    this.getMetriales();
    this.platform.ready().then(()=> {
      SplashScreen.hide();
      // this.statusBar.styleDefault();
    });
   
 
  }
  
  
  // davoluciones(){
  
  //   if (this.rol == 'L') {
  //     setInterval(()=>{
  //       this._mandriles.getDevoluciones()
  //       .subscribe(resp=>{
  //         // console.log(resp);
          
  //        if (resp != 'error') {
  //          alert('La rebobinadora le avisa de que tiene que retirar un palet');
  //        }
          
  //       })
  //     },300000)
  //   }
  // }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  
  
  paginaPrincipal(){
    
    this.menu.close();
    this.ruta.navigate(['main1']);
  }
  
    
  sinData!:boolean;
  data:any;
  getMetriales(){
   this._ser.getMaterial()
   .subscribe(data=>{
     if (data == 'error') {
       this.data=[];
       this.sinData=true;
      }else{
        this.sinData=false;
        this.data = data;
        
    }
   })
  }

  mat(idMaterial:number){
  
     this.menu.close();
    if (idMaterial == 3) {
      this.ruta.navigate(['palets']);
      
    } else {
     this.ruta.navigate(['material' , idMaterial]);
      
    }
    
  }


  



}
