import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { SharedModule } from 'primeng/components/common/shared';
import { GrowlModule } from 'primeng/components/growl/growl';
import { PanelModule } from 'primeng/components/panel/panel';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { TableModule } from 'primeng/components/table/table';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ImportAccountComponent } from './import-account/import-account.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { SplashComponent } from './splash/splash.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';

import { WalletKeyService } from './services/wallet-key.service';
import { SigninService } from './services/signin.service';

import { AuthGuard } from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';

import { GoogleSignInComponent } from 'angular-google-signin';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    ImportAccountComponent,
    AccountBalanceComponent,
    SendMoneyComponent,
    SplashComponent,
    AccountTransactionsComponent,
    GoogleSignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    GrowlModule,
    PanelModule,
    RadioButtonModule,
    TableModule,
    ProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [WalletKeyService, SigninService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
