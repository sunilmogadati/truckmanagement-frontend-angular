import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruckingService } from './trucking.service';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms'
import { from, Observable } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FlexModule } from '@angular/flex-layout/flex';
import { ViewModule } from './view/view.module';
import { NavComponent } from './nav/nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavbarComponent,
    AddComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    FlexModule,
    ViewModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule

  ],
  providers: [TruckingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
