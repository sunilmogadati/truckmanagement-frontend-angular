import { CreateComponent } from './create/create.component';
import { DetailTableComponent } from './detail-table/detail-table.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'view', component:ViewTableComponent},
  {path: 'create', component:CreateComponent},
  {path: 'details', component:DetailTableComponent},
  {path: '**', component:ViewTableComponent}
];

export let truckID = 1;

export function changeTruckID(id: number) {
  truckID = id;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
