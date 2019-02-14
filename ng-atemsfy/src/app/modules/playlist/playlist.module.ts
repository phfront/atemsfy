import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules
import { PlaylistComponent } from './playlist.component';
import { PlaylistSearchComponent } from './playlist-search/playlist-search.component';
import { PlaylistEditorComponent } from './playlist-editor/playlist-editor.component';

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
		PlaylistSearchComponent,
		PlaylistEditorComponent
	],
	providers: []
})
export class PlaylistModule {

}