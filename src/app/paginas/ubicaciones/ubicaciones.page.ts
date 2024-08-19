import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../Services/material/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {

  constructor( private _material:MaterialService, private ruta:Router) { }

  ngOnInit() {
    this.getHuecosLibres();
  }



  data:any;
  mostra!:boolean;
  getHuecosLibres(){

    this._material.getHuecosLibres()
    .subscribe(data=>{ 
this.mostra = true;

      if (data == 'error') {
        this.data = [
          {
            nombre: ' huecos vacíos',
            nombreMaterial: 'No hay '
        }
        ] ;
      } else {
        this.data = data;
      }
    
    });
    setTimeout(()=>{
this.mostra = false;
    },2000)

  }

  ir(item:any){
  this.ruta.navigate(['./movimientosM/' , item.idMaterial])
  }

}
