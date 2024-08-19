import { Component } from '@angular/core';
import { PedidoService } from '../Services/pedido/pedido.service';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { ModalCantidadPage } from './modal-cantidad/modal-cantidad.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 
  constructor( 
    private _ped:PedidoService,
    private ruta:Router,
    private toast:ToastService,
    public alertController: AlertController,
    public plt:Platform,
    public  modal:ModalController
  ) {}
 
  optionsSelect: any=[];
  tipoUsuario!:string;
  ngOnInit() {
        this.getPedidosRealizados();
   
  }

  // buscar(event){
  //   this.filterQuery = event.detail.value;
    
  // }

  largo:any;
  movil:boolean=false;
  ionViewWillEnter(){
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
   
  } 

 
  public filterQuery = "";
  public rowsOnPage = 10;
  data:any=[];
  si!:boolean;
  sinData!:boolean;
  getPedidosRealizados(){
    setInterval(()=>{
      this._ped.getPedidoRealizados().subscribe(res=>{
        if (res == 'error' ) {
          this.sinData=false;
        }else{
          this.sinData = true;
          this.data=res; 
        }
        })
        },3000)
        if (!this.data) {
          this.sinData=true;
          this.si=true;
          let m:string = 'Cargando los pedidos'
          this.toast.presentLoadimensajeng(m);
        }
    }
    
    getPedidosRealizados1(){
      this._ped.getPedidoRealizados1().subscribe(res=>{
        this.data=res;  

      })
  }

  show!:boolean;
  volver(){
  // this.verPedidoAlbaran(this.idPedido);
    this.ve = false;
    this.alba=false;
    this.show= false;
    // this.getPedidosRealizados();
    //this.ruta.navigate(['/palets']);
  }

  volver1(){
    // this.verPedidoAlbaran(this.idPedido);
      this.ve = false;
      this.alba=false;
      this.show= false;
      // this.getPedidosRealizados();
      this.ruta.navigate(['/palets']);
    }

  async openCant(){
  const modal = await this.modal.create({
      component: ModalCantidadPage,
      componentProps: {
        idPedido : this.idPedido,
        idPalet : this.idPalet,
        show : true,
        mostrarSuma: this.mostrarSuma,
        mostarResta : this.mostrarResta,
        cantidadM : this.cantidadM,
        original : this.original,
        canmtidadNueva : this.cantidadM,
        idDetalle : this.idDetalle,
        categoria: this.nombreCategoria,
        ancho:this.anch,
        largo:this.larg
      }
    });
     await modal.present();


    //  resibir del hijo al padre
     const { data } = await modal.onDidDismiss();
     console.log(data);
     
     this.show = false;
     this.comentario = data.comentario;
     this.verPedidoAlbaran(data.data);
  }


  selectedValue = 'todos';
  getSelectedValue(tipo: any ,bo:any) {
   
    let cargado:number;
    if (bo == false) {
      this._ped.getPedidoFiltros(tipo , cargado = 1)
      .subscribe(data=>{
        if (data == 'error') {
          this.data = [];
        }else{
          this.data = data;
        }
      })
      
    } else {
      this._ped.getPedidoFiltros(tipo , cargado = 0)
      .subscribe(data=>{
        if (data == 'error') {
          this.data = [];
        }else{
          this.data = data;
        }   
      })
    }
  }

  fechas:any;
  albaran:any=[];
  alba:boolean=false;
  euros:number=0;
  verPedidoAlbaran(idPedido:any ){
    this.idPedido = idPedido;
    this._ped.getPediRealizadoByIdGa(idPedido)
    .subscribe(res=>{
      this.alba =true;
      this.ve = true;
      this.albaran = res;
      this.fechas= res[0].fechaConfirmado;
       this.idAlbaran = res[0].idAlbaran;
    this.getTotales();
    this.getAgente();
  })
  // setTimeout(()=>{
  //   this.inprimir(impresion, frame);
  //   this.alba=false
  // },1500)
 }

 m:boolean=false;
 boton:boolean=false;
//  albaranC:AlbaranC;
 agente1!:string;
 getAgente(){
   this._ped.getAgente(this.idPedido)
   .subscribe(res=>{
   this.agente1 = res.agente;
   if (this.agente1 == null) {
     this.m=false;
   }else{
     this.m=true;
    this.boton = true;
   }
   })

 }


  pRealizado:any= [];
  idPedido!:number;
  ve:boolean=false;
  paraF:any;
  fech:any;
  idAlbaran:any;
  verPedido(idPedido:any){
    
   this.idPedido = idPedido;
   this._ped.getPediRealizadoById(idPedido)
   .subscribe(res=>{
     this.ve =true;
     this.pRealizado = res; 
     for (let i = 0; i < this.pRealizado.length; i++) {
      this.fech = this.pRealizado[0].fecha;
      this.paraF = this.pRealizado[0].paraFecha;
     }
    //  frame.show();
     this.getTotales();
   })
  }
  hide(){
    this.ve=false;
    
  }

  bo:boolean=false;
  confirmado(){
   this.bo = false;
   this.getPedidosRealizados();
   this.selectedValue="todos";
   this.getSelectedValue(this.selectedValue,this.bo);
  }

  preparacion(){
 this.getPedidosRealizados1();
 this.bo=true;
 this.selectedValue="todos";
 this.getSelectedValue(this.selectedValue, this.bo);

  }  
  modCantidad(canmtidadNueva:any){
    if (canmtidadNueva  > this.original) {
       alert('No puede mas de la  la cantidad original.')
    } else if (canmtidadNueva < 1) {
      alert('No puede colocar una cantidad menor a 1.')
    }else {
      this._ped.modifiCantApp(this.canmtidadNueva, this.idDetalle)
      .subscribe(()=>{ 
        this.verPedidoAlbaran(this.idPedido)
      })
    }
  }

  cantidadM:any;
  canmtidadNueva:number = 0;
  idDetalle!:number;
  original!:number;
  mostrarSuma:boolean=false;
  mostrarResta:boolean=false;
  nombreCategoria!:string;
  anch!:number;
  larg!:number;
  idPalet!:number
  modCant(cantidadM:any, idDetalle:any, cantidad:any,nombreCategoria:any,ancho:any, largo:any, idPalet:any, idPedido:any){
    
    if (cantidadM  == cantidad) {
      this.mostrarSuma = true;
    } else {
      this.mostrarSuma = false;
    }
    this.idPedido = idPedido;
    this.idPalet=idPalet
    this.anch = ancho;
    this.larg = largo;
    this.show = true;
    this.cantidadM = cantidadM; 
    this.original = cantidad; 
    this.canmtidadNueva = this.cantidadM
    this.idDetalle = idDetalle;
     this.nombreCategoria = nombreCategoria
     if (this.movil) {
       this.openCant();
     } 
  }

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

  salirSinEditar(canmtidadNueva:any){
    const mensaje:string = "Guardando cambios"
    this.toast.presentLoadimensajeng(mensaje)
    this.show=false;
    this.verPedidoAlbaran(this.idPedido)
  }

 comentario!:string;
  coment(event:any, idPalet:any, idPedido:any){

    this.comentario = event.detail.value;
    if (this.comentario == 'f') {
      this.comentario = 'Faltantes';
    } else {
      this.comentario = 'Mal estado';
      
    }

    this._ped.cambiarComent(this.comentario, idPalet, idPedido)
    .subscribe(()=>{});
    }
  

  coment1(event:any, idPalet:any, idPedido:any){
    this.comentario = event.detail.value;
    if (this.comentario == 'f') {
      this.comentario = 'Faltantes';
    } else {
      this.comentario = 'Mal estado';
      
    }
    
    }
  
 btnTabs!:boolean;
 async validadL(idDetalle:any, instruccion:any , categoria:any , ancho:any , largo:any,cantidad:any ,cantidadM:any ,  cantidadE:any , idPalet:any, idPedido:any){
   
  this.btnTabs = true;
   if (this.comentario == undefined) {
     this.comentario = 'Mal estado';
    }
    // console.log(this.comentario);
   
 
      const alert = await this.alertController.create({
        header: 'Validar linea!',
        message: '¿Estas <strong>seguro  de validar ' + categoria + ' ' +  ancho  + ' x ' + largo +  ' </strong> ?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'btn-danger',
            handler: () => {
              this.btnTabs = false;
              return;
            }
          }, {
            text: 'Validar',
            cssClass: 'btn-success',
            handler: () => {
              // console.log(idDetalle, cantidadM , cantidadE  , idPalet, idPedido);
          //   //  acepto los validación
          let con=    this._ped.validarEntrada(idDetalle, cantidad , cantidadM , cantidadE  , idPalet,idPedido ,  this.comentario, instruccion)
           .subscribe(res=>{

            if(res == 'success'){
              this.btnTabs = false;
              this.verPedidoAlbaran(this.idPedido)
            }else{
             location.reload();

            }
            
           })
           setTimeout(()=>{
            this.btnTabs = false;
            con.unsubscribe();
              },3000)
           }
          }
        ]
      });
    
      await alert.present();
    this.idDetalle = idDetalle;


  }

  borrado:boolean = false;
  async eliminarL(idDetalle:any ,nombreCategoria:any,ancho:any, largo:any, cantidadM:any , idPalet:any ,idPedido:any){
    const alert = await this.alertController.create({
      header: 'Eliminar linea!',
      message: '¿Estas <strong>seguro  de eliminar ' + nombreCategoria + ' ' +  ancho  + ' x ' + largo +  ' </strong> ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-success',
          handler: () => {
            return;
          }
        }, {
          text: 'Eliminar',
          cssClass: 'btn-danger',
          handler: () => {
            // console.log(idDetalle, cantidadM , cantidadE  , idPalet, idPedido);
          //  acepto los validación
         this._ped.eliminarEntrada(idDetalle , cantidadM , idPalet , idPedido)
         .subscribe(()=>{
           
          this.verPedidoAlbaran(this.idPedido);
          this.borrado=true;
         })
         }
        }
      ]
    });
  
    await alert.present();
  this.idDetalle = idDetalle;
  }

  aceptar(idPedido:any){
    
    this._ped.getValidadosById(idPedido)
    .subscribe(res=>{
       
       if (res >= 1 ) {
         alert('Falta confirmar campos..');
       }else{
         const msj = 'Confirmando albarán....'
        this.toast.presentLoadimensajeng(msj);
        this._ped.confirmarAlbaranApp(idPedido)
        .subscribe(res=>{
          if (res == 'success') {
            this.volver();
          }else{
            alert('no se ha podido confirmar');
          }
        })
       }
      
    })
  }


  recuperar(idDetalle:any,idPalet:any ,idPedido:any,cantidad:any){
  this.idPedido =idPedido;
   this._ped.quitarEliminado(idDetalle,idPalet ,idPedido,cantidad)
   .subscribe(resp=>{
     if (resp == 'success') {
       const msj = 'Restableciendo linea....'
       this.toast.presentLoadimensajeng(msj);
       this.verPedidoAlbaran(this.idPedido);
       this.borrado=true;
     } else {
       alert('no se ha podido recuperar la linea..');
     }
   })
  }

   
  totales:any;
  total:number=0;
  getTotales(){
    this._ped.getTotalesPedidoRealizados(this.idPedido)
    .subscribe(res=>{
   this.totales = res;

   
   this._ped.getTotalPedidoRealizado(this.idPedido)
   .subscribe(resp=>{
     this.total =resp;
    //  this._ped.totalEuros(this.idPedido)
    //  .subscribe(data=>{
    //    this.euros = data;
    //  })  
     
   })
    })
  }



}
