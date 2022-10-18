import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    document.cookie = `searchbar=${(<HTMLInputElement>document.getElementById("input"))?.value.trim()}; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;`;
    this.router.navigate(['view']).then(() => {window.location.reload();});
  }



  constructor(private svc: TruckingService, private http: HttpClient, private router:Router)
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

