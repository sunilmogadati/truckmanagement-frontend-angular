import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { changeTruckID } from '../app-routing.module';
import { ViewTableDataSource, ViewTableItem } from './view-table-datasource';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewTableItem>;
  dataSource: ViewTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['make', 'model', 'year'];

  constructor(private router:Router) {
    this.dataSource = new ViewTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  displayData(_t47: any) {
    changeTruckID(_t47.id);
    this.router.navigate(['details'])
  }
}
