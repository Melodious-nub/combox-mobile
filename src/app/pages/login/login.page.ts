import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private api: DataService) { }

  ngOnInit() {
  }

  onLogin(userLogin: NgForm):void {
    console.log(userLogin.value);
      this.api.login(userLogin.value).subscribe(res => {
        console.log(res);
    })
  }
  // end user login

}
