import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { DataService } from 'src/app/services/data.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit,OnDestroy,AfterViewChecked {

  ticketList:any = [];
  ticketData:any = {};
  ticketId:any = 'Ticket id';
  connection:any;
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any = '';
  bldata: any;
  audioUrl:any;
  public fileString: any = '';
  reviewData:any = [];
  isClosed:boolean = false;

  ticketCredential:any = {};
  base64Test:any;

  constructor(private api: DataService, private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer, private router: Router,private auth: AuthService, private toastController: ToastController,) { 
      this.fileString;
      this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.bldata=data.blob
     
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)  
      );
    });
    }

    startRecording() {
      if (!this.isRecording) {
        this.isRecording = true;
        this.audioRecordingService.startRecording();
      }
    }
  
    abortRecording() {
      if (this.isRecording) {
        this.isRecording = false;
        this.audioRecordingService.abortRecording();
      }
    }

    stopRecording() {
      if (this.isRecording) {
        this.audioRecordingService.stopRecording();
        this.isRecording = false;
      }
    }
    

    clearRecordedData() {
      this.teste.blob=[]
      console.log('i am clearrecord',this.teste.blob)
      this.blobUrl = '';
    }

    ngOnDestroy(): void {
      this.abortRecording();
    }

    download(): void {
      const audioChunks:any =[];
      const url = window.URL.createObjectURL(this.teste.blob);
      const reader = new FileReader();
      reader.readAsDataURL(this.teste.blob);
      reader.onloadend = function() {
        // var base64data = reader.result;
      }
      const link = document.createElement("a");
      link.href = url;
      link.download = this.teste.title;
      link.click();
    }

    storeInGlobal(data:any){
      this.audioUrl=data;
    }
  

  ngOnInit(): void {
    this.ticketData == this.fetchSuggection();
     //connection
     this.connection = new signalR.HubConnectionBuilder()  
     .configureLogging(signalR.LogLevel.Information)  
     .withUrl(environment.baseUrl + '/notify')  
     .build();
     //start
     this.connection.start().then(function () {  
      //  console.log(' Connected!');  
     }).catch( (err:any) => { 
      setTimeout(() => this.connection.start(),5000); 
      setTimeout(() => this.connection.start(),5000); 
      setTimeout(() => this.connection.start(),5000);
      setTimeout(() => this.connection.start(),5000);
      setTimeout(() => this.connection.start(),5000);
       //return console.error(err.toString());  
     });
  }

  fetchSuggection() {
    this.api.getSuggection(this.auth.getTicketId()).subscribe( res => {
      this.ticketData = res.data;
      if (this.ticketData.ticketStatus !== 2) {
        this.isClosed = false;
        this.ticketId = this.auth.getTicketId();

        this.fetchReview();
        this.connection.on("BroadcastMessage", () => {
          this.fetchReview();  
        });
      } else {
        this.isClosed = true;
        // console.log('else',this.isClosed);
      }
    })
  }

  pageNum: any = 0;
  pageSiz: any = 10;
  fetchReview() {
    this.api.getReviewWithPagination(this.auth.getTicketId(),this.pageNum,this.pageSiz).subscribe(res => {
      this.reviewData = res.data;
    })
  }

  // playAudio(){
  //   let audio = new Audio();
  //   audio.src = "../../../assets/media/audio/instruction-voice.mp3";
  //   audio.load();
  //   audio.play();
  // }

  // for audio


 
  photoURL() {
    if(this.ticketData.imageFile!=null ){
      return this.sanitizer.bypassSecurityTrustUrl(this.ticketData.imageFile);
    }
    return;
  }

  audioURL() {
    if(this.ticketData.voiceMessage!=null){
      return this.sanitizer.bypassSecurityTrustUrl(this.ticketData.voiceMessage);
    }
    return;
  }

  audioFileBase:string='';
  saveAsBase64String(){
       const reader = new FileReader();
       reader.readAsDataURL(this.imageFile[0]);
       const imageUrl = reader.result
       reader.onloadend = (e) => {
         const file = reader.result as string;
         this.fileString = file;
   };
  }


  imageFile: File[] = [];
  onSelect(event: any) {
    this.imageFile.push(event.target.files[0]);
    this.saveAsBase64String();
  }

  // post review form
  onReviewSubmit(reviewForm: NgForm) {
    const formData = new FormData();
    this.ticketId = this.auth.getTicketId();
    if(this.blobUrl){
      this.imageFile.push(this.teste.blob)
      //formData.append('AudioFile', this.teste.blob);
    }
    for(let file in this.imageFile){
      formData.append('AudioFile', this.imageFile[file]);
    }
  //  formData.append('File', this.fileString);
   // formData.append('audioFile', this.teste.blob);
    formData.append('ReviewMessage', reviewForm.value.ReviewMessage);
    formData.append('Reviewer', 'user');
    formData.append('TicketNumber', this.ticketId);
    
    this.api.postReview(formData).subscribe(async res => {
      // console.log(res);
      this.imageFile = [];
      if (res.success === true && res.statusCode === 200) {
        reviewForm.controls['ReviewMessage'].setValue('');
        // this.clearRecordedData();
        this.fileString = '';
        this.pageNum=0;
        this.fetchReview();
        // for toaster notification
        const toast = await this.toastController.create({
          message: res.message,
          duration: 1000,
          position: 'top',
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel',
            }
          ],
        });
        await toast.present();
      } else {
        // for toaster notification
        const toast = await this.toastController.create({
          message: res.message,
          duration: 1000,
          position: 'top',
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
    },
     async error => {
      // for toaster notification
      const toast = await this.toastController.create({
        message: 'Server error!',
        duration: 1000,
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


    // logout
  logout() {
    this.auth.logoutTicket();
    // this.router.navigate(['login']);
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

    // for download image
    downloadImage(data:any) {
      // console.log(data);
      this.showPdf(data);
    }
    openTicketsSort(data:any){
     
    }
  
    showPdf(data:any) {
    const linkSource = data;
    const downloadLink = document.createElement('a');
    const fileName = 'sample.png';
  
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // for infinite scroll
  // onScrollUp() {
  //   console.log("scrolled up!!");
  // }

  // onScrollDown() {
  //   console.log("scrolled down!!");
  // }

  // pageSlice: any;
// paginator new for message
onPageChangeMsg(event: PageEvent) {
  // console.log('paginator', event);
  this.pageNum = event.pageIndex;
  this.pageSiz = event.pageSize;
  this.fetchReview();
}

// for pagination bootstrap
pagination: boolean = true;
onPreviousButtonClick() {
  if (this.pagination == true) {
    this.pageNum++;
  }

  this.fetchReview();
  // console.log(this.reviewData)
  if (this.reviewData.length == 0) {
    this.pageNum--;
    this.pagination == false;
  }
  // console.log('pagNumber:', this.pageNum)

  // if(this.reviewDataCount==0){
  //   console.log("no data")
  //   this.pageNum--;
  // }
}
onNextButtonClick() {
  if (this.pagination == true && this.pageNum >=1) {
    this.pageNum--;
  }

  this.fetchReview(); 
  // console.log(this.reviewData)
  if (this.reviewData.length == 0) {
    this.pageNum++;
    this.pagination == false;
  }
  // console.log('pagNumber:', this.pageNum)
  // if(this.reviewDataCount==0){
  //   console.log("no data")
  //   this.pageNum++;
  // }
}

}
