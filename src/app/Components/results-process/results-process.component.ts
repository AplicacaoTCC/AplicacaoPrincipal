import { Component, OnInit } from '@angular/core';

import { Result } from 'src/app/Result';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-results-process',
  templateUrl: './results-process.component.html',
  styleUrls: ['./results-process.component.css']
})
export class ResultsProcessComponent implements OnInit{
    results: Result[] = [];

    basicData: any;
    options: any;

    result: Result = {
      id: 0,
      emotion: '',
      duration: '',
      accuracy: '',
    }

    constructor(private resultsService : ResultsService){
      
    }

    ngOnInit(): void {
        this.options = {
        responsive: true,
        maintainAspectRatio: false
      };
  
        this.resultsService.getAll().subscribe(results => {
        this.results = results;
        this.prepareChartData(results);
          
        });
      
    }

    removeResult(result: Result){
      this.results = this.resultsService.remove(this.results, result);
    }

    prepareChartData(results: Result[]) {
      const emotions = results.map(result => result.emotion);
      const durations = results.map(result => parseFloat(result.duration));
  
      this.basicData = {
        labels: emotions,
        datasets: [
          {
            label: 'Duration',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: durations
          }
        ]
      };
    }
}
