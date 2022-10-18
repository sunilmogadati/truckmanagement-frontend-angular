import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Truck } from '../truck.model';
import { ms1Url } from 'src/environments/environment';
import { truckID } from '../app-routing.module';

// TODO: Replace this with your own data model type
export interface DetailTableItem {
  name: string;
  data: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DetailTableItem[] = [];

/**
 * Data source for the DetailTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DetailTableDataSource extends DataSource<DetailTableItem> {
  data: DetailTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
    this.data = [];
    const httpClient = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));
    httpClient.get<Truck>(`${ms1Url}/api/v1/truck/${truckID}`)
    .subscribe(response => {
      console.log(response);
      this.data.push({name: 'Make', data: response.make ?? 'Unknown'});
      this.data.push({name: 'Model', data: response.model ?? 'Unknown'});
      this.data.push({name: 'Year', data: `${response.year}`});
      this.data.push({name: 'Weight', data: response.weight ?? 'Unknown'});
      this.data.push({name: 'Volume', data: response.volume ?? 'Unknown'});
      this.data.push({name: 'Space', data: response.space ?? 'Unknown'});
      this.data.push({name: 'Type', data: response.type ?? 'Unknown'});
      this.data.push({name: 'Miles Per Gallon', data: `${response.mpg}`});
      if (response.routes[0]) {
        this.data.push({name: 'Routing Status', data: response.routes[0].status ?? 'Unknown'});
        this.data.push({name: 'Destination', data: response.routes[0].destination ?? 'Unknown'});
        this.data.push({name: 'Start Date', data: response.routes[0].startDate ?? 'Unknown'});
        this.data.push({name: 'End Date', data: response.routes[0].endDate ?? 'Unknown'});
        this.data.push({name: 'Source', data: response.routes[0].source ?? 'Unknown'});
      }
      this.paginator?._changePageSize(this.paginator.pageSize);
    })
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DetailTableItem[]> {
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
  private getPagedData(data: DetailTableItem[]): DetailTableItem[] {
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
  private getSortedData(data: DetailTableItem[]): DetailTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'data': return compare(a.data, b.data, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
