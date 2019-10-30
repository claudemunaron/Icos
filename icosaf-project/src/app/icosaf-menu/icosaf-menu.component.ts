import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-icosaf-menu',
  templateUrl: './icosaf-menu.component.html',
  styleUrls: ['./icosaf-menu.component.scss']
})
export class IcosafMenuComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/Login']);
  }

  gotoInsertData() {
    this.router.navigate(['/WmsInsert']);
  }
  gotoVerifyAmpunt() {
    this.router.navigate(['/WmsGet']);
  }

}
