import { Component, OnInit } from '@angular/core';
import { AssetBalance } from '../entities/asset-balance.model';
import { Message } from 'primeng/components/common/api';
import { environment } from '../../environments/environment';

const StellarSdk = require('stellar-sdk');

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {

  public inpAccountId: string;
  public msgs: Message[] = [];
  public showPanel: boolean;
  public showSpinner: boolean;
  public assetBalances: AssetBalance[];

  constructor() { }

  ngOnInit() {
    this.showPanel = false;
    this.showSpinner = false;
    console.log(this);
  }

  getBalances() {
    this.showPanel = false;
    this.showSpinner = true;
    console.log('getBalances ');

    console.log('inpAccountId: ' + this.inpAccountId);
    const stellarHorizonUrl = `${environment.stellarHorizonUrl}`;
    const server: any = new StellarSdk.Server(stellarHorizonUrl);

    // This needs a try/catch as the input account id can be garbage
    let sourceKeypair: any;
    try {
      sourceKeypair = StellarSdk.Keypair.fromPublicKey(this.inpAccountId);

      server.loadAccount(sourceKeypair.publicKey())
      .then((account) => {
        console.log('Balances for account: ' + sourceKeypair.publicKey());
        this.assetBalances = [];
        account.balances.forEach((balance) => {
          console.log('balance: ' + balance.toString());
          const assetBalance: AssetBalance = new AssetBalance(balance.asset_type, balance.asset_code, balance.balance);
          console.log('Type:', balance.asset_type, ', Code:', balance.asset_code, ', Balance:', balance.balance);
          this.assetBalances.push(assetBalance);
        });
        this.showSpinner = false;
        this.showPanel = true;
      })
      .catch((err) => {
        console.log(err);
        this.handleError(err);
      });
    } catch (err) {
      console.log(err);
      this.handleError('Invalid Account ID.');
    }
  }

  private handleError(errormsg: any) {
    console.log(errormsg);
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Account Balance', detail: errormsg });
    this.showSpinner = false;
    this.showPanel = false;
  }

}
