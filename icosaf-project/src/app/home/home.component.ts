// some.component.ts
import {Component, OnInit, ViewChild} from '@angular/core';
import {AgvModel} from '../../model/AgvModel';
import {MatDrawer} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  agvList: AgvModel[];

  @ViewChild('drawer', {static: null}) drawer: MatDrawer;

  title = 'AGV Omron + Cobot Omron con visione 2D (3D)';
  notifications = ['notifica 1', 'notifica 2', 'notifica 3', 'notifica 4'];

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.drawer.toggle(); /* tendina a sinistra*/
  }

  grafana() {
    window.open('http://grafanademo.cloud.reply.eu:3000/d/q1f7PXpWk/dtwin?orgId=1&from=1569576946035&to=1569598546035&theme=light');
  }

  logout() {
    this.router.navigate(['/Login']);
  }

  changeContent(s) {
    this.title = s;
  }
}

