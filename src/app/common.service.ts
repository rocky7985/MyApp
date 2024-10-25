import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });

    await toast.present();
  }

  async presentAlert(header: string, message: string, buttons: any[] = ['OK'], cssClass: string = '') {
    const alert = await this.alertController.create({
      header,
      message,
      cssClass,
      buttons,
    });
    await alert.present();
  }

}
