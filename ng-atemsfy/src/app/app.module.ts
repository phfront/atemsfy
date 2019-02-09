import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedirectComponent } from './core/services/auth/redirect/redirect.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { PlaylistListComponent } from './modules/playlist/playlist-list/playlist-list.component';
import { SearchComponent } from './modules/search/search.component';

@NgModule({
	declarations: [
		AppComponent,
		RedirectComponent,
		HomeComponent,
		LoginComponent,
		PlaylistListComponent,
		SearchComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
