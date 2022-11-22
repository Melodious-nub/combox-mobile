import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  generatedTicket:any = {};

  ticketIDUser:any;

  postSuggection(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Suggection', data)
  }

  login(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Tickets/mark-complete', data);
  }

  getSuggection(data:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Suggection'+'?ticketNumber=' + data)
  }

  postReview(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Review', data)
  }

  getReview(data:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Review'+'?ticketNumber=' + data)
  }


}
