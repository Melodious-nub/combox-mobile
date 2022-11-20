import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    console.log('hello logout');
  }

  // for modal
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

    // for scrollbar auto bottom
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    ngAfterViewChecked() {        
      this.scrollToBottom();        
    } 
  
    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

}
