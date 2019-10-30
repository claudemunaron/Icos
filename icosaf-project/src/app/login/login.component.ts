import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../api/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  requiredUsername = false;
  requiredPassword = false;
  responseLogin: any;
  unauthorized = false;

  elem: any;

  constructor(private loginService: LoginService, public router: Router) {
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

      this.loginService.login(this.username, this.password)
        .subscribe(response => {
            this.responseLogin = response;
            this.checkAccess();
          },
          err => {
            // this.modalService.open(this.demoBasic);
          });
    }
  }

  checkAccess() {
    if ('success' === this.responseLogin.login) {
      this.router.navigate(['/IcosafHome', {}]);
    } else {
      this.unauthorized = true;
    }
  }
}
