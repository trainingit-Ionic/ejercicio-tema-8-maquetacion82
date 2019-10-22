import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  flash: boolean;
  constructor(private flashlight: Flashlight, public platform: Platform, public toastController: ToastController) {
    this.platform.ready().then(() => {
      this.platform.platforms().filter((item) => {
        if ((item === 'mobile') || (item === 'tablet')) {
          if (this.flashlight.available()) {
            this.flash = true;
          } else {
            this.flash = false;
            this.showToast();
          }
        } else {
          this.flash = false;
          this.showToast();
        }
      });
      this.platform.pause.subscribe(
        () => this.flashlight.switchOff()
      );
      this.platform.backButton.subscribe(
        () => this.flashlight.switchOff()
      );
    });
  }

  flashButton() {
    if (this.flashlight.isSwitchedOn()) {
      this.flashlight.switchOff();
    } else {
      this.flashlight.switchOn();
    }
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'El dispositivo no dispone de flash',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'top',
    });
    toast.present();
  }
}
