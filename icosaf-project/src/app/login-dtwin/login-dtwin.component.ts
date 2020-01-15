import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {LoginService} from '../../api/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-dtwin',
  templateUrl: './login-dtwin.component.html',
  styleUrls: ['./login-dtwin.component.scss']
})
export class LoginDTWINComponent implements OnInit {

  username: string;
  password: string;

  requiredUsername = false;
  requiredPassword = false;
  responseLogin: any;
  unauthorized = false;

  elem: any;

  private readonly notifier: NotifierService;

  constructor(private loginService: LoginService, public router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

  }

  login() {
    if (!this.username) {
      this.requiredUsername = true;
    }
    if (!this.password) {
      this.requiredPassword = true;
    }

    if (this.requiredPassword || this.requiredUsername) {
      return;
    } else {

      /*this.loginService.login(this.username, this.password)
        .subscribe(response => {
            this.responseLogin = response;
            this.checkAccess();
          },
          err => {
            // this.modalService.open(this.demoBasic);
          });*/

      if (this.username.toString() === 'dtwin' && this.password.toString() === 'dtwin') {
        this.router.navigate(['/TrackingList', {}]);
      } else {
        // this.unauthorized = true;
        this.notifier.notify('error', 'Error:  Invalid username or password');
      }
    }
  }



  clearUsername() {
    this.requiredUsername = false;
  }

  clearPassword() {
    this.requiredPassword = false;
  }

}
