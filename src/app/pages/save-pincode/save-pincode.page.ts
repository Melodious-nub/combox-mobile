import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-save-pincode',
  templateUrl: './save-pincode.page.html',
  styleUrls: ['./save-pincode.page.scss'],
})
export class SavePincodePage implements OnInit {
  // storing data from other component
  ticketCredNum:any = '';
  ticketCredPass:any = '';
  // this is for copy clipboard
  totalTicketInfo:any;

  constructor(private api: DataService) { }

  ngOnInit(): void {
    // getting data via service
    this.ticketCredNum = this.api.generatedTicket.ticketNumber;
    this.ticketCredPass = this.api.generatedTicket.password;
    // for coppying to clipboard
    this.totalTicketInfo = 'Ticket Number: ' + JSON.stringify(this.api.generatedTicket.ticketNumber) + '\n' + 'Password: ' + JSON.stringify(this.api.generatedTicket.password);
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/instruction-voice.mp3";
    audio.load();
    audio.play();
  }

}
