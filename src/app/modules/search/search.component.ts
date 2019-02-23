import { AppComponent } from './../../app.component';
import { MosaicService } from './../../core/services/mosaic/mosaic.service';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    search = {
        value: '',
        backup_value: '',
        running: false,
        observer: new Subject()
    };
    results: any = {
        albums: { items: [] },
        artists: { items: [] },
        playlists: { items: [] },
        tracks: { items: [] }
    };
    mosaic_images;

    constructor(
        public spotifyService: SpotifyService,
        public mosaicService: MosaicService,
        public myapp: AppComponent
    ) { }

    ngOnInit() {
        this.mosaicService.getMosaicImages().then(
            mosaic_images => {
                this.mosaic_images = mosaic_images;
            },
            error => {
                console.log(error);
            }
        );
        this.initSearch();
    }

    initSearch() {
        this.search.observer.pipe(debounceTime(300)).subscribe(() => this.searchItems());
    }

    callSearch() {
        this.search.running = true;
        this.search.observer.next();
    }

    searchItems() {
        if (this.search.value !== '' && this.search.value !== this.search.backup_value) {
            this.search.backup_value = this.search.value;
            this.spotifyService.get('search', {}, {
                type: 'album,artist,playlist,track',
                market: 'PL',
                q: this.search.value
            }).subscribe(
                response => {
                    this.results = response;
                    console.log(this.results);
                    this.search.running = false;
                },
                error => { }
            );
        } else {
            this.search.running = false;
        }
    }

    playTrack(track) {
        this.myapp.playerComponent.playTrack(track.uri);
    }

    playContext(context) {
        this.myapp.playerComponent.playContext(context.uri, { position: 0 });
    }

    playArtist(artist) {
        this.myapp.playerComponent.playArtist(artist.uri);
    }

}
