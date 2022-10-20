import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ms1Url } from 'src/environments/environment';
import { truckID } from '../app-routing.module';
import { Truck } from '../truck.model';
import { DetailTableDataSource, DetailTableItem } from './detail-table-datasource';

@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.css']
})
export class DetailTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DetailTableItem>;
  dataSource: DetailTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'data'];

  imgUrl: string = '';
  data: any;

  constructor() {
    this.dataSource = new DetailTableDataSource();
    const httpClient = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));
    httpClient.get<Truck>(`${ms1Url}/api/v1/truck/${truckID}`)
    .subscribe(response => {
      this.imgUrl = response.img;
      this.data = response;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
