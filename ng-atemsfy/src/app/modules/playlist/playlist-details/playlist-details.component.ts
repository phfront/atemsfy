import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-playlist-details',
	templateUrl: './playlist-details.component.html',
	styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {

	playlist: any = undefined;

	constructor(
		public spotifyService: SpotifyService,
		public route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.params.subscribe(
			params => {
				this.spotifyService.getPlaylistDetails(params['playlist_id']).subscribe(
					response => {
						this.playlist = response;
					},
					error => {
						console.log(error);
					}
				)
			}
		)
	}

}
