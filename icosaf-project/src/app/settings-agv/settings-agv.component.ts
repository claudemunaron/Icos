import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

export interface DialogData {
  number: string;

}

@Component({
  selector: 'app-settings-agv',
  templateUrl: './settings-agv.component.html',
  styleUrls: ['./settings-agv.component.scss']
})
export class SettingsAgvComponent implements OnInit {
  number: string;
  nAgv: number;

  constructor(public router: Router, public dialog: MatDialog) {
  }


  ngOnInit() {
    this.nAgv = +localStorage.getItem('nAGV');
  }

  logout() {
    this.router.navigate(['/LoginDTWIN']);
  }

  home() {
    this.router.navigate(['/TrackingList']);
  }

  updateAGV() {
    localStorage.setItem('nAGV', '' + this.nAgv);
  }
}


