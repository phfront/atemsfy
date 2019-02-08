import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { SpotifyService } from '../../../../core/services/spotify/spotify.service';

@Component({
	selector: 'app-redirect',
	templateUrl: './redirect.component.html',
	styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

	constructor(
		public route: ActivatedRoute,
		public router: Router,
		public spotifyService: SpotifyService
	) { }

	ngOnInit() {
		let params = {};
		this.router.url.split('?')[1].split('&').map(item => { return item.split('=') } ).forEach(param => {
			params[param[0]] = param[1];
		});
		console.log(params);
		this.spotifyService.getToken(params['code']).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		)
		// this.router.navigate(['home']);
	}

}
