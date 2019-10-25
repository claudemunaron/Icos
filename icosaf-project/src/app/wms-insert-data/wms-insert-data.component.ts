import { Component, OnInit } from '@angular/core';
import {AgvServiceService} from '../../api/agv-service.service';

@Component({
  selector: 'app-wms-insert-data',
  templateUrl: './wms-insert-data.component.html',
  styleUrls: ['./wms-insert-data.component.scss']
})
export class WmsInsertDataComponent implements OnInit {
  partNumber = '';
  amount: number;
  descr = '';

  constructor(private agv: AgvServiceService) { }

  ngOnInit() {
  }

  insertPartnumber() {
   this.agv.newFile(this.partNumber, this.descr, this.amount).subscribe(data => {
   console.log(data);
   });

  }

}
