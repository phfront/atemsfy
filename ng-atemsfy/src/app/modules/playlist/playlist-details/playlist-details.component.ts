import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {

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

    constructor(
        public spotifyService: SpotifyService,
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.getPlayslist(params);
                this.initSearch();
            }
        );
    }

    getPlayslist(params) {
        this.spotifyService.get('playlist', params).subscribe(
            response => {
                this.playlist = response;
                this.playlists_tracks = this.playlist.tracks.items.map(item => item.track);
                if (this.playlist.tracks.next) {
                    this.getNextPlaylistTracks(this.playlist.tracks.next);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    getNextPlaylistTracks(url) {
        if (this.playlist.tracks.next) {
            this.spotifyService.get(url, {}).subscribe(
                response => {
                    this.playlists_tracks = this.playlists_tracks.concat(response.items.map(item => item.track));
                    if (response.next) {
                        this.getNextPlaylistTracks(response.next);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    initSearch() {
        this.available_tracks_search.observer.pipe(debounceTime(500)).subscribe(() => this.getAvailableTracks());
    }

    getAvailableTracks() {
        if (this.available_tracks_search.value === '') {
            this.available_tracks = [];
        } else {
            this.spotifyService.get('search', {}, {
                type: 'track',
                market: 'PL',
                limit: 40,
                q: this.available_tracks_search.value
            }).subscribe(
                response => {
                    this.available_tracks = response.tracks.items;
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
