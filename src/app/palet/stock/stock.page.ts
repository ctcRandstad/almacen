import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, Platform } from '@ionic/angular';
import { PaletService } from 'src/app/Services/palet/palet.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  @ViewChild(IonInfiniteScroll , {static: false}) infiniteScroll!: IonInfiniteScroll;
  constructor(
    private _pa : PaletService,
    private toastrService : ToastService,
    private ruta: Router,
    public plt: Platform,
  ) { }

  ngOnInit() {
  }


  largos!:number;
  movil:boolean=false;
  ionViewWillEnter(){
    this.getPalet();
    this.largos =this.plt.width();
    if (this.largos <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
   
  } 

  ancho:any;
  largo:any;
  busqueda!:boolean;

  buscarP(buscar:any){
    this.ancho=  buscar.value.ancho;
    this.largo = buscar.value.largo;
     this._pa.buscarPaletMedidas(this.ancho, this.largo)
     .subscribe(resp=>{
       if (resp == 'error') {
      //  this.toastrService.error('no se ha encontrado palet')
      let msj:string = 'No se ha encontrado palet';
      this.toastrService.presentToast(msj);
      this.ancho=null;
      this.largo=null;
       }else{
         let msj:string = 'Buncando Palet con estas medidas....'
         this.toastrService.presentLoadimensajeng(msj);
      this.data = resp;
      this.busqueda = true;
       }
 
     })
  }

  limpiar(){
    this.getPalet();
    this.busqueda=false;
   this.ancho = null;
   this.largo = null;
  }
  mostrarForm:boolean=false;
myChange(event:any) {
  if (event.detail.checked) {
    this.mostrarForm = true;
  } else {
    this.mostrarForm = false;  
    this.limpiar();  
  }

 
}


  // scrol infinito

  datos:any=[];
  param:number = 1;
  sum:number = 0;
  finData:boolean=false;
  loadData(event:any) {

    this.desde +=10;
    this._pa.getPalet(this.desde,this.hasta)
    .subscribe(data=>{ 
      if (data == 'error') {
        event.target.disabled = true;
        return   this.finData = true;  
      } else {
            this.data.push( ...data);
            event.target.complete();
          return this.finData=false;
      }
     
    })
    
  }

  public filterQuery = "";
  buscar(event:any){
    this.filterQuery = event.detail.value;
    
  }

  doRefresh(event:any) {
    setTimeout(() => {
      this.ruta.navigate(['palet']);
      event.target.complete();
    }, 2000);
    
  }
  
    
  data:any[]=Array();
  loader:boolean=false;
  desde:number=0;
  hasta:number=10;
  getPalet(){
    this._pa.getPalet(0,this.hasta)
    .subscribe(data=>{
      if(data == 'error'){
        this.loader=true;
      }else{
        this.data = data;
        this.loader=false;
      }
      this.loader=true;

    })
  }

}
