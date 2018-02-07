# StellarTestWalletNgApp

**This project is currently a work in progress.**

This projects implements basic wallet functionality to manage Stellar test accounts. Access to the wallet is secured by Google Authentication.

Basic wallet functionality includes:
- **create** -  Create a test account using the Stellar Friendbot and an accompanying passphrase.
- **import** - Import an existing test account into the wallet using a passphrase and the account's secret seed. The secret seed is encrypted and stored a secure cloud server.
- **balances** - Query account balances for a Stellar test account.
- **transfer** - Transfer funds (in lumens) between 2 test accounts. The passphrase is needed to perform this operation.
- **transactions** - Query account transactions for a Stellar test account.

Account keys, pubic key and secret seed, are hashed or encrypted to limit exposure. The create, import, and transfer functions are further secured by a user chosen passphrase. The balance and transaction query functions are public within the Stellar network so no passphrase is needed.

See also the [Stellar Test Wallet Key Server](https://github.com/programming4phone/StellarTestWalletKeyServer "Stellar Test Wallet Key Server").

For further details about Stellar accounts see <https://www.stellar.org/developers/guides/get-started/create-account.html>.

For further details about Google Authentication Services see <https://developers.google.com/identity/sign-in/web/sign-in>.

## Development stack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

This project also uses primeng, font-awesome, js-stellar-sdk, crypto-js, types/gapi, and types/gapi.auth2 (Google Authentication).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
