import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

// material
import { AppMaterialModule } from './app.material';

// route
import { AppRoutingModule } from './app-routing.module';
import { PlaylistRoutingModule } from './modules/playlist/playlist-routing.module';

import { AppComponent } from './app.component';
import { RedirectComponent } from './core/services/auth/redirect/redirect.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { SearchComponent } from './modules/search/search.component';

// modules
import { PlaylistModule } from './modules/playlist/playlist.module';

@NgModule({
    declarations: [
        AppComponent,
        RedirectComponent,
        HomeComponent,
        LoginComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialModule,
        HttpClientModule,
        FormsModule,
        PlaylistModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
