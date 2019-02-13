import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser: any = undefined;

    mosaic_images = [];

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() {
        this.spotifyService.setCurrentUserInfo();
        this.getUserInfo();
        this.getTrackToMosaic();
    }

    getUserInfo() {
        this.spotifyService.get('current_user', {}).subscribe(
            response => {
                this.currentUser = response;
            },
            error => {
                console.log(error);
            }
        );
    }

    getTrackToMosaic() {
        this.spotifyService.get('user_top', { type: 'tracks' }, { limit: 50 }).subscribe(
            response => {
                const x = Number(( ( window['innerHeight'] / ( window['innerWidth'] * 0.1 ) ) / 5 ).toString().split('.')[0]) + 1;
                for (let index = 0; index < x; index++) {
                    this.mosaic_images = this.shuffle(this.mosaic_images.concat(response.items.map(item => item.album.images[0].url)));
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

}
