import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {default as config} from './config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  dataLogin = config.dataLogin;


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

  login(username, password) {
    const content = {
      username: '' + username,
      password: '' + password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.dataLogin, content, httpOptions).pipe(
      tap(data => console.log((data))),
      catchError(this.errorHandler)
    );


  }
}
