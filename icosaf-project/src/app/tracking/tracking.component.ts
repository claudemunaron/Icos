// some.component.ts
import {Component, OnInit, ViewChild} from '@angular/core';

import {MatDrawer} from '@angular/material';
import {Router} from '@angular/router';
import {AgvServiceService} from '../../api/agv-service.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  @ViewChild('drawer', {static: null}) drawer: MatDrawer;
  @ViewChild(BaseChartDirective, {static: null}) lineChart: BaseChartDirective;

  data: any;
  chartData: { x: number, y: number, z: number }[] = []; /* Contiene le coordinate attualmente sul grafico */
  position: { x: number, y: number, z: number };

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
          max: 100
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
      data: [],
      label: '',
      pointRadius: 10,
      showLine: true,
      backgroundColor: 'transparent',
      lineTension: 0,
      pointBackgroundColor: '#5dade2'
    },
  ];

  public scatterChartType: ChartType = 'scatter';

  constructor(public router: Router, private agv: AgvServiceService) {
  }

  ngOnInit() {
    this.updateData();
  }


  logout() {
    this.router.navigate(['/LoginDTWIN']);
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

          this.position = {x, y, z};
          if (!this.checkDuplicate(x, y)) {
            this.addData(this.position);
            this.chartData.push(this.position);
          }
        }
      );
  }

  checkDuplicate(x, y) {
    return this.chartData.some(e => e.x === x && e.y === y);
  }


  refreshPath() {
    this.lineChart.chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
      this.chartData = [];
    });
  }
}






