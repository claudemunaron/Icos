import {Component, OnInit} from '@angular/core';
import {AgvServiceService} from '../../api/agv-service.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';



@Component({
  selector: 'app-wms-insert-data',
  templateUrl: './wms-insert-data.component.html',
  styleUrls: ['./wms-insert-data.component.scss']
})
export class WmsInsertDataComponent implements OnInit {
  partNumber = '';
  amount: number;
  descr = '';
  responseInsert: any;
  private readonly notifier: NotifierService;

  constructor(private agv: AgvServiceService, public router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
  }

  insertPartnumber() {
    if(Number.isInteger(Number(this.amount)) && (this.partNumber!='') && (this.amount.toString() != '')){
      this.agv.insert(this.partNumber, this.descr, this.amount).subscribe(data => {
        this.responseInsert = data;
        if (this.responseInsert.amount === this.amount &&
          this.responseInsert.det_short_id === this.partNumber && this.responseInsert.description === this.descr) {
          this.notifier.notify('success', 'Success: data saved');
        } else {
          this.notifier.notify('error', 'Error:  data are not saved correctly - check if it is a duplicate Part number');
        }
      });
    }
    else {
      this.notifier.notify('error', 'Error:  \'Part number\' must be not empty and \'amount\' an integer value');
    }
  }



  gomenu() {
    this.router.navigate(['/IcosafHome', {}]);
  }

  logout() {
    this.router.navigate(['/Login']);
  }

}
