import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-agv',
  templateUrl: './settings-agv.component.html',
  styleUrls: ['./settings-agv.component.scss']
})
export class SettingsAgvComponent implements OnInit {

  constructor(public router: Router) {
  }

  nAgv: number;

  ngOnInit() {
    this.nAgv = +localStorage.getItem('nAGV') ;
  }

  logout() {
    this.router.navigate(['/LoginDTWIN']).then(r => console.log('logout' + r));
  }

  home() {
    this.router.navigate(['/TrackingList']);
  }

  updateAGV() {
    localStorage.setItem('nAGV', '' + this.nAgv);
  }
}
