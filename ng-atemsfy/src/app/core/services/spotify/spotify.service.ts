import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    constructor(
        public http: HttpClient
    ) { }

    getHeader() {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.access_token
            })
        };
    }

    querystringToJson(url) {
        const params = url.split('?')[1].split('&').map(item => item.split('=') );
        const json = {};
        params.forEach(param => {
            json[param[0]] = param[1];
        });
        return json;
    }

    dictParamsToQuerystring(dict) {
        return Object.keys(dict).map(key => `${key}=${dict[key]}`).join('&');
    }

    url(endpoint, urlParams, getParams = {}) {
        let url = environment.urls[endpoint](urlParams);
        if (Object.keys(getParams).length > 0) {
            const querystring = this.dictParamsToQuerystring(getParams);
            url += `?${querystring}`;
        }
        return url;
    }

    get(endpoint, urlParams, getParams = {}) {
        const url = this.url(endpoint, urlParams, getParams);
        const args = arguments;
        return this.http.get<any>(url, this.getHeader()).pipe(
            // tap(function() { this.devDebug(args); }.bind(this)),
            catchError(this.handleError(endpoint))
        );
    }

    post(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.post<any>(url, object, this.getHeader()).pipe(
            // tap(function() { this.devDebug(args); }.bind(this)),
            catchError(this.handleError(endpoint))
        );
    }

    patch(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.patch<any>(url, object, this.getHeader()).pipe(
            // tap(function() { this.devDebug(args); }.bind(this)),
            catchError(this.handleError(endpoint))
        );
    }

    put(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.put<any>(url, object, this.getHeader()).pipe(
            // tap(function() { this.devDebug(args); }.bind(this)),
            catchError(this.handleError(endpoint))
        );
    }

    delete(endpoint, urlParams) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.delete<any>(url, this.getHeader()).pipe(
            // tap(function() { this.devDebug(args); }.bind(this)),
            catchError(this.handleError(endpoint))
        );
    }

    handleError<T>(endpoint, result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            return throwError(error); // Let the app keep running by returning an empty result.
        };
    }

    setCurrentUserInfo() {
        this.get('current_user', {}).subscribe(
            response => {
                sessionStorage.user_id = response['id'];
            },
            error => {
                console.log(error);
            }
        );
    }

}
