import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify/spotify.service';

@Component({
    selector: 'app-playlist-list',
    templateUrl: './playlist-list.component.html',
    styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

    my_playlists = [];
    playlists_filter = {
        my: true,
        collaborative: true,
        public: true,
        owner: 'all'
    };

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() {
        this.getMyPlaylists();
    }

    getMyPlaylists(params = {}) {
        this.spotifyService.get('user_playlists', { user_id: sessionStorage.user_id }, params).subscribe(
            response => {
                this.my_playlists = this.my_playlists.concat(response['items']);
                if (response['next'] !== null) {
                    this.getMyPlaylists(this.spotifyService.querystringToJson(response['next']));
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    filterPlaylist(playlist) {
        // if (playlist.collaborative !== this.playlists_filter.collaborative) return false;
        // if (playlist.public !== this.playlists_filter.public) return false;
        if (this.playlists_filter.owner === 'by_me') {
            if (playlist.owner.id !== sessionStorage.user_id) {
                return false;
            }
        } else if (this.playlists_filter.owner === 'by_spotify') {
            if (playlist.owner.id !== 'spotify') {
                return false;
            }
        }
        return true;
    }

}
