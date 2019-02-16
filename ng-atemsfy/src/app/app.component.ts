import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
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
        'atemsfy-messages-right-center'
    ]

    constructor(
        public router: Router
    ) {
        setInterval(() => {
            this.updateRemainingSessionTime();
        }, 1000);
    }

    updateRemainingSessionTime() {
        let time = (Number(sessionStorage.session_time) + (Number(sessionStorage.expires_in) * 1000)) - new Date().getTime();
        time /= 1000;
        this.remaining_session_time = time.toFixed(0);
    }

    logout() {
        sessionStorage.access_token = undefined;
        sessionStorage.expires_in = undefined;
        sessionStorage.session_time = undefined;
        sessionStorage.state = undefined;
        sessionStorage.token_type = undefined;
        sessionStorage.user_id = undefined;
        window['player'].disconnect();
        this.router.navigate(['/login']);
    }

}
