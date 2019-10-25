import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {default as config} from './config';

@Injectable({
  providedIn: 'root'
})
export class AgvServiceService {

  data: any;
  errorHandler: (err: any) => Observable<any>;

  constructor(private http: HttpClient) {
    this.errorHandler = errorHandler;


    function errorHandler(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err instanceof ErrorEvent) {
        errorMessage = ' Error: ' + err.error.message;
      } else {
        errorMessage = 'Error code ' + err.status +
          ' message error: ' + err.message;
      }
      return throwError(errorMessage);
    }
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

  insertPartNumber(detShortId, descr, am) {
    const content = {
      det_short_id:  '' + detShortId,
      description: '' + descr,
      amount: am
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://10.41.11.152:8080/Details/insertRecord', content, httpOptions).pipe(
      tap(data => console.log(data))
    );

  }

  newFile(detShortId, descr, am): Observable<any> {
    const content = {
      det_short_id:  '' + detShortId,
      description: '' + descr,
      amount: am
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>('http://10.41.11.152:8080/Details/insertRecord', content, httpOptions).pipe(
      tap(data => {console.log(JSON.stringify(data)); this.data = data; }),
      catchError(this.errorHandler)
    );
  }

}
