import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-redirect',
	templateUrl: './redirect.component.html',
	styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

	constructor(
		public router: Router,
	) { }

	ngOnInit() {
		let params = {};
		this.router.url.split('#')[1].split('&').map(item => { return item.split('=') } ).forEach(param => {
			sessionStorage[param[0]] = param[1];
		});
		this.router.navigate(['home']);
	}

}
