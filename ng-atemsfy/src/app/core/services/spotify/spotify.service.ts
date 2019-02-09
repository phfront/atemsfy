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

	public getHeader() {
		return {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + sessionStorage.access_token
			})
		}
	}

	getCurrentUser() {
		return this.http.get(environment.urls.me(), this.getHeader());
	}

	setCurrentUserInfo() {
		this.getCurrentUser().subscribe(
			response => {
				sessionStorage.user_id = response['id'];
			},
			error => {
				console.log(error);
			}
		)
	}

	getCurrentUserPlaylists(params = {}) {
		return this.http.get(environment.urls.user_playlists(sessionStorage.user_id, this.dictParamsToQuerystring(params)), this.getHeader())
	}

	search(query) {
		return this.http.get(environment.urls.search_all(query), this.getHeader());
	}

	dictParamsToQuerystring(dict) {
		return Object.keys(dict).map(key => `${key}=${dict[key]}`).join('&');
	}

}
