import {Component, OnInit} from '@angular/core';
import {AgvServiceService} from '../../api/agv-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wms-get-data',
  templateUrl: './wms-get-data.component.html',
  styleUrls: ['./wms-get-data.component.scss']
})
export class WmsGetDataComponent implements OnInit {


  details: any;
  amountResponse: any;
  selectedPartNumber = '';
  editable = false;

  constructor(private agv: AgvServiceService, public router: Router) {
  }

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

  gomenu() {
    this.router.navigate(['/IcosafHome', {}]);
  }

  edit() {
    this.editable = true;
  }

  save() {
    this.editable = false;
  }

  logout() {
    this.router.navigate(['/Login']);
  }

}
