import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-write-and-post',
  templateUrl: './write-and-post.page.html',
  styleUrls: ['./write-and-post.page.scss'],
})
export class WriteAndPostPage implements OnInit,OnDestroy {
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any = '';
  bldata: any;
  audioUrl:any;
  public fileString: any="";

  ticketCredential:any = {};
  base64Test:any;

  constructor(private api: DataService, private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer, private router: Router,) 
    {
      this.fileString;
      this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      // console.log(data.blob)
      this.bldata=data.blob
     
     // this.blobUrl ='blob:http://192.168.5.13:8012/wwwroot\\UploadedFiles\\blob';
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)  
      );
      // console.log('pro checko ',data)
      //  console.log('pro check1 ',data.blob)
      //  console.log('pro check2 ',this.teste.blob)
      //  console.log('pro check3 ',this.blobUrl)
      //this.saveAsBase64String();

    });

  }
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
      // console.log('from start',this.blobUrl)
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
      // console.log('blobUrlFrom stop method',this.blobUrl)
        //this.saveAsBase64String()
      
    }
    
  }

  clearRecordedData() {
    this.teste.blob=[]
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const audioChunks:any =[];
    const url = window.URL.createObjectURL(this.teste.blob);
    // console.log('url',url)
    const reader = new FileReader();
    reader.readAsDataURL(this.teste.blob);
    // console.log('one more teste',this.teste.blob)
    reader.onloadend = function() {
      var base64data = reader.result;
      // console.log('string base 64',base64data);
    }
  //  audioChunks.push(url)
  //  console.log('audio',audioChunks)
   // const audioBlob = new Blob(audioChunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }

  storeInGlobal(data:any){
    this.audioUrl=data;
    // console.log('store',this.audioUrl)
  }

  ngOnInit(): void {   
  }

  imageFileBase:any;
  saveAsBase64String(){
   // const url = window.URL.createObjectURL(this.teste.blob);
    // console.log('url',url)
    const reader = new FileReader();
    // reader.readAsDataURL(this.teste.blob);
    reader.readAsDataURL(this.imageFile[0]);
    this.imageFileBase = reader.result
    // console.log('image url',this.imageFileBase)
    reader.onloadend = (e) => {
      // console.log(reader.result);
      const file = reader.result as string;
      // console.log('p',file);
      this.fileString = file;
      // console.log('p1',this.fileString);
   };
  }

  togglecheckbox: any;

  // for files

  imageFile: File[] = [];
  onSelect(event: any) {
    this.imageFile.push(event.target.files[0]);
    if(this.imageFile.length>0){
      this.saveAsBase64String()
    }
    //this.imageFile.push(this.teste.blob);
    
    // console.log(this.imageFile[0]);
  }

  onComplainPost(complainForm: NgForm) {    
    const formData = new FormData();

    // formData.append('imageFile', this.imageFile[0]);
    formData.append('ImageFile', this.fileString);
    formData.append('AudioFile', this.teste.blob);
   // formData.append('audioFIle', this.fileString);
    console.log('img file string',this.fileString);
    
    formData.append('Complain', complainForm.value.Complain);
    formData.append('CompanyName', complainForm.value.CompanyName);
    formData.append('CompanyAddress', complainForm.value.CompanyAddress);
    formData.append('SendAnonymously', complainForm.value.SendAnonymously);
    formData.append('YourName', complainForm.value.YourName);
    formData.append('PhoneNumber', complainForm.value.PhoneNumber);
    formData.append('ALreadyTried', complainForm.value.ALreadyTried);

    this.api.postSuggection(formData).subscribe(res => {
      // console.log('from back end')
      console.log('post response',res);
      this.fileString = '';
      
      if (res.success === true && res.statusCode === 200) {
        this.api.generatedTicket = res.data;
      } else {
        // alert(res.message);
        // this.toastr.warning(res.message, 'Warning!');
      }
    },
     error => {
      console.log(error)
      // this.toastr.warning('Oops! Something went wrong.', 'Server Error!')
    }
    )
  }

  // for file select

}
