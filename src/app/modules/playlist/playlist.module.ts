import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

// modules
import { PlaylistComponent } from './playlist.component';
import { PlaylistSearchComponent } from './playlist-search/playlist-search.component';
import { PlaylistEditorComponent } from './playlist-editor/playlist-editor.component';

// route
import { PlaylistRoutingModule } from './playlist-routing.module';

// material
import { AppMaterialModule } from '../../app.material';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaylistEditorHeaderComponent } from './playlist-editor/playlist-editor-header/playlist-editor-header.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    PlaylistRoutingModule,
    AppMaterialModule,
    FormsModule,
    LayoutModule,
  ],
  exports: [],
  declarations: [
    PlaylistComponent,
    PlaylistSearchComponent,
    PlaylistEditorComponent,
    PlaylistEditorHeaderComponent,
  ],
  providers: [],
})
export class PlaylistModule {}
