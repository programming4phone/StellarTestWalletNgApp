export class AccountTransaction {

  transactionId: string;
  sourceAccount: string;
  feePaid: string;

  constructor(transactionId: string, sourceAccount: string, feePaid: string) {
    this.transactionId = transactionId;
    this.sourceAccount = sourceAccount;
    this.feePaid = feePaid;
  }
}
