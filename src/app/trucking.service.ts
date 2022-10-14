import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'; //obtained from angular.io/guide/http


@Injectable()//{providedIn: 'root'}
export class TruckingService {


  printToConsole(arg: any) {
    console.log(arg);
  }

}
