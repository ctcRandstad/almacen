import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,

  
    ) { }



  async presentToast(mensaje:any) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }


    // cargango....
    async presentLoadimensajeng(mensaje:any) {
      const loading = await this.loadingController.create({
        message: mensaje,
        duration: 3000,
        mode:"ios"
      });
      await loading.present();
  
    }

     // cargango....
     async cargando(mensaje:any) {
      const loading = await this.loadingController.create({
        message: mensaje,
        duration: 700
      });
      await loading.present();
  
    }

    async presentAlert(msj:any, sub:any) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: sub,
        message: msj,
        buttons: ['OK'],
        mode:"ios"

      });
      await alert.present();
    }
  

    
    async presentAlertError(msj:any, sub:any,status:any) {
     
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: sub,
        message: msj,
        buttons: [
          {
            text: 'Verificar',
            handler: () => {
              // this.splashScreen.show();
            //  location.reload();
            },

          }
        ],
        
        mode:"ios",

      });
      await alert.present();
      // const { role } = await alert.onDidDismiss();
    }



}
