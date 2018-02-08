import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { AccountTransaction } from '../entities/account-transaction.model';
import { environment } from '../../environments/environment';
const StellarSdk = require('stellar-sdk');

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.css']
})
export class AccountTransactionsComponent implements OnInit {

  public inpAccountId: string;
  public msgs: Message[] = [];
  public showPanel: boolean;
  public showSpinner: boolean;
  public accountTransactions: AccountTransaction[];

  constructor() { }

  ngOnInit() {
    this.showPanel = false;
    this.showSpinner = false;
    console.log(this);
  }

  getTransactions() {
    this.showPanel = false;
    this.showSpinner = true;
    console.log('getTransactions ');

    console.log('inpAccountId: ' + this.inpAccountId);
    const stellarHorizonUrl = `${environment.stellarHorizonUrl}`;
    const server: any = new StellarSdk.Server(stellarHorizonUrl);

    server.transactions()
    .forAccount(this.inpAccountId)
    .call()
    .then((page) => {
        console.log('Page 1: ');
        console.log(page.records);
        this.accountTransactions = [];
        page.records.forEach((record) => {
          console.log('record: ' + record.toString());
          const accountTransaction: AccountTransaction = new AccountTransaction(record.id, record.source_account, record.fee_paid);
          console.log('Transaction Id:', record.id, ', Source Account:', record.source_account, ', Fee Paid:', record.fee_paid);
          this.accountTransactions.push(accountTransaction);
        });
        // return page.next();
        this.showSpinner = false;
        this.showPanel = true;
    })
    // .then(function (page) {
    //  console.log('Page 2: ');
    //  console.log(page.records);
    // })
    .catch((err) => {
      console.log(err);
      let errMsg: string;
      if (err.name === 'NotFoundError') {
        errMsg = 'Invalid Account ID';
      } else {
        errMsg = err.name;
      }
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Account Transactions', detail: errMsg });
      this.showSpinner = false;
      this.showPanel = false;
    });
  }

}
