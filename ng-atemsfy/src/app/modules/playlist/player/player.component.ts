import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/core/services/spotify/spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    devices;
    static play;
    track;
    player_control = {
        state_interval: undefined,
        percent_bar: '0%',
        paused: true,
        volume: 0
    }

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() {
        this.spotifyService.get('available_devices', {}, {}).subscribe(
            response => {
                this.devices = response.devices;
                this.setDevice();
            },
            error => {
                console.log(error);
            }
        );
    }

    setDevice() {
        window['start_player']().then(() => {
            PlayerComponent.play = ({
                spotify_uri,
                playerInstance: {
                    _options: {
                        getOAuthToken,
                        id
                    }
                }
            }) => {
                getOAuthToken(access_token => {
                    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${window['player_device_id']}`, {
                        method: 'PUT',
                        body: JSON.stringify({ uris: [spotify_uri] }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                });
            };

            window['player'].addListener('player_state_changed', (
                state => {
                    this.track = state.track_window.current_track;
                    if (this.player_control.state_interval === undefined) {
                        this.player_control.state_interval = setInterval(() => {
                            window['player'].getCurrentState().then(state => {
                                if (state) {
                                    this.player_control.paused = state.paused;
                                    this.player_control.percent_bar = `${(100 * state.position) / state.duration}%`;
                                }
                            });
                        }, 1000);
                    }
                })
            );

            window['player'].getVolume().then(volume => {
                this.player_control.volume = volume;
            });
        })
    }

    public playTrack(track_uri) {
        this.spotifyService.put('user_playback', {}, {
            uris: [track_uri]
        }, { device_id: window['player_device_id'] }).subscribe(
            response => { },
            error => { }
        );
    }
    
    public playContext(playlist_uri, offset = {}) {
        this.spotifyService.put('user_playback', {}, {
            context_uri: playlist_uri,
            offset: offset
        }, { device_id: window['player_device_id'] }).subscribe(
            response => { },
            error => { }
        );
    }

    public pause() {
        window['player'].pause().then(() => {
            this.player_control.paused = true;
        });
    }

    public resume() {
        window['player'].resume().then(() => {
            this.player_control.paused = false;
        });
    }

    public backward() {
        window['player'].previousTrack().then(() => { });
    }
    
    public forward() {
        window['player'].nextTrack().then(() => { });
    }

    public setVolume() {
        window['player'].setVolume(this.player_control.volume).then(() => { });
    }

}
