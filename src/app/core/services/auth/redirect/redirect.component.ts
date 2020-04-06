import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.url
      .split('#')[1]
      .split('&')
      .map((item) => item.split('='))
      .forEach((param) => {
        sessionStorage[param[0]] = param[1];
      });
    sessionStorage.session_time = new Date().getTime();
    this.authService.userLogged.next(true);
    this.router.navigate(['home']);
  }
}
