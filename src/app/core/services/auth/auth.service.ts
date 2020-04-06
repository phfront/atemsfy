import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { SpotifyService } from '../spotify/spotify.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userLogged = new Subject();

  constructor(
    public http: HttpClient,
    private spotifyService: SpotifyService
  ) {
    if (
      sessionStorage.access_token &&
      sessionStorage.expires_in &&
      sessionStorage.session_time &&
      sessionStorage.state &&
      sessionStorage.token_type &&
      sessionStorage.user_id
    ) {
      this.spotifyService.get('current_user', {}).pipe(take(1)).subscribe({
        next: () => {
          this.userLogged.next(true);
        }
      });
    }
  }

  auth() {
    let url = environment.urls.access_token();
    url += `?client_id=${environment.client_id}`;
    url += `&response_type=${environment.response_type}`;
    url += `&redirect_uri=${location.origin + environment.redirect_uri}`;
    url += `&state=${environment.state}`;
    url += `&scope=${environment.scope}`;
    window.location.replace(url);
  }
}
