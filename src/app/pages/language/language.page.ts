import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  lang:any;
  // language variables
  english = 'en';
  bengali = 'bengali';
  viet = 'viet';
  cambodian = 'cambodian';

  constructor(private router: Router) { }

  ngOnInit() {
    this.lang=localStorage.getItem('lang')||'en';
  }

  selectLanguage(e: any) {
    localStorage.clear()
    localStorage.setItem('lang', e)
    // console.log('lang', e);
    this.router.navigate(['home'])
  .then(() => {
    window.location.reload();
  });
  }

  // languageSelect() {
  //   this.router.navigate(['home'])
  // .then(() => {
  //   window.location.reload();
  // });
  // }

}
