import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../shared/user.model';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  // POST
  register(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': '[insert JWT token here]'
      })
    };
    this.http.post(`${environment.API_URL}/users`, user, httpOptions)
        .subscribe((res: HttpResponse<any>) => {
          this.router.navigate(['/login']);
        }, error => console.log(new Error(error.message)));
  }
}
