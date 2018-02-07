export class WalletKeys {

  accountNumber: string; // Hash of accountId (public key) encoded as Base64 string
  secretSeed: string; // CipherText of secret seed encoded as Base64 string

  constructor(accountNumber: string, secretSeed: string) {
    this.accountNumber = accountNumber;
    this.secretSeed = secretSeed;
  }
}
