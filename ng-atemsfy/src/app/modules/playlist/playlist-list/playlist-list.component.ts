import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify/spotify.service';

@Component({
	selector: 'app-playlist-list',
	templateUrl: './playlist-list.component.html',
	styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

	my_playlists = [];

	constructor(
		public spotifyService: SpotifyService
	) { }

	ngOnInit() {
		this.getMyPlaylists();
	}

	getMyPlaylists(params = {}) {
		this.spotifyService.getCurrentUserPlaylists(params).subscribe(
			response => {
				this.my_playlists = this.my_playlists.concat(response['items']);
				if (response['next'] !== null) {
					this.getMyPlaylists(this.querystringToJson(response['next']))
				}
			},
			error => {
				console.log(error);
			}
		)
	}

	public querystringToJson(url) {
		let params = url.split('?')[1].split('&').map(item => { return item.split('=') } );
		let json = {};
		params.forEach(param => {
			json[param[0]] = param[1];
		});
		return json;
	}

}
