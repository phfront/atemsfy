import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify/spotify.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-editor',
  templateUrl: './playlist-editor.component.html',
  styleUrls: ['./playlist-editor.component.scss']
})
export class PlaylistEditorComponent implements OnInit {

    my_playlists = [];
    playlists_filter = {
        my: true,
        collaborative: true,
        public: true,
        owner: 'by_me'
    };
    playlist: any = undefined;
    available_tracks = [];
    playlists_tracks = [];
    available_tracks_search = {
        value: '',
        observer: new Subject()
    };
    playlists_tracks_search = {
        value: ''
    };
    deleting_track = false;

    // loadings
    loading = {
        playlist: false,
        playlist_tracks: false,
        search_tracks: false
    }

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() {
        this.getMyPlaylists();
        this.initSearch();
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

    getPlaylist(playlist_id) {
        this.loading.playlist = true;
        this.playlist = undefined;
        this.spotifyService.get('playlist', { playlist_id: playlist_id }).subscribe(
            response => {
                this.playlist = response;
                // this.playlists_tracks = this.playlist.tracks.items.map(item => item.track);
                this.loading.playlist_tracks = true;
                this.getPlaylistTracks('playlists_tracks');
                this.loading.playlist = false;
            },
            error => {
                console.log(error);
            }
        );
    }

    getPlaylistTracks(url) {
        this.spotifyService.get(url, { playlist_id: this.playlist.id }, { limit: 50 }).subscribe(
            response => {
                this.playlists_tracks = this.playlists_tracks.concat(response.items.map(item => item.track));
                if (response.next) {
                    this.getPlaylistTracks(response.next);
                } else {
                    this.loading.playlist_tracks = false;
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    initSearch() {
        this.available_tracks_search.observer.pipe(debounceTime(300)).subscribe(() => this.getAvailableTracks());
    }

    getAvailableTracks() {
        if (this.available_tracks_search.value === '') {
            this.available_tracks = [];
        } else {
            this.loading.search_tracks = true;
            this.spotifyService.get('search', {}, {
                type: 'track',
                market: 'PL',
                limit: 40,
                q: this.available_tracks_search.value
            }).subscribe(
                response => {
                    this.available_tracks = response.tracks.items;
                    this.loading.search_tracks = false;
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    availableTracksSeach() {
        this.available_tracks_search.observer.next();
    }

    playlistsTracksFilter() {
        return this.playlists_tracks.filter(track => {
            if (track.name.toLowerCase().indexOf(this.playlists_tracks_search.value.toLowerCase()) > -1) {
                return track;
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.addTrackToPlaystist(this.playlists_tracks[event.currentIndex]);
        }
    }

    addTrackToPlaystist(track) {
        this.spotifyService.post('playlists_tracks', { playlist_id: this.playlist.id }, { uris: [track.uri] }).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
                const index = this.playlists_tracks.indexOf(track);
                this.playlists_tracks.splice(index, 1);
            }
        );
    }

    removeTrackFromPlaylist(track) {
        if (!this.deleting_track) {
            this.deleting_track = true;
            this.spotifyService.delete('playlists_tracks', { playlist_id: this.playlist.id }, { uris: [track.uri] }).subscribe(
                response => {
                    this.deleting_track = false;
                    console.log(response);
                    const index = this.playlists_tracks.indexOf(track);
                    this.playlists_tracks.splice(index, 1);
                },
                error => {
                    this.deleting_track = false;
                    console.log(error);
                }
            );
        }
    }

}
