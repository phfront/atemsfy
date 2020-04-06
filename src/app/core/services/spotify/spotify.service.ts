import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  number_of_attempts = 5;

  constructor(
    public http: HttpClient,
    public router: Router,
    public messageService: MessageService
  ) {}

  getHeader(body = {}) {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.access_token,
      }),
      body: body,
    };
  }

  querystringToJson(url) {
    const params = url
      .split('?')[1]
      .split('&')
      .map((item) => item.split('='));
    const json = {};
    params.forEach((param) => {
      json[param[0]] = param[1];
    });
    return json;
  }

  dictParamsToQuerystring(dict) {
    return Object.keys(dict)
      .map((key) => `${key}=${dict[key]}`)
      .join('&');
  }

  url(endpoint, urlParams, getParams = {}) {
    let _url = environment.urls[endpoint];
    if (_url) {
      _url = _url(urlParams);
      if (Object.keys(getParams).length > 0) {
        const querystring = this.dictParamsToQuerystring(getParams);
        _url += `?${querystring}`;
      }
      return _url;
    } else {
      return endpoint;
    }
  }

  get(endpoint, urlParams, getParams = {}) {
    const url = this.url(endpoint, urlParams, getParams);
    const args = arguments;
    return this.http.get<any>(url, this.getHeader()).pipe(
      retry(this.number_of_attempts),
      // tap(() => { this.preventTokenFromExpiring() }),
      catchError(this.handleError(endpoint))
    );
  }

  post(endpoint, urlParams, object, getParams = {}) {
    const url = this.url(endpoint, urlParams, getParams);
    const args = arguments;
    return this.http.post<any>(url, object, this.getHeader()).pipe(
      retry(this.number_of_attempts),
      // tap(() => { this.preventTokenFromExpiring() }),
      catchError(this.handleError(endpoint))
    );
  }

  patch(endpoint, urlParams, object, getParams = {}) {
    const url = this.url(endpoint, urlParams, getParams);
    const args = arguments;
    return this.http.patch<any>(url, object, this.getHeader()).pipe(
      retry(this.number_of_attempts),
      // tap(() => { this.preventTokenFromExpiring() }),
      catchError(this.handleError(endpoint))
    );
  }

  put(endpoint, urlParams, object, getParams = {}) {
    const url = this.url(endpoint, urlParams, getParams);
    const args = arguments;
    return this.http.put<any>(url, object, this.getHeader()).pipe(
      retry(this.number_of_attempts),
      // tap(() => { this.preventTokenFromExpiring() }),
      catchError(this.handleError(endpoint))
    );
  }

  delete(endpoint, urlParams, object, getParams = {}) {
    const url = this.url(endpoint, urlParams, getParams);
    const args = arguments;
    return this.http.delete<any>(url, this.getHeader(object)).pipe(
      retry(this.number_of_attempts),
      // tap(() => { this.preventTokenFromExpiring() }),
      catchError(this.handleError(endpoint))
    );
  }

  handleError<T>(endpoint, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      try {
        if (error.error.error.status === 401) {
          // access token expired
          this.messageService.error(
            'Sessão expirada, por favor faça login novamente!',
            { position: 'top-center' }
          );
          this.router.navigate(['/']);
        }
        if (
          error.error.error.message ===
          'Only valid bearer authentication supported'
        ) {
          this.messageService.error(
            'Informações de sessão inválida, por favor faça login novamente!',
            { position: 'top-center' }
          );
          this.router.navigate(['/']);
        }
      } catch (err) {}
      return throwError(error); // Let the app keep running by returning an empty result.
    };
  }

  setCurrentUserInfo() {
    this.get('current_user', {}).subscribe(
      (response) => {
        sessionStorage.user_id = response['id'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
