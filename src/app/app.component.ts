import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TruckingService } from './trucking.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'truckmanagement-frontend-angular';

  make: string = "";
  response: any;

  search(){
    this.http.get('http://localhost:9000/api/v1/truck/make/{'+ this.make+'}/')
    .subscribe((response) => { this.response = response;})
    console.log(this.response);
  }



   constructor(private svc: TruckingService, private http: HttpClient, )
    {
      this.svc.printToConsole("Got the Service!!!");
    }

  ngOnInit() {
    //this.http.get('https://api.github.com/users/Larocque240')


    //head to localhost:4200
    //hit f12 and click console
    //open array thats in console
    //should be what you posted to database.
    //  let obs = this.http.get<any>('http://localhost:9000/api/v1/truck/');
    //  obs.subscribe((response) => console.log(response));
  }



}

