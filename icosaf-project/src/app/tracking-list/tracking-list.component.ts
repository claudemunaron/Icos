import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BaseChartDirective} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartPoint, ChartType} from 'chart.js';
import {Router} from '@angular/router';
import {AgvServiceService} from '../../api/agv-service.service';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  number: string;
}

@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.scss']
})

export class TrackingListComponent implements OnInit {

  @ViewChild('drawer', {static: null}) drawer: MatDrawer;
  @ViewChild(BaseChartDirective, {static: null}) lineChart: BaseChartDirective;

  selectId: number;
  selection: number;
  showDetails = false;
  data: any;
  nAgv: number;
  number: string;

  chartData: { x: number, y: number, z: number }[] = [];
  chartData2: { x: number, y: number, z: number }[] = [];
  chartData3: { x: number, y: number, z: number }[] = [];
  chartData4: { x: number, y: number, z: number }[] = [];

  chartdinamic: Array<ChartDataSets[]>;

  /* Contiene le coordinate attualmente sul grafico */
  position: { x: number, y: number, z: number };
  id = [];


  /*Scatter chart*/
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          max: 50
        }
      }],
      xAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 100,
          stepSize: 5
        }
      }]
    },
  };


  public scatterChartData: ChartDataSets[] = [
    {
      data: this.chartData,
      label: '',
      pointRadius: 5,
      showLine: true,
      backgroundColor: 'transparent',
      lineTension: 0,
      pointBackgroundColor: '#5dade2'
    },
  ];

  public scatterChartData2: ChartDataSets[] = [
    {
      data: this.chartData2,
      label: '',
      pointRadius: 7,
      showLine: true,
      backgroundColor: 'transparent',
      lineTension: 0,
      pointBackgroundColor: 'red'
    },
  ];

  public scatterChartData3: ChartDataSets[] = [
    {
      data: this.chartData3,
      label: '',
      pointRadius: 7,
      showLine: true,
      backgroundColor: 'transparent',
      lineTension: 0,
      pointBackgroundColor: 'blue'
    },

  ];

  public scatterChartData4: ChartDataSets[] = [
    {
      data: this.chartData4,
      label: '',
      pointRadius: 7,
      showLine: true,
      backgroundColor: 'transparent',
      lineTension: 0,
      pointBackgroundColor: 'orange'
    }];


  public scatterChartType: ChartType = 'scatter';

  constructor(public router: Router, private agv: AgvServiceService, public dialog: MatDialog) {
    this.selectId = 0;
    this.selection = 0;

    if (localStorage.getItem('nAGV') === null) {
      localStorage.setItem('nAGV', '' + 4);
    }

    this.nAgv = +JSON.parse(localStorage.getItem('nAGV'));

    this.id = [];
    for (let i = 0; i < this.nAgv; i++) {
      this.id.push(i);
    }


    this.chartdinamic = new Array<ChartDataSets[]>();
    for (const i of this.id) {
      const scatterChartData6: ChartDataSets[] = [{
        data: [],
        label: '' + i,
        pointRadius: 5,
        showLine: true,
        backgroundColor: 'transparent',
        lineTension: 0,
        pointBackgroundColor: '#5dade2'
      }];

      this.chartdinamic.push(scatterChartData6);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {number: this.number}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.number = result;
    });
  }


  ngOnInit() {
    this.updateData();
  }


  logout() {
    this.router.navigate(['/LoginDTWIN']).then(r => console.log('logout' + r));
  }

  settings() {
    this.router.navigate(['/SettingsAGV']);
  }


  /*Chart - aggiungere  al grafico */

  addData(data) {
    this.lineChart.chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
  }

  updateData() {
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.agv.digitalTwin())
      )
      .subscribe(
        res => {
          this.data = res;
          this.position = this.data.features.position.properties;

          const x = this.position.x;
          const y = this.position.y;
          const z = this.position.z;
          const id = this.data.features.id.properties.value;

          const chartPoints: ChartPoint = {x, y};
          if (this.id.includes(id) && this.chartdinamic[id][0] && !this.chartdinamic[id][0].data.some(e => e.x === x && e.y === y)) {
            // @ts-ignore
            this.chartdinamic[id][0].data.push(chartPoints);
          }
        }
      );
  }

  checkDuplicate(x, y, z, id) {
    this.position = {x, y, z};
    if (id === 1 && !this.chartData.some(e => e.x === x && e.y === y)) {
      this.chartData.push(this.position);
    } else if (id === 2 && !this.chartData2.some(e => e.x === x && e.y === y)) {
      this.chartData2.push(this.position);
    } else if (id === 3 && !this.chartData3.some(e => e.x === x && e.y === y)) {
      this.chartData3.push(this.position);
    } else if (id === 4 && !this.chartData4.some(e => e.x === x && e.y === y)) {
      this.chartData4.push(this.position);
    }
  }

  openDetail(i) {
    this.selectId = i;
    this.showDetails = true;
  }

  home() {
    this.showDetails = false;
  }

  refreshPath() {
    this.chartdinamic[this.selectId][0].data = [];
  }
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAGV() {
    if (Number(this.data.number) && Number(this.data.number) > 0) {
      localStorage.setItem('nAGV', '' + this.data.number);
      window.location.reload();
    } else {
      localStorage.setItem('nAGV', '' + 4);
    }
  }

  checkInputAGV() {
    if (!Number(this.data.number) || Number(this.data.number) <= 0) {
      return true;
    }
  }
}



