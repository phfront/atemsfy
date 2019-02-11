import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ng-atemsfy';
	remaining_session_time;

	constructor(
		public router: Router
	) {
		setInterval(() => {
			this.updateRemainingSessionTime();
		}, 1000)
	}

	updateRemainingSessionTime() {
		let time = (Number(sessionStorage.session_time) + (Number(sessionStorage.expires_in) * 1000)) - new Date().getTime();
		time /= 1000;
		this.remaining_session_time = time.toFixed(0);
	}

}
