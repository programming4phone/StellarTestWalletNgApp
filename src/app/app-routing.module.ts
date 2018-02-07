import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountComponent } from './create-account/create-account.component';
import { ImportAccountComponent } from './import-account/import-account.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';
import { SplashComponent } from './splash/splash.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SplashComponent },
  { path: 'createAccount', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'importAccount', component: ImportAccountComponent, canActivate: [AuthGuard] },
  { path: 'accountBalance', component: AccountBalanceComponent, canActivate: [AuthGuard] },
  { path: 'sendMoney', component: SendMoneyComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: AccountTransactionsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
