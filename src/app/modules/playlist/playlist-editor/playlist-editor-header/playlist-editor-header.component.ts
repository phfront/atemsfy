import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/core/services/spotify/spotify.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-playlist-editor-header',
  templateUrl: './playlist-editor-header.component.html',
  styleUrls: ['./playlist-editor-header.component.scss']
})
export class PlaylistEditorHeaderComponent implements OnInit {

  public showModalSelectPlaylist: boolean;
  public showPlaylistSearchLoading: boolean;
  public playlistSearch = new FormControl('');
  public playlists = [];
  public filteredPlaylists = [];
  private $playlistSearchDestroy = new Subject();

  @Output() selectPlaylist = new EventEmitter();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  openModal() {
    this.showModalSelectPlaylist = true;
    this.playlists = [];
    this.filteredPlaylists = [];
    this.showPlaylistSearchLoading = true;
    this.$playlistSearchDestroy = new Subject();
    this.playlistSearch.valueChanges.pipe(takeUntil(this.$playlistSearchDestroy)).subscribe({
      next: () => {
        this.filteredPlaylists = this.playlists.filter(p => {
          return p.name.toLowerCase().includes(this.playlistSearch.value.toLowerCase());
        });
      }
    })
    this.getMyPlaylists();
  }

  closeModal() {
    this.$playlistSearchDestroy.complete();
    this.$playlistSearchDestroy.unsubscribe();
    this.showModalSelectPlaylist = false;
  }

  getMyPlaylists(params = {}) {
    this.spotifyService
      .get('user_playlists', { user_id: sessionStorage.user_id }, params)
      .subscribe(
        response => {
          this.playlists = this.playlists.filter(p => p.owner.id === sessionStorage.user_id).concat(response['items']);
          if (response['next'] !== null) {
            this.getMyPlaylists(
              this.spotifyService.querystringToJson(response['next'])
            );
          } else {
            this.filteredPlaylists = this.playlists;
            this.showPlaylistSearchLoading = false;
          }
        },
        (error) => {}
      );
  }

  sendAndClose(playlist) {
    this.closeModal();
    this.selectPlaylist.emit(playlist);
  }

}
