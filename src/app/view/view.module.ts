import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view.component';



@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ViewComponent]


})
export class ViewModule { }
