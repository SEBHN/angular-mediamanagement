import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../shared/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  // POST
  register(user: User) {
    this.http.post(`${environment.API_URL}/users/register`, JSON.stringify(user), {
      observe: 'response',
      headers: {
          'Content-Type': 'application/json'
      }
    }).subscribe((res: HttpResponse<any>) => {
          // redirect user to login if registration was successful
          if (res.ok) {
            this.router.navigate(['/login']);
          } else {
            console.error('Error while register got status code: ' + res.status);
            // TODO: show alert with error?
          }
        }, (error) => {
          const causedByError = error.error.errorSummary; // TODO: display this error
          console.log(new Error(error));
          console.error('Error while register: ' + causedByError);
        });
  }
}
