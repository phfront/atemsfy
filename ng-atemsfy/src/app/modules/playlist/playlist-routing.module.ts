import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { PlaylistComponent } from './playlist.component';
import { PlaylistSearchComponent } from './playlist-search/playlist-search.component';
import { PlaylistEditorComponent } from './playlist-editor/playlist-editor.component';

const routes: Routes = [
    {
        path: 'playlist', component: PlaylistComponent, children: [
            { path: 'search', component: PlaylistSearchComponent },
            { path: 'editor', component: PlaylistEditorComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistRoutingModule { }
