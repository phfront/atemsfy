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

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() {
        this.spotifyService.setCurrentUserInfo();
        this.spotifyService.get('current_user', {}).subscribe(
            response => {
                this.currentUser = response;
            },
            error => {
                console.log(error);
            }
        );
    }

}
