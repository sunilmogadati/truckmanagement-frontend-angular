import { DetailTableComponent } from './detail-table/detail-table.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'view', component:ViewTableComponent},
  {path: 'add', component:AddComponent},
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
