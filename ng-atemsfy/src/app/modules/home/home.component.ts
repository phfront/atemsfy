import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify/spotify.service';
import { MosaicService } from '../../core/services/mosaic/mosaic.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser: any = undefined;

    mosaic_images: Array<any> = [];

    constructor(
        public spotifyService: SpotifyService,
        public mosaicService: MosaicService
    ) { }

    ngOnInit() {
        this.spotifyService.setCurrentUserInfo();
        this.getUserInfo();
        this.mosaicService.getMosaicImages().then(
            mosaic_images => {
                this.mosaic_images = mosaic_images;
            },
            error => {
                console.log(error);
            }
        );
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

}
