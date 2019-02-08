import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ng-atemsfy';

	constructor(
		public authService: AuthService
	) { }

	spotifyAuth() {
		this.authService.auth();
	}
}
