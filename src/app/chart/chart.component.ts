import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chart = [];

  constructor(private http: HttpClient) {
  }

  dailyForecast() {
    return this.http.get('http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22');
  }

  public ngOnInit(): void {
    this.dailyForecast()
      .subscribe(res => {

        const templMax = res['list'].map(res => res.main.temp_max)
        const tempMin = res['list'].map(res => res.main.temp_min)
        const alldates = res['list'].map(res => res.dt)

        const weatherDates = []
        alldates.forEach((res1) => {
          const jsdate = new Date(res1 * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: templMax,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: tempMin,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });

      });
  }
}
