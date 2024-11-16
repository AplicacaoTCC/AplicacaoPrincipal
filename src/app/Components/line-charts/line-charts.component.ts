import { Component, OnInit } from '@angular/core';
import { ProcessingStateService } from '../../services/processing-state.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.css']
})
export class LineChartsComponent implements OnInit {
  public chartOptions: ChartOptions;

  constructor(private processingStateService: ProcessingStateService) {
    // Inicializa as opções do gráfico
    this.chartOptions = {
      series: [
        { name: 'Tédio', data: [] },
        { name: 'Confusão', data: [] },
        { name: 'Engajamento', data: [] },
        { name: 'Frustração', data: [] }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        type: 'numeric',
        title: { text: 'Tempo (segundos)' }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
          formatter: (val) => {
            if ([0, 25, 50, 75, 100].includes(val)) {
              return `${val}%`;
            }
            return '';
          }
        }
      },
      title: {
        text: 'Emoções ao longo do tempo'
      }
    };
  }

  ngOnInit(): void {
    this.processingStateService.results$.subscribe({
      next: (results) => {
        const updatedSeries = this.chartOptions.series.map((serie, index) => {
          const data = results.map((result) => ({
            x: result.time,
            y: this.mapEmotionByIndex(result.emotions, index)
          }));
          return { ...serie, data };
        });

        this.chartOptions = {
          ...this.chartOptions,
          series: updatedSeries
        };
      },
      error: (err) => {
        console.error('Erro ao receber dados do serviço de estado:', err);
      }
    });
  }

  private mapEmotionByIndex(emotions: any, index: number): any {
    switch (index) {
      case 0: return emotions.Tedio;
      case 1: return emotions.Confusao;
      case 2: return emotions.Engajamento;
      case 3: return emotions.Frustracao;
      default: return null;
    }
  }
}
