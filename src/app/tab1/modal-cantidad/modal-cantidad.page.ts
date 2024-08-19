import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PedidoService } from 'src/app/Services/pedido/pedido.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-modal-cantidad',
  templateUrl: './modal-cantidad.page.html',
  styleUrls: ['./modal-cantidad.page.scss'],
})
export class ModalCantidadPage implements OnInit {
  // show : true,
  // cantidadM : this.cantidadM,
  // original : this.original,
  // canmtidadNueva : this.cantidadM,
  // idDetalle : this.idDetalle,
  // categoria: this.nombreCategoria
  @Input() cantidadM:any;
  @Input() original:any;
  @Input() canmtidadNueva:any;
  @Input() idDetalle:any;
  @Input() categoria:any;
  @Input() ancho:any;
  @Input() largo:any;
  @Input() idPalet:any;
  @Input() idPedido:any;
  constructor(
    private modal : ModalController,
    private _ped: PedidoService,
    private toast:ToastService,
  ) { }

  ngOnInit() {
  }
  salirSinEditar(canmtidadNueva:any){
    const mensaje:string = "Guardando cambios"
    this.toast.presentLoadimensajeng(mensaje)
    
   
    //  this.verPedidoAlbaran(this.idPedido)
    this.modal.dismiss({
      data:this.idPedido,
      comentario: this.comentario
    });
  }

  comentario!:string;
  coment(event:any){  
    this.comentario = event.detail.value;
    
    
    if (this.comentario == 'f') {
      this.comentario = 'Faltantes';
    } else {
      this.comentario = 'Mal estado';
      
    }

    this._ped.cambiarComent(this.comentario, this.idPalet, this.idPedido)
    .subscribe(()=>{});
    }



  salir(){
  this.modal.dismiss();
  this.verPedidoAlbaran(this.idPedido)
  }

  mostrarSuma:boolean=false;
  mostrarResta:boolean=false;
  sumar:number=0;
  suma(){
    
    
    this.restar = 0;
    let a:any = 1;
   
    this.sumar = this.sumar + a ;
    this.canmtidadNueva = parseInt( this.cantidadM) +  a ;
    if (this.original == this.canmtidadNueva) {
      this.mostrarSuma = true;
    } else {
      this.mostrarSuma = false;
    }

    if (this.canmtidadNueva  > 1) {
      this.mostrarResta = false;
    }else{
      this.mostrarResta = true;
    }
    this.cantidadM = this.canmtidadNueva;
    this._ped.modifiCantApp(this.cantidadM, this.idDetalle)
    .subscribe(data=>{ 
    })
    
     this.verPedidoAlbaran(this.idPedido)
  }
  
  restar:number=0;
  resta(){
    this.sumar=0;
    let a:any = 1
    this.restar = this.restar + a ;
    this.canmtidadNueva = this.cantidadM -  a ;
    if (this.original == this.canmtidadNueva) {
      this.mostrarSuma = true;
    } else {
      this.mostrarSuma = false;
    }
    if (this.canmtidadNueva == 1) {
      this.mostrarResta = true;
    }else{
      this.mostrarResta = false;
    }
    this.cantidadM = this.canmtidadNueva,
    
    this._ped.modifiCantApp(this.cantidadM, this.idDetalle)
    .subscribe(data=>{
 
      
    })
     this.verPedidoAlbaran(this.idPedido)
  }


  fechas:any;
  albaran:any=[];
  alba:boolean=false;
  euros:number=0;
  idAlbaran:any;
  verPedidoAlbaran(idPedido:any ){
    this.idPedido = idPedido;
    this._ped.getPediRealizadoByIdGa(idPedido)
    .subscribe(res=>{
      this.alba =true;
      
      this.albaran = res;
      this.fechas= res[0].fechaConfirmado;
       this.idAlbaran = res[0].idAlbaran;
  
  })
  // setTimeout(()=>{
  //   this.inprimir(impresion, frame);
  //   this.alba=false
  // },1500)
 }

}
