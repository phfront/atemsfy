import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MosaicService } from './../../core/services/mosaic/mosaic.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

    public mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    mosaic_images;

    constructor(
        public changeDetectorRef: ChangeDetectorRef,
        public media: MediaMatcher,
        public mosaicService: MosaicService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.mosaicService.getMosaicImages().then(
            mosaic_images => {
                this.mosaic_images = mosaic_images;
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
