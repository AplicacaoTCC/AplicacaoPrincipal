import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  frames: { url: string; time: string }[] = [];

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.resultsService.getHighlightedFrames().subscribe(frames => {
      this.frames = frames;
    });
  }
}
