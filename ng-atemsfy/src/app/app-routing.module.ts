import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { RedirectComponent } from './core/services/auth/redirect/redirect.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { PlaylistListComponent } from './modules/playlist/playlist-list/playlist-list.component';
import { SearchComponent } from './modules/search/search.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'redirect', component: RedirectComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'playlist/playlist-list', component: PlaylistListComponent },
	{ path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
