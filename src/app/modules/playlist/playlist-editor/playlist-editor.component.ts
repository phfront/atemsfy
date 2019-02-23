import { AppComponent } from './../../../app.component';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// services
import { SpotifyService } from '../../../core/services/spotify/spotify.service';
import { MessageService } from '../../../core/services/message/message.service';

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
        owner: 'by_me',
        text: ''
    };
    playlist: any = undefined;
    available_tracks = [];
    playlists_tracks = [];
    available_tracks_search = {
        value: '',
        observer: new Subject(),
        selected: []
    };
    playlists_tracks_search = {
        value: ''
    };
    deleting_track = false;
    loading = {
        playlist: false,
        playlist_tracks: false,
        search_tracks: false,
        modal_saving: false
    };
    message_position = 'bottom-left';
    showModal = false;
    mobile_breaker = '1000px';
    is_mobile = false;

    constructor(
        public spotifyService: SpotifyService,
        public messageService: MessageService,
        public myapp: AppComponent,
        public breakpointObserver: BreakpointObserver
    ) { }

    ngOnInit() {
        this.getMyPlaylists();
        this.initSearch();

        this.breakpointObserver.observe([`(max-width: ${this.mobile_breaker})`])
        .subscribe((state: BreakpointState) => {
            this.is_mobile = state.matches;
        });
    }

    getMyPlaylists(params = {}) {
        this.spotifyService.get('user_playlists', { user_id: sessionStorage.user_id }, params).subscribe(
            response => {
                this.my_playlists = this.my_playlists.concat(response['items']);
                if (response['next'] !== null) {
                    this.getMyPlaylists(this.spotifyService.querystringToJson(response['next']));
                }
            },
            error => { }
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
        if (this.playlists_filter.text !== '') {
            return playlist.name.toLowerCase().indexOf(this.playlists_filter.text.toLowerCase()) > -1;
        }
        return true;
    }

    getPlaylist(playlist_id) {
        this.loading.playlist = true;
        this.playlist = undefined;
        this.spotifyService.get('playlist', { playlist_id: playlist_id }).subscribe(
            response => {
                this.playlist = response;
                this.loading.playlist_tracks = true;
                this.playlists_tracks = [];
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
            if (event.container.element.nativeElement.getAttribute('playlist-tracks') === 'true') {
                if (event.previousIndex !== event.currentIndex) {
                    if (event.previousIndex < event.currentIndex) {
                        this.reorderPlaylistTracks(event.previousIndex, 1, event.currentIndex + 1);
                    } else {
                        this.reorderPlaylistTracks(event.previousIndex, 1, event.currentIndex);
                    }

                }
            }
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.addTrackToPlaystist(this.playlists_tracks[event.currentIndex], event.currentIndex);
            this.available_tracks.splice(event.previousIndex, 0, this.playlists_tracks[event.currentIndex]);
        }
    }

    addTrackToPlaystist(track, position) {
        this.spotifyService.post('playlists_tracks', {
            playlist_id: this.playlist.id
        }, {
            uris: [track.uri],
            position: position
        }).subscribe(
            response => {
                this.messageService.success(`Música ${track.name} adicionada na playlist ${this.playlist.name}`, {
                    position: this.message_position
                });
            },
            error => {
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
                    const index = this.playlists_tracks.indexOf(track);
                    this.playlists_tracks.splice(index, 1);
                    this.messageService.success(`Música ${track.name} removida da playlist ${this.playlist.name}`, {
                        position: this.message_position
                    });
                },
                error => {
                    this.deleting_track = false;
                }
            );
        }
    }

    reorderPlaylistTracks(range_start, range_length, insert_before) {
        console.log(range_start, range_length, insert_before);
        this.spotifyService.put('playlists_tracks', { playlist_id: this.playlist.id }, {
            range_start: range_start,
            range_length: range_length,
            insert_before: insert_before
        }).subscribe(
            response => {
                this.messageService.success(`A ordem das música da playlist ${this.playlist.name} foi alterada`, {
                    position: this.message_position
                });
            },
            error => {}
        );
    }

    askNewPlaylistName() {
        setTimeout(() => {
            this.addNewPlaylist(prompt('Informe o nome da nova playlist'));
        }, 100);
    }

    addNewPlaylist(playlist_name) {
        if (playlist_name !== null && playlist_name !== '') {
            this.spotifyService.post('user_playlists', { user_id: sessionStorage.user_id }, { name: playlist_name }).subscribe(
                response => {
                    this.messageService.success(`Playlist ${playlist_name} foi adicionada`, {
                        position: this.message_position
                    });
                    this.my_playlists = [];
                    this.getMyPlaylists();
                },
                error => {}
            );
        }
    }

    playSearchTrack(track) {
        this.myapp.playerComponent.playTrack(track.uri);
    }

    playPlaylistTrack(track, i) {
        this.myapp.playerComponent.playContext(this.playlist.uri, { position: i });
    }

    selectTrack(track) {
        let index = this.available_tracks_search.selected.indexOf(track);
        if (index === -1) {
            this.available_tracks_search.selected.push(track);
        } else {
            this.available_tracks_search.selected.splice(index, 1);
        }
    }

    findTrackInSelectedList(track) {
        return this.available_tracks_search.selected.indexOf(track) > -1;
    }

    hasTrackSelected() {
        return this.available_tracks_search.selected.length;
    }

    modalSearch() {
        this.showModal = true;
    }

    closeModal(save) {
        if (save) {
            this.loading.modal_saving = true;
            this.spotifyService.post('playlists_tracks', {
                playlist_id: this.playlist.id
            }, {
                uris: this.available_tracks_search.selected.map(track => track.uri)
            }).subscribe(
                response => {
                    this.messageService.success(`Músicas adicionadas na playlist ${this.playlist.name}`, {
                        position: this.message_position
                    });
                    this.loading.modal_saving = false;
                    this.showModal = false;
                    this.getPlaylist(this.playlist.id);
                },
                error => {
                    this.loading.modal_saving = false;
                    this.showModal = false;
                }
            );
        } else {
            this.showModal = false;
        }
    }

}
