import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SpotifyService {

	constructor(
		public http: HttpClient
	) { }


	public getHeader(type = '') {
		if (type === 'base64') {
			return {
				headers: new HttpHeaders({
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret)
				})
			}
		}
		return {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + sessionStorage.access_token
			})
		}
	}

	search(type, query) {
		return this.http.get(environment.urls.search(type, query), this.getHeader());
	}

	getToken(code) {
		return this.http.post(environment.urls.get_token(), {
			"grant_type": environment.grant_type,
			"redirect_uri": "http://localhost:4200/home",
			"code": code
		}, this.getHeader('base64'));
	}

}
