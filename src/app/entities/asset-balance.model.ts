export class AssetBalance {

  assetType: string;
  assetCode: string;
  amount: string;

  constructor(assetType: string, assetCode: string, amount: string) {
    this.assetType = assetType;
    this.assetCode = assetCode;
    this.amount = amount;
  }
}
