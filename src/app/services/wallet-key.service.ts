import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WalletKeys } from '../entities/wallet-keys.model';
import { SigninService } from './signin.service';

@Injectable()
export class WalletKeyService {

  constructor(private http: HttpClient, private signinService: SigninService) { }

  getKeys(accountNumber: string): Observable<WalletKeys> {
    const url = `${environment.webserviceHostUrl}/wallet/key/${accountNumber}`;
    const authHeader = `Bearer ${this.signinService.getIdToken()}`;
    console.log('authHeader: ' + authHeader);
    return this.http.get<WalletKeys>(url, {
          headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authHeader)
      });
  }

  removeKeys(accountNumber: string): Observable<any> {
    const url = `${environment.webserviceHostUrl}/wallet/key/delete/${accountNumber}`;
    const authHeader = `Bearer ${this.signinService.getIdToken()}`;
    console.log('authHeader: ' + authHeader);
    return this.http.delete(url, {
      headers: new HttpHeaders().set('Authorization', authHeader)
    });
  }

  saveKeys(accountId: string, secretSeed: string): Observable<any> {
    console.log('saveKeys ');
    console.log('accountId: ' + accountId);
    console.log('secretSeed: ' + secretSeed);
    const url = `${environment.webserviceHostUrl}/wallet/key`;
    const walletKeys: WalletKeys = new WalletKeys(accountId, secretSeed);
    console.log('walletKeys: ' + walletKeys);
    console.log('walletKeys.accountNumber: ' + walletKeys.accountNumber);
    console.log('walletKeys.secretSeed: ' + walletKeys.secretSeed);
    const authHeader = `Bearer ${this.signinService.getIdToken()}`;
    console.log('authHeader: ' + authHeader);
    return this.http
      .put(url, walletKeys, {
          headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authHeader)
      });
  }

  getTestAccount(accountNumber: string): Observable<any> {
    const url = `${environment.stellarHorizonUrl}/friendbot?addr=${accountNumber}`;
    const authHeader = `Bearer ${this.signinService.getIdToken()}`;
    console.log('authHeader: ' + authHeader);
    return this.http.get<any>(url, {
          headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', authHeader)
      });
  }

}
