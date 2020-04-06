import { Component, OnInit, OnDestroy } from '@angular/core';
import { MosaicService } from 'src/app/core/services/mosaic/mosaic.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-atemsfy-mosaic-background',
  templateUrl: './atemsfy-mosaic-background.component.html',
  styleUrls: ['./atemsfy-mosaic-background.component.scss']
})
export class AtemsfyMosaicBackgroundComponent implements OnInit, OnDestroy {

  public mosaic_images: any;
  private $destroy = new Subject();

  constructor(
    public mosaicService: MosaicService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.userLogged.pipe(takeUntil(this.$destroy)).subscribe(
      logged => {
        if (logged) {
          this.getImages();
        }
      }
    )
  }

  async getImages() {
    try {
      this.mosaic_images = await this.mosaicService.getMosaicImages();
    } catch (error) {}
  }

  ngOnDestroy() {
    this.$destroy.complete();
    this.$destroy.unsubscribe();
  }

}
