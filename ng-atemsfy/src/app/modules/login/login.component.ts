import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from '../../core/services/message/message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        public authService: AuthService,
        public messageService: MessageService
    ) { }

    ngOnInit() {
        this.messageService.success('teste', { position: 'top-right' });
        this.messageService.info('teste', { position: 'top-left' });
        this.messageService.warning('teste', { position: 'bottom-right' });
        this.messageService.error('teste', { position: 'bottom-left' });
    }

    login() {
        this.authService.auth();
    }

}
