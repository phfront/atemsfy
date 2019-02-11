import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    search_q = '';
    results: any = {
        albums: null,
        artists: null,
        playlists: null,
        tracks: null
    };

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() { }

    search(event) {
        if (event && event.keyCode !== 13) {
            return;
        }
        this.spotifyService.get('search', {}, {
            type: 'album,artist,playlist,track',
            market: 'PL',
            q: this.search_q
        }).subscribe(
            response => {
                this.results = response;
                console.log(this.results);
            },
            error => {
                console.log(error);
            }
        );
    }

}
