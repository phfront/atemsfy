import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/core/services/spotify/spotify.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    static play;
    static track;
    static player_control = {
        ready: false,
        state_interval: undefined,
        percent_bar: '0%',
        paused: true,
        shuffle: false,
        volume: 0,
        volume_backup: 0.5
    };
    playerComponent = PlayerComponent;

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) { 
        if (event.keyCode === 173) { // AudioVolumeMute
            if (PlayerComponent.player_control.volume === 0) {
                PlayerComponent.player_control.volume = PlayerComponent.player_control.volume_backup;
            } else {
                PlayerComponent.player_control.volume = 0;
            }
            this.setVolume();
        } else if (event.keyCode === 174) { // AudioVolumeDown
            if (PlayerComponent.player_control.volume > 0) {
                PlayerComponent.player_control.volume -= 0.1;
                if (PlayerComponent.player_control.volume < 0) {
                    PlayerComponent.player_control.volume = 0;
                }
                this.setVolume();
            }
        } else if (event.keyCode === 175) { // AudioVolumeUp
            if (PlayerComponent.player_control.volume < 1) {
                PlayerComponent.player_control.volume += 0.1;
                if (PlayerComponent.player_control.volume > 1) {
                    PlayerComponent.player_control.volume = 1;
                }
                this.setVolume();
            }
        } else if (event.keyCode === 176) { // MediaTrackNext
            this.forward();
        } else if (event.keyCode === 177) { // MediaTrackPrevious
            this.backward();
        } else if (event.keyCode === 179) { // MediaPlayPause
            if (PlayerComponent.player_control.paused) {
                this.resume();
            } else {
                this.pause();
            }
            PlayerComponent.player_control.paused = !PlayerComponent.player_control.paused;
        }
    }

    constructor(
        public spotifyService: SpotifyService
    ) { }

    ngOnInit() { }

    startPlayer() {
        if (!window['player_ready']) {
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
                        PlayerComponent.track = state.track_window.current_track;
                        if (PlayerComponent.player_control.state_interval === undefined) {
                            PlayerComponent.player_control.state_interval = setInterval(() => {
                                window['player'].getCurrentState().then(state2 => {
                                    if (state2) {
                                        PlayerComponent.player_control.paused = state2.paused;
                                        PlayerComponent.player_control.percent_bar = `${(100 * state2.position) / state2.duration}%`;
                                        PlayerComponent.player_control.shuffle = state2.shuffle;
                                    }
                                });
                            }, 1000);
                        }
                    })
                );
                window['player'].getVolume().then(volume => {
                    PlayerComponent.player_control.volume = volume;
                    PlayerComponent.player_control.volume_backup = volume;
                });
                window['player_ready'] = true;
                document.getElementById('player_initializing').remove();
            });
        }
    }

    public playTrack(track_uri) {
        this.spotifyService.put('user_playback', {}, {
            uris: [track_uri]
        }, { device_id: window['player_device_id'] }).subscribe(
            response => { },
            error => { }
        );
    }

    public playContext(context_uri, offset = {}) {
        this.spotifyService.put('user_playback', {}, {
            context_uri: context_uri,
            offset: offset
        }, { device_id: window['player_device_id'] }).subscribe(
            response => { },
            error => { }
        );
    }

    public playArtist(artist_uri) {
        this.spotifyService.put('user_playback', {}, {
            context_uri: artist_uri
        }, { device_id: window['player_device_id'] }).subscribe(
            response => { },
            error => { }
        );
    }

    public pause() {
        window['player'].pause().then(() => {
            PlayerComponent.player_control.paused = true;
        });
    }

    public resume() {
        window['player'].resume().then(() => {
            PlayerComponent.player_control.paused = false;
        });
    }

    public backward() {
        window['player'].previousTrack().then(() => { });
    }

    public forward() {
        window['player'].nextTrack().then(() => { });
    }

    public shuffle() {
        PlayerComponent.player_control.shuffle = !PlayerComponent.player_control.shuffle;
        this.spotifyService.put('shuffle', {}, {}, {
            state: PlayerComponent.player_control.shuffle
        }).subscribe(
            response => { },
            error => { }
        )
    }

    public setVolume() {
        if (PlayerComponent.player_control.volume > 0) {
            PlayerComponent.player_control.volume_backup = PlayerComponent.player_control.volume;
        }
        window['player'].setVolume(PlayerComponent.player_control.volume).then(() => { });
    }

}
