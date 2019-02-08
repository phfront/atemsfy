import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		public spotifyService: SpotifyService
	) { }

	ngOnInit() {
		this.spotifyService.search('track', 'in the end').subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		)
	}

}
