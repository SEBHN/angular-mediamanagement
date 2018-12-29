import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../../shared/okta.auth.wrapper';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginError: string;
  oktaRegisterLink: string;

  constructor(private oauthService: OAuthService,
    private oktaAuthWrapper: OktaAuthWrapper) {
      this.oktaRegisterLink = environment.OKTA_URL + '/signin/register';
  }


  ngOnInit() {
  }

  login() {
    this.oktaAuthWrapper.login(this.email, this.password)
      .catch(err => {
        console.error('error logging in', err);
        const error = err as Error; // TODO: Check if AuthApiError can be imported from '@okta/okta-auth-js'
        this.loginError = error.message;
      });
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
