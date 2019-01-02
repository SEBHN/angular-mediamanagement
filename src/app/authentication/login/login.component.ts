import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../../shared/okta.auth.wrapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginError: string;

  constructor(private oauthService: OAuthService,
    private oktaAuthWrapper: OktaAuthWrapper, private router: Router) {
  }


  ngOnInit() {
    if (this.oauthService.hasValidIdToken() && this.router.url !== '/') { // force firefox to redirect from login page
      this.router.navigate(['/']);
      console.log('forced redirect to home');
    }
  }

  login() {
    this.oktaAuthWrapper.login(this.email, this.password)
      .catch(err => {
        console.error('error logging in', err);
        const error = err as Error; // TODO: Check if AuthApiError can be imported from '@okta/okta-auth-js'
        this.loginError = error.message;
      });
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }
}
