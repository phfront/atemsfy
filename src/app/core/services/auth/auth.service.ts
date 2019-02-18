import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public http: HttpClient
    ) { }

    auth() {
        let url = environment.urls.access_token();
        url += `?client_id=${environment.client_id}`;
        url += `&response_type=${environment.response_type}`;
        url += `&redirect_uri=${location.origin + environment.redirect_uri}`;
        url += `&state=${environment.state}`;
        url += `&scope=${environment.scope}`;
        window.location.replace(url);
    }

}
