import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    constructor(
        public http: HttpClient,
        public router: Router
    ) { }

    getHeader(body = {}) {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.access_token
            }),
            body: body
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
            // tap(() => { this.preventTokenFromExpiring() }),
            catchError(this.handleError(endpoint))
        );
    }

    post(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.post<any>(url, object, this.getHeader()).pipe(
            // tap(() => { this.preventTokenFromExpiring() }),
            catchError(this.handleError(endpoint))
        );
    }

    patch(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.patch<any>(url, object, this.getHeader()).pipe(
            // tap(() => { this.preventTokenFromExpiring() }),
            catchError(this.handleError(endpoint))
        );
    }

    put(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.put<any>(url, object, this.getHeader()).pipe(
            // tap(() => { this.preventTokenFromExpiring() }),
            catchError(this.handleError(endpoint))
        );
    }

    delete(endpoint, urlParams, object) {
        const url = this.url(endpoint, urlParams);
        const args = arguments;
        return this.http.delete<any>(url, this.getHeader(object)).pipe(
            // tap(() => { this.preventTokenFromExpiring() }),
            catchError(this.handleError(endpoint))
        );
    }

    handleError<T>(endpoint, result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            try {
                if (error.error.error.status === 401) { // access token expired
                    alert('Sessão expirada, por favor faça login novamente!');
                    this.router.navigate(['/']);
                }
            }
            catch (err) { }
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
