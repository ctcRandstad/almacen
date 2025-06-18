import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, Platform } from '@ionic/angular';

import { MaterialService } from 'src/app/Services/material/material.service';
import { ToastService } from 'src/app/Services/toast.service';
import { VariosService } from 'src/app/Services/varios/varios.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {

  constructor( 
    private rutaActiva: ActivatedRoute,
    private _material:MaterialService,
    private ruta:Router,
    private toast:ToastService,
    public alertController: AlertController,
    public plt:Platform,
    private _varios:VariosService,
 
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
     

  }




  
  fecha:any;
  largo!:number;
  movil:boolean=false;
  ionViewWillEnter(){
    let msj:string = 'Cargando pedidos..';
    this.toast.cargando(msj);
    this.largo =this.plt.width();
    if (this.largo <= 600) {
      this.movil = true;
    } else {
      this.movil = false;
    }
    setInterval(()=>{
      this.getPedidosRealizados();
    },1500)
    let f = new Date();
// document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
this.fecha = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();


    
  }

  data:any=[];
  noPedido!:boolean;
  getPedidosRealizados(){
  
    this._varios.getPedidoRealizados(this.idMaterial).subscribe(res=>{ 
    if (res != 'error') {
      this.data=res;
      this.noPedido = false;
    }else{
      this.data=[];
      this.noPedido = true;
    }
      
      })
  }


palet!: number;
cantPaletCajas(idDetalle: any, palet: any) {
  const cantidad = parseInt(palet.value, 10);

  if (isNaN(cantidad) || cantidad < 0) {
    this.toast.presentLoadimensajeng('Cantidad inválida.');
    return;
  }

  this._varios.modeficaPalet(idDetalle, cantidad, this.idMaterial)
    .subscribe({
      next: (resp: any) => {
        if (resp.status === 'success') {
          this.toast.presentLoadimensajeng(`Cambio realizado: se imprimirán ${cantidad} etiquetas`);
        } else {
          this.toast.presentLoadimensajeng('Hubo un problema al guardar los cambios.');
          this.hide();
        }
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.toast.presentLoadimensajeng('Error del servidor.');
        this.hide();
      }
    });
}



  m:boolean=false;
  boton:boolean=false;
  pRealizado:any= [];
  idPedido!:number;
  ve:boolean=false;
  paraF:any;
  fech:any;
  idAlbaran:any;
  razonSocial!:string;
  verPedido(idPedido:any,razonSocial:any){
  this.razonSocial=  razonSocial
   this.idPedido = idPedido;
   this._varios.getPediRealizadoById(idPedido, this.idMaterial)
   .subscribe(res=>{
     this.ve =true;
     this.pRealizado = res; 
    
     for (let i = 0; i < this.pRealizado.length; i++) {
      this.fech = this.pRealizado[0].fechaPedido;
      this.paraF = this.pRealizado[0].fechaEntrega;
     }
    //  frame.show();
     this.getTotales();
   })
  }

  hide(){
    this.ve=false;
    this.getPedidosRealizados();
   
  }


  totales:any=[];
  total:number=0;
  getTotales(){
   this._varios.getTotalPedidoRealizado(this.idPedido , this.idMaterial)
   .subscribe(resp=>{
     this.total =resp;
   })
  
  }

btnTabs!: boolean;

async validadL(
  descripcion: any,
  cantidad: any,
  cantidadM: any,
  idPedido: any,
  codigoSap: any,
  idDetalle: any,
  palet: any,
  idProveedor: any,
  stockF: any
) {
  this.btnTabs = true;

  const alert = await this.alertController.create({
    header: 'Validar línea',
    mode: 'ios',
    message: `⚠️ ¿ESTÁS SEGURO de modificar "${descripcion}" con código ${codigoSap}?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'btn-danger',
        handler: () => {
          this.btnTabs = false;
        }
      },
      {
        text: 'Validar',
        cssClass: 'btn-success',
        handler: () => {
          this.toast.presentLoadimensajeng('Validando referencia...');

          this._varios
            .validarEntrada(idDetalle, cantidad, cantidadM, codigoSap, idPedido, palet, this.idMaterial, idProveedor, stockF)
            .subscribe({
              next: (res: any) => {
                console.log(res);
                
                this.btnTabs = false;

                if (res.status === 'success') {
                  this.toast.presentLoadimensajeng('Referencia validada con éxito');
                  this.verPedido(idPedido, this.razonSocial);
                } else {
                  this.toast.presentLoadimensajeng('No se pudo validar la línea.');
                }
              },
              error: (err) => {
                console.error('Error en la validación', err);
                this.toast.presentLoadimensajeng('Error del servidor');
                this.btnTabs = false;
              }
            });
        }
      }
    ]
  });

  await alert.present();
}


 alertaAlert(con:any){
  alert(con)
 }

modi: boolean = false;

async modificarC(
  descripcion: string,
  cantidad: number,
  cantidadM: number,
  idPedido: number,
  codigoSap: string,
  idDetalle: number
): Promise<void> {

  const alert = await this.alertController.create({
    header: 'Modificar línea',
    mode: 'ios',
    cssClass: 'custom-alert',
    message: `⚠️ ¿ESTÁS SEGURO de modificar "${descripcion}" con código ${codigoSap}?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'text-danger',
        handler: () => {
          this.modi = false;
        }
      },
      {
        text: 'Modificar',
        cssClass: 'text-success',
        handler: () => {
          this.modi = true;
          this.modificarCantidadCajas(idDetalle, cantidad, cantidadM, codigoSap, idPedido);
        }
      }
    ]
  });

  await alert.present();
}




codigoSap:any;
async modificarCantidadCajas(idDetalle: any, cantidad: any, cantidadM: any, codigoSap: any, idPedido: any) {
  const alert = await this.alertController.create({
    header: 'Nueva Cantidad',
    mode: 'ios',
    cssClass: 'custom-alert',
    inputs: [
      {
        name: 'cant',
        type: 'number',
        placeholder: 'Cantidad entregada',
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelado');
        }
      },
      {
        text: 'Aceptar',
        handler: (data) => {
          const nuevaCantidad = Number(data.cant);
          
          if (!data.cant || isNaN(nuevaCantidad) || nuevaCantidad < 0) {
            this.alerta(); // Asegúrate de tener un método `alerta()` para mostrar error
            return false; // Evita cerrar el modal si hay error
          }

          this._varios.modificarEntrada(idDetalle, nuevaCantidad, this.idMaterial)
            .subscribe(res => {
             if (res.status === 'success') {
              this.toast.presentLoadimensajeng(res.message);
              this.verPedido(idPedido, this.razonSocial);
            } else {
              this.toast.presentLoadimensajeng(res.message);
            }
            });

          return true; // Cierra el alert correctamente
        }
      }
    ]
  });

  await alert.present();
}

volver(){
  // this.verPedidoAlbaran(this.idPedido);
    this.ve = false;
    this.getPedidosRealizados();
  }

  alerta(){
    alert('La cantidad tiene que ser mayor o igual a CERO');
  }



aceptar(idPedido: number): void {
  this._varios.getValidadosById(idPedido, this.idMaterial).subscribe({
    next: (res: number) => {
      if (res >= 1) {
        alert('⚠️ Aún hay líneas sin confirmar.');
      } else {
        const mensaje = 'Confirmando albarán...';
        this.toast.presentLoadimensajeng(mensaje);

        this._varios.confirmarAlbaranApp(idPedido, this.idMaterial).subscribe({
          next: (res: any) => {
            if (res === 'success') {
              this.ruta.navigate(['ubicarM', this.idMaterial]);
            } else {
              alert('❌ No se ha podido confirmar el albarán.');
            }
          },
          error: () => {
            alert('❌ Error en el servidor al confirmar albarán.');
          }
        });
      }
    },
    error: () => {
      alert('❌ Error al verificar líneas validadas.');
    }
  });
}



doRefresh(event:any) {

  setTimeout(() => {
    SplashScreen.show();
    location.reload();
    event.target.complete();
  }, 2000);
}


}
