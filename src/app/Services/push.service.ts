import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import OneSignal from 'onesignal-cordova-plugin';


@Injectable({
  providedIn: 'root'
})
export class PushService {
  
  constructor(
    private ruta : Router,
    ) { }

    configuracionInicial(){
      // OneSignal.Debug.setLogLevel(6);
      OneSignal.initialize("8de3ef54-c039-4ce2-9b1d-e7b732d54d61");
      // OneSignal.startInit('8de3ef54-c039-4ce2-9b1d-e7b732d54d61', '690998887996');
      OneSignal.Notifications.addEventListener('click', async (e) => {
        let clickData = await e.notification;
        console.log("Notification Clicked : " + clickData);
        this.ruta.navigate(['./comandas']);
      })
  
      OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
        console.log("Notification permission granted " + success);
      })

}

}
