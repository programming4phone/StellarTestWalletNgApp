import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SigninService } from '../services/signin.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private signinService: SigninService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.signinService.isAuthenticated();
  }
}
