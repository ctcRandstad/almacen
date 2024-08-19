import { Component, OnInit } from '@angular/core';

import { MaterialService } from 'src/app/Services/material/material.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-instruccion',
  templateUrl: './instruccion.page.html',
  styleUrls: ['./instruccion.page.scss'],
})
export class InstruccionPage implements OnInit {

  constructor(   
    
    private _instr:MaterialService,
    public plt: Platform
    ) { }

  ngOnInit() {
  }

  largos!:number;
  movil:boolean=false;
  ionViewWillEnter(){
    this.largos =this.plt.width();
    if (this.largos <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
   
  } 

  ancho:any;
largo:any;
buscarPalet!:boolean;
buscarPaIn(buscar:any){
  this._instr.buscarPaletIn(buscar.value)
  .subscribe(data=>{ 
    if (data !== 'vacio') {
      this.data = data;
      this.buscarPalet=true;
      this.sinSpiner = true;
    }else{
      alert('El palet no tiene instruccion asociada.');
      this.nueva();
    }
  });
  
}


  mostrar1!:boolean;
  mostrarError!:boolean;
  sinSpiner!:boolean;
  data:any;
  buscarInstruccion(first:any){
    this._instr.instruccionBuscar(first.value)
    .subscribe(data=>{
    
      if (data == 'error') {
        this.mostrarError=true;
        this.mostrar1=false;
        this.inst=null;
        this.sinSpiner=false;
        
      } else {
        this.data = data;            
        this.mostrarError = false;
        this.sinSpiner = true;
      }
    })
  }
  
  
 
  inst:any;
  nueva(){
   this.mostrar1=false;
   this.inst=null;
   this.mostrarError =false;
   this.sinSpiner=false;
   this.ancho=null;
   this.largo=null;
 }

}
