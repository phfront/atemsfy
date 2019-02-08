import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor {

	private authorize(): void {
		localStorage.removeItem('token');
		window.location.replace(environment.url());
	}

	private getToken(): String {
		let token = localStorage.getItem('token');

		if (!token) {
			const match = window.location.hash.match(/#access_token=(.*?)&/);

			token = match && match[1];

			localStorage.setItem('token', token);
		}

		if (!token) {
			this.authorize();
		}

		return token;
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
		const token = this.getToken();

		if (!token) {
			return next.handle(req);
		}

		const authReq = req.clone({
			setHeaders: { Authorization: `Bearer ${token}` }
		});

		return next.handle(authReq);
	}
}
