import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../../shared/okta.auth.wrapper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(private oauthService: OAuthService,
    private oktaAuthWrapper: OktaAuthWrapper) {
  }


  ngOnInit() {
  }

  login() {
    this.oktaAuthWrapper.login(this.email, this.password)
      .catch(err => console.error('error logging in', err));
  }



  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

}
