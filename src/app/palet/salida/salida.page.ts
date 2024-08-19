import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/Services/toast.service';

import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-salida',
  templateUrl: './salida.page.html',
  styleUrls: ['./salida.page.scss'],
})
export class SalidaPage implements OnInit {
  constructor(
    private load:ToastService,

   private ruta:Router
  ) { }


  ngOnInit() {
  }

  normal(){
    
  }

  salida:boolean=true;
  salidaI:boolean = false;

  salidas(){
   this.salida = true;
   this.salidaI=false;
  }

  salidasI(){
    this.salida = false;
    this.salidaI=true;
  }

  onClick(){
   SplashScreen.show()
     location.reload();
   
  }



}
