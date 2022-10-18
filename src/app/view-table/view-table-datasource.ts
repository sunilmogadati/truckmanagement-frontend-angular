import { Truck } from './../truck.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of } from 'rxjs';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { ms1Url } from 'src/environments/environment';

// TODO: Replace this with your own data model type
export interface ViewTableItem {
  make: string;
  model: string;
  year: number;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ViewTableItem[] = [];

/**
 * Data source for the ViewTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ViewTableDataSource extends DataSource<ViewTableItem> {
  data: ViewTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
    this.data = [];
    const httpClient = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));
    let finalURL = '';
    if ((document.cookie.split("=")[1] == undefined) || document.cookie.split("=")[1] == '') {
      finalURL = `${ms1Url}/api/v1/truck`;
      httpClient.get<Truck[]>(finalURL)
      .subscribe(response => {
        response.forEach(element => {
          this.data.push({make: element.make ?? 'Unknown', model: element.model ?? 'Unknown', year: element.year, id: element.id});
        });
        this.paginator?._changePageSize(this.paginator.pageSize);
      })
    } else {
      finalURL = `${ms1Url}/api/v1/truck?make=${document.cookie.split("=")[1]}`;
      httpClient.get<Truck[]>(finalURL)
      .subscribe(response => {
        response.forEach(element => {
          this.data.push({make: element.make ?? 'Unknown', model: element.model ?? 'Unknown', year: element.year, id: element.id});
        });
        this.paginator?._changePageSize(this.paginator.pageSize);
      })
      finalURL = `${ms1Url}/api/v1/truck?model=${document.cookie.split("=")[1]}`;
      httpClient.get<Truck[]>(finalURL)
      .subscribe(response => {
        response.forEach(element => {
          this.data.push({make: element.make ?? 'Unknown', model: element.model ?? 'Unknown', year: element.year, id: element.id});
        });
        this.paginator?._changePageSize(this.paginator.pageSize);
      })
      if (/^\d+$/.test(document.cookie.split("=")[1])){
        finalURL = `${ms1Url}/api/v1/truck?year=${document.cookie.split("=")[1]}`;
        httpClient.get<Truck[]>(finalURL)
        .subscribe(response => {
          response.forEach(element => {
            this.data.push({make: element.make ?? 'Unknown', model: element.model ?? 'Unknown', year: element.year, id: element.id});
          });
          this.paginator?._changePageSize(this.paginator.pageSize);
        })
    }
    }
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ViewTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ViewTableItem[]): ViewTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ViewTableItem[]): ViewTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'make': return compare(a.make, b.make, isAsc);
        case 'model': return compare(a.model, b.model, isAsc);
        case 'year': return compare(+a.year, +b.year, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
