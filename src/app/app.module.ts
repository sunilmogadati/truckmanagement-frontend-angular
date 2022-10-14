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

@NgModule({
  declarations: [
    AppComponent,

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
    ViewModule

  ],
  providers: [TruckingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
