import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private api: DataService, private toastController: ToastController, private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onLogin(userLogin: NgForm):void {
    // console.log(userLogin.value);
    if (userLogin.valid) {
      this.auth.login(userLogin.value).subscribe(async res => {
        if (res.success === true && res.statusCode === 200) {
          this.router.navigate(['user-dashboard']);
        // for toaster notification
        const toast = await this.toastController.create({
          message: res.message,
          duration: 1500,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });
        await toast.present();
        } else {
          // for toaster notification
        const toast = await this.toastController.create({
          message: res.message,
          duration: 1500,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });
        await toast.present();
        }
      }, async error => {
        // for toaster notification
        const toast = await this.toastController.create({
          message: 'Server error!',
          duration: 1500,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });
        await toast.present();
      }
      )
    }
  }
  // end user login


  // navigate route
  goBack() {
    this.router.navigate(['home']);
  }

}
