import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../../shared/okta.auth.wrapper';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../../../app/app.module';

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
    if (this.oauthService.hasValidIdToken() && this.router.url !== '/') { // force firefox to redirect from login page and reload page
      platformBrowserDynamic().bootstrapModule(AppModule) //damn ugly workaround
      .catch(err => console.error(err));
      this.router.navigate(["./media/management"]);
      console.log('forced redirect to home and reload page');
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
}
