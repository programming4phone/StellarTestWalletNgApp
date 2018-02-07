import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { WalletKeyService } from '../services/wallet-key.service';
import { SigninService } from '../services/signin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

const CryptoJS = require('crypto-js');
const StellarSdk = require('stellar-sdk');

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {

  public inpPassphrase: string;
  public inpFromAccountId: string;
  public inpToAccountId: string;
  public inpAmount: string;
  public msgs: Message[] = [];
  public showPanel: boolean;
  public showSpinner: boolean;
  public _secretSeed: string;
  public _fromAccountId: string;
  public _toAccountId: string;
  public _amountSent: string;

  constructor(private walletKeyService: WalletKeyService, private signinService: SigninService) { }

  ngOnInit() {
    this.showPanel = false;
    this.showSpinner = false;
    console.log(this);
  }

  sendMoney() {
    this.showPanel = false;
    this.showSpinner = true;
    console.log('sendMoney ');

    // Hash public key and convert to Base64 for transport to key server
    const hashedPublicKey: string = CryptoJS.SHA256(this.inpFromAccountId);
    const hashedBase64PublicKey: string = btoa(hashedPublicKey);
    console.log('hashedPublicKey: ' + hashedPublicKey);
    console.log('hashedBase64PublicKey: ' + hashedBase64PublicKey);

    this.walletKeyService.getKeys(hashedBase64PublicKey).subscribe(
      data => {
        /*
        Secret seed is encrypted and encoded to Base64 when sent to key server.
        So now the reverse must be done, it must be decoded from Base64
        and decrypted.
        */
        const encryptedSeed: string = atob(data.secretSeed);
        const bytes: any = CryptoJS.AES.decrypt(encryptedSeed, this.inpPassphrase);
        this._secretSeed = bytes.toString(CryptoJS.enc.Utf8);
        this.transferFunds();
        // this.showSpinner = false;
        // this.showPanel = true;
      },
      (err: HttpErrorResponse) => {
        let errMsg: string;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          errMsg = `walletKeyService.getKeys webservice error occurred: ${err.error.message}`;
        } else {
         // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong
          if (err.status === 400) {
            errMsg = `Invalid account id or invalid secret seed.`;
          } else if (err.status === 401) {
            // Signin token could not be verified on the key server, so sign out the user.
            // This will retrieve another valid token after signin.
            this.signinService.signOut();
          } else if (err.status === 404) {
            // public key not found on key server, probably because it was not imported yet
            errMsg = `From account id not found. Make sure it has been imported.`;
          } else {
            errMsg = `walletKeyService.saveKeys webservice returned code ${err.status}, body was: ${err.error}`;
          }
        }
        console.log(errMsg);
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Send Money', detail: errMsg });
        this.showSpinner = false;
        this.showPanel = false;
      },
      () => {
          //
      });
  }

  private transferFunds() {
    StellarSdk.Network.useTestNetwork();
    const stellarHorizonUrl = `${environment.stellarHorizonUrl}`;
    const server: any = new StellarSdk.Server(stellarHorizonUrl);
    const sourceKeys: any = StellarSdk.Keypair.fromSecret(this._secretSeed);

    // Transaction will hold a built transaction we can resubmit if the result is unknown.
    let transaction: any;

    // First, check to make sure that the destination account exists.
    // You could skip this, but if the account does not exist, you will be charged
    // the transaction fee when the transaction fails.
    server.loadAccount(this.inpToAccountId)
      // If the account is not found, surface a nicer error message for logging.
      .catch(StellarSdk.NotFoundError, (error) => {
        throw new Error('The destination account does not exist!');
      })
      // If there was no error, load up-to-date information on your account.
      .then(() => {
        return server.loadAccount(sourceKeys.publicKey());
      })
      .then((sourceAccount) => {
        // Start building the transaction.
        transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.payment({
            destination: this.inpToAccountId,
            // Because Stellar allows transaction in many currencies, you must
            // specify the asset type. The special "native" asset represents Lumens.
            asset: StellarSdk.Asset.native(),
            amount: this.inpAmount
          }))
          // A memo allows you to add your own metadata to a transaction. It's
          // optional and does not affect how Stellar treats the transaction.
          .addMemo(StellarSdk.Memo.text('Send money using wallet app'))
          .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(sourceKeys);
        // And finally, send it off to Stellar!
        return server.submitTransaction(transaction);
      })
      .then((result) => {
        console.log('Success! Results:', result);
        this._fromAccountId = this.inpFromAccountId;
        this._toAccountId = this.inpToAccountId;
        this._amountSent = this.inpAmount;
        this.showSpinner = false;
        this.showPanel = true;
      })
      .catch((error) => {
        console.error('Something went wrong!', error);
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Send Money', detail: error });
        this.showSpinner = false;
        this.showPanel = false;
        // If the result is unknown (no response body, timeout etc.) we simply resubmit
        // already built transaction:
        // server.submitTransaction(transaction);
      });
  }
}
