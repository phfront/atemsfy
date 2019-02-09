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
		window.location.replace(environment.urls.access_token());
	}

}
