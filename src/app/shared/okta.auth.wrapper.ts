import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable, NgZone } from '@angular/core';
import * as OktaAuth from '@okta/okta-auth-js';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OktaAuthWrapper {

  private authClient: any;

  constructor(private oauthService: OAuthService, private router: Router, private zone: NgZone) {
    this.authClient = new OktaAuth({
      url: environment.OKTA_URL,
      issuer: 'default'
    });
  }

  login(username: string, password: string): Promise<any> {
    return this.oauthService.createAndSaveNonce().then(nonce => {
      return this.authClient.signIn({
        username: username,
        password: password
      }).then((response) => {
        if (response.status === 'SUCCESS') {
          return this.authClient.token.getWithoutPrompt({
            clientId: this.oauthService.clientId,
            responseType: ['id_token', 'token'],
            scopes: ['openid', 'profile', 'email'],
            sessionToken: response.sessionToken,
            nonce: nonce,
            redirectUri: window.location.origin
          })
            .then((tokens) => {
              const idToken = tokens[0].idToken;
              const accessToken = tokens[1].accessToken;
              const keyValuePair = `#id_token=${encodeURIComponent(idToken)}&access_token=${encodeURIComponent(accessToken)}`;
              return this.oauthService.tryLogin({
                customHashFragment: keyValuePair,
                disableOAuth2StateCheck: true
              })
              .then((isLoginSuccessful) => {
                if (isLoginSuccessful) {
                  this.zone.run(() => this.router.navigate(['/media/management'])); // see https://github.com/angular/angular/issues/25837
                } else {
                  console.error('Login was not successful!');
                }
              });
            });
        } else {
          return Promise.reject('We cannot handle the ' + response.status + ' status');
        }
      });
    });
  }
}
