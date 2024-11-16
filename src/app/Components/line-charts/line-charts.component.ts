import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.css']
})
export class LineChartsComponent implements OnInit {
  public chartOptions: ChartOptions;

  constructor(private resultsService: ResultsService) {
    // Inicializa as opções do gráfico
    this.chartOptions = {
      series: [
        { name: 'Boredome', data: [] },
        { name: 'Confusion', data: [] },
        { name: 'Engaged', data: [] },
        { name: 'Frustration', data: [] }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        type: 'numeric', // Define como numérico se o eixo X for baseado em valores numéricos
        title: { text: 'Tempo (segundos)' }
      },
      title: {
        text: 'Emotions over Time'
      }
    };
  }

  ngOnInit(): void {
    // Observa os dados do serviço e atualiza as séries
    this.resultsService.getProcessingUpdates().subscribe({
      next: (result) => {
        const updatedSeries = this.chartOptions.series.map((serie, index) => {
          const emotionData = this.mapEmotionByIndex(result.emotions, index);
          return {
            ...serie,
            data: [...(serie.data as any[]), { x: result.time, y: emotionData }]
          };
        });

        // Atualiza a propriedade da série
        this.chartOptions = {
          ...this.chartOptions,
          series: updatedSeries
        };
      },
      error: (err) => {
        console.error('Erro ao receber dados do backend:', err);
      }
    });
  }

  /**
   * Mapeia os índices das séries para as emoções corretas
   */
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
