import { Component, OnInit } from '@angular/core';
import {AgvServiceService} from '../../api/agv-service.service';

@Component({
  selector: 'app-wms-get-data',
  templateUrl: './wms-get-data.component.html',
  styleUrls: ['./wms-get-data.component.scss']
})
export class WmsGetDataComponent implements OnInit {


  details: any;
  amountResponse: any;
  selectedPartNumber = '';

  constructor(private agv: AgvServiceService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.agv.getList().subscribe(data => {
      console.log(data);
      this.details = data;
    });
  }

  getAmount() {
    this.agv.getAmount(this.selectedPartNumber.toString()).subscribe(data => {
      console.log(data);
      this.amountResponse = data[0].amount;

    });
  }

}
