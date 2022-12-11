import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http: HttpClient) { }

  // Here I set token check in LocalStorage
  // In live project I've to check if tocken is valid or not, based on i will return true or false

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setTicketId(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getTicketId(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
     localStorage.clear();
    this.router.navigate(['admin-login']);
  }

  logoutTicket() {
    localStorage.removeItem('token');
     localStorage.clear();
    this.router.navigate(['login']);
  }

  token:any;
  // userLogin auth
  login(data: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl+'/api/v1/UserLogIn', data).pipe(map((res: any) => {
        // this.currentUser = res;
        if (res.success === true && res.statusCode === 200) {
          this.token=res.data;
          localStorage.removeItem('token');
          this.setTicketId(this.token);
          return res;
        } else {
          return res;
        }
      })
    );
  }


}
