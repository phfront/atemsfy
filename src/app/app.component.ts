import { PlayerComponent } from './modules/player/player.component';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-atemsfy';
  remaining_session_time;
  messages_containers = [
    'atemsfy-messages-top-left',
    'atemsfy-messages-top-right',
    'atemsfy-messages-bottom-left',
    'atemsfy-messages-bottom-right',
    'atemsfy-messages-top-center',
    'atemsfy-messages-bottom-center',
    'atemsfy-messages-left-center',
    'atemsfy-messages-right-center',
  ];
  @ViewChild('player') player_element;
  player_show = true;

  constructor(
    public router: Router,
    public playerComponent: PlayerComponent,
    private authService: AuthService
  ) {
    setInterval(() => {
      this.updateRemainingSessionTime();
    }, 1000);
    const player_element_init = setInterval(() => {
      if (this.player_element !== undefined) {
        this.player_element.nativeElement.style.transform =
          localStorage.player_element_position;
        clearInterval(player_element_init);
      }
    }, 1);
    this.startPlayer();
  }

  startPlayer() {
    const start_player_interval = setInterval(() => {
      if (window['start_player'] !== undefined) {
        clearInterval(start_player_interval);
        this.playerComponent.startPlayer();
      }
    }, 1);
  }

  updateRemainingSessionTime() {
    let time =
      Number(sessionStorage.session_time) +
      Number(sessionStorage.expires_in) * 1000 -
      new Date().getTime();
    time /= 1000;
    this.remaining_session_time = time.toFixed(0);
  }

  logout() {
    delete sessionStorage.access_token;
    delete sessionStorage.expires_in;
    delete sessionStorage.session_time;
    delete sessionStorage.state;
    delete sessionStorage.token_type;
    delete sessionStorage.user_id;
    window['player'].disconnect();
    this.authService.userLogged.next(false);
    this.router.navigate(['/login']);
  }

  public togglePlayer(flag) {
    this.player_show = flag;
  }

  playerDragEnd() {
    localStorage.player_element_position = this.player_element.nativeElement.style.transform;
  }
}
