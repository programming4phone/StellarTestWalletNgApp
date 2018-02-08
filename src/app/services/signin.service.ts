import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable()
export class SigninService {

  private idToken: any;
  private profileId: any;
  private profileName: any;
  private profileImageUrl: any;
  private profileEmail: any;
  private authenticated: boolean;

  constructor(private router: Router) { }

  public signOut() {
    // reinitialize all signin related variables, leave no trace!
    this.authenticated = false;
    this.idToken = '';
    this.profileName = '';
    this.profileImageUrl = '';
    this.profileEmail = '';
    this.router.navigate(['home']); // must be done first otherwise tabs do not render properly
    const auth2: any = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }

  public getIdToken(): any {
    return this.idToken;
  }

  public setIdToken(idToken: any) {
    this.idToken = idToken;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public setAuthenticated(authenticated: any) {
    this.authenticated = authenticated;
  }

  public getProfileEmail(): any {
    return this.profileEmail;
  }

  public setProfileEmail(profileEmail: any) {
    this.profileEmail = profileEmail;
  }

  public getProfileImageUrl(): any {
    return this.profileImageUrl;
  }

  public setProfileImageUrl(profileImageUrl: any) {
    this.profileImageUrl = profileImageUrl;
  }

  public getProfileName(): any {
    return this.profileName;
  }

  public setProfileName(profileName: any) {
    this.profileName = profileName;
  }

  public getProfileId(): any {
    return this.profileId;
  }

  public setProfileId(profileId: any) {
    this.profileId = profileId;
  }

}
