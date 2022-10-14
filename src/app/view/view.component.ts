import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TruckingService } from '../trucking.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  make: string = "";
  response: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {this.search();
  }

  search(){
    this.http.get('http://localhost:9000/api/v1/truck/make/{'+ this.make+'}/')
    .subscribe((response) => { this.response = response;})
    console.log(this.response);
  }

}
