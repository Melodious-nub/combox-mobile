import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private api: DataService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  onLogin(userLogin: NgForm): void {
    // console.log(userLogin.value);
    this.api.login(userLogin.value).subscribe(async res => {
      if (res.success === true && res.statusCode === 200) {
        this.router.navigate(['user-dashboard']);
        // for toaster notification
        const toast = await this.toastController.create({
          message: res.message,
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });
        await toast.present();
        // for toaster notification
      } else {
        // this.toastr.warning(res.message, 'Warning!');
        // for toaster notification
        const toast = await this.toastController.create({
          message: res.message,
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });
        await toast.present();
        // for toaster notification
      }
    }, async error => {
      // for toaster notification
      const toast = await this.toastController.create({
        message: 'Oops,Server error.',
        duration: 3000,
        cssClass: 'custom-toast',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ],
      });
      await toast.present();
      // for toaster notification
    }
    )
  }
  // end user login

}
