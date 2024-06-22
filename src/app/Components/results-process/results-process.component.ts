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

    result: Result = {
      id: 0,
      emotion: '',
      duration: '',
      accuracy: '',
    }

    constructor(private resultsService : ResultsService){
      this.getResults();
    }

    ngOnInit(): void {}

    removeResult(result: Result){
      console.log("Removendo resultado...");
      this.results = this.resultsService.remove(this.results, result);
    }

    getResults(): void {
     this.resultsService.getAll().subscribe((results) => (this.results = results));
    }
}
