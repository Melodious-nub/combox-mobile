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

  getTickets(PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Tickets'+'?PageNumber='+ PageNumber +'&PageSize='+ PageSize);
  }

  postSuggection(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Suggection', data)
  }

  getSuggection(data:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Suggection'+'?ticketNumber=' + data)
  }

  postReview(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Review', data)
  }

  getReviewWithPagination(ticketNumber:any,PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Review'+'?ticketNumber=' + ticketNumber + '&PageNumber='+ PageNumber +'&PageSize='+ PageSize )
  }

  getReview(data:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Review'+'?ticketNumber='+data)
  }

  markComplete(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Tickets/mark-complete', data);
  }

  getAllTicekts() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Dashboard/all-tickets');
  }

  getclosedTickets() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Dashboard/closed-tickets');
  }

  getInprogressTickets() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Dashboard/inprogress-tickets');
  }

  getOpenTickets() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Dashboard/open-tickets');
  }

  postFeedback(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Feedback', data);
  }

  // for notification
  getNotificaton(PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Notification'+'?PageNumber='+ PageNumber +'&PageSize='+ PageSize);
  }
  
  clearNotification(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Notification/clear-notifications', null);
  }


}
