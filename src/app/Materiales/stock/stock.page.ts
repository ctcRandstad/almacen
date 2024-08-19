import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { MaterialService } from 'src/app/Services/material/material.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VariosService } from 'src/app/Services/varios/varios.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  constructor( 
    private rutaActiva: ActivatedRoute,
    private _material:MaterialService,
    private ruta:Router,
    private toast:ToastService,
    public alertController: AlertController,
    public plt:Platform,
    private _varios:VariosService
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

    this.getStock();
  }


  data:any;
  getStock(){
    this._varios.getStockAlmacen(this.idMaterial)
    .subscribe(data=>{ 
    this.data = data;
    });
  }


  verDetalle!:boolean;
  detalleMaterial:any;
  desOpcional!:string;
  fila!:number;
  loader!:boolean;
  detalle(codigoSap:number,i:any){
    this.fila = i;
   this.loader=true;
   setTimeout(()=>{

     this._varios.getStockAlmacenDetalle(codigoSap)
     .subscribe(data=>{ 
       if (data != 'error') {
         this.detalleMaterial = data;
         this.desOpcional = this.detalleMaterial[0].desOpcional
         this.verDetalle = true;
         this.loader=false;
       } else {
         alert('Error, en la consulta.');
         this.detalleMaterial=[];
         this.verDetalle=false;
         this.loader=false;
  
       }
     });
   },2000)
    
  }

  borrarDetalle(){
    this.verDetalle=false;
    this.getStock();
    this.fila= 0;

  }

}
