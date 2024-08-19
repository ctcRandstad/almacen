import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PaletService } from 'src/app/Services/palet/palet.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Palet } from '../model/palet';



@Component({
  selector: 'app-sobrantes',
  templateUrl: './sobrantes.page.html',
  styleUrls: ['./sobrantes.page.scss'],
})
export class SobrantesPage  {

  constructor(
    public plt: Platform,
    public _ped:PaletService,
    private _toa:ToastService,
  ) {}
  inst:any;

  usuarioS:any;
  optionsSelect:any= [];
  getSelectedValue(event: any) {
   console.log('Selected value');
   
 }

 

 tabla!:boolean;
data:any;

fe:any;
fec:any;
cambioFecha(event:any){
  let data = new Date(event.detail.value);
  this.fe = data;
  const mesActual =  this.fe.getMonth() + 1; 
   this.fec = this.fe.getFullYear() + '-' + mesActual + '-' + this.fe.getDate();


}
 verDev(data:any){
 
   this._toa.presentLoadimensajeng('Consultando...')
   this.tabla = true;
   this._ped.verDev( this.fec)
   .subscribe(data=>{ 

     if (data != 'error') {
       this.data = data;     
     } else {
       alert('No hay datos de devoluciones en la fecha seleccionada');
       this.tabla= false;
     }
   });
   
 }


 reset(){
   this.tabla=false;
 }

}
