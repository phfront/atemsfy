import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules
import { PlaylistComponent } from './playlist.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistSearchComponent } from './playlist-search/playlist-search.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';

// route
import { PlaylistRoutingModule } from './playlist-routing.module';

// material
import { AppMaterialModule } from '../../app.material';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		PlaylistRoutingModule,
		AppMaterialModule,
		FormsModule
	],
	exports: [],
	declarations: [
		PlaylistComponent,
		PlaylistListComponent,
		PlaylistSearchComponent,
		PlaylistDetailsComponent
	],
	providers: []
})
export class PlaylistModule {

}