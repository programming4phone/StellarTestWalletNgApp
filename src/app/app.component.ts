import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { MenuItem } from 'primeng/components/common/menuitem';
import { environment } from '../environments/environment';
import { SigninService } from './services/signin.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public items: MenuItem[];
  public title = 'Stellar Wallet';
  public signinWidth = '300';
  public clid = `${environment.clientId}`;
  public auth2: any;
  _profileName: any;
  _profileImageUrl: any;
  _profileEmail: any;

  constructor(private signinService: SigninService, private router: Router, private ngZone: NgZone) {
    // The onSignIn method is not executed without this code
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
  }

  ngOnInit(): void {
    this.signinService.setAuthenticated(false);

    this.items = [
             {label: 'Home', icon: 'fa-home', routerLink: ['/home']},
             {label: 'Create Test Account', icon: 'fa-edit', routerLink: ['/createAccount']},
             {label: 'Import Account', icon: 'fa-download', routerLink: ['/importAccount']},
             {label: 'Account Balance', icon: 'fa-dollar', routerLink: ['/accountBalance']},
             {label: 'Send Money', icon: 'fa-envelope', routerLink: ['/sendMoney']},
             {label: 'Account Transactions', icon: 'fa-columns', routerLink: ['/transactions']}
           ];
  }

  ngAfterViewInit(): void {
    console.log('AppComponent::ngAfterViewInit');
    // this avoids meta tag named google-signin-client_id in index.html
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clid
      });
    });
  }

  public onSignIn = (googleUser) => {
    this.router.navigate(['home']); // must be done first otherwise tabs do not render properly
    console.log(this);
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('id_token: ' + googleUser.getAuthResponse().id_token);

    this.signinService.setIdToken(googleUser.getAuthResponse().id_token);
    this.signinService.setProfileId(googleUser.getId());
    this.signinService.setProfileName(profile.getName());
    this.signinService.setProfileImageUrl(profile.getImageUrl());
    this.signinService.setProfileEmail( profile.getEmail());
    this.signinService.setAuthenticated(true);

    this._profileName = profile.getName();
    this._profileImageUrl = profile.getImageUrl();
    this._profileEmail = profile.getEmail();
    console.log(this);
  }

  public signOut() {
    this.signinService.signOut();
  }
}
