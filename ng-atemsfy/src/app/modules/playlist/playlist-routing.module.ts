import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PlaylistComponent } from './playlist.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistSearchComponent } from './playlist-search/playlist-search.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { PlaylistEditorComponent } from './playlist-editor/playlist-editor.component';

const routes: Routes = [
    {
        path: 'playlist', component: PlaylistComponent, children: [
            { path: 'list', component: PlaylistListComponent },
            { path: 'search', component: PlaylistSearchComponent },
            { path: 'editor', component: PlaylistEditorComponent },
            { path: ':playlist_id', component: PlaylistDetailsComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistRoutingModule { }
