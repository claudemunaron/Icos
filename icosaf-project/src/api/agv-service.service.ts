import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {default as config} from './config';

@Injectable({
  providedIn: 'root'
})
export class AgvServiceService {

  data: any;

  constructor(private http: HttpClient) {
  }

  digitalTwin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ZGl0dG86ZGl0dG8',
        Accept: 'application/json'
      })
    };

    return this.http.get(config.data, httpOptions)
      .pipe(
        tap(data => {this.data = data; })
      );
  }

}
