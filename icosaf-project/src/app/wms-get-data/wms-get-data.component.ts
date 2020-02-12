import {Component, OnInit} from '@angular/core';
import {AgvServiceService} from '../../api/agv-service.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

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
  responseEdit: any;
  private readonly notifier: NotifierService;

  constructor(private agv: AgvServiceService, public router: Router,  notifierService: NotifierService) {
    this.notifier = notifierService;
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
    this.agv.edit(this.selectedPartNumber.toString(), this.amountResponse).subscribe(data => {
      console.log(data);
      this.responseEdit = data;
      if (this.responseEdit.affectedRows === 1) {
        this.notifier.notify('success', 'Success: data saved');
      } else {
        this.notifier.notify('error', 'Error:  data are not saved correctly');
      }
    });
  }

  logout() {
    this.router.navigate(['/Login']);
  }

}
