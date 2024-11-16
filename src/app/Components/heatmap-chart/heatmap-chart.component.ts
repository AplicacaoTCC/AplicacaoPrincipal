import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ApexPlotOptions, ApexDataLabels, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: { name: string; data: { x: number; y: string; value: number }[] }[];
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.css']
})
export class HeatmapChartComponent implements OnInit {
  public chartOptions: ChartOptions;

  constructor(private resultsService: ResultsService) {
    this.chartOptions = {
      series: [
        { name: 'Boredome', data: [] },
        { name: 'Confusion', data: [] },
        { name: 'Engaged', data: [] },
        { name: 'Frustration', data: [] }
      ],
      chart: {
        type: 'heatmap',
        height: 350
      },
      title: {
        text: 'Academic Emotions Heatmap'
      },
      xaxis: {
        title: { text: 'Time (seconds)' }
      },
      yaxis: {
        title: { text: 'Emotions' },
        labels: {
          formatter: (value) => value.toString()
        }
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              { from: 0, to: 10, color: '#f4f4f4', name: 'Very Low' },
              { from: 11, to: 30, color: '#ffe0b2', name: 'Low' },
              { from: 31, to: 70, color: '#ffb74d', name: 'Moderate' },
              { from: 71, to: 100, color: '#e65100', name: 'High' }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        y: {
          formatter: (value) => `${value}%`
        }
      }
    };
  }

  ngOnInit(): void {
    this.resultsService.getProcessingUpdates().subscribe({
      next: (result) => {
        const time = result.time;

        // Adiciona os valores normalizados das emoções ao heatmap
        const emotions = result.emotions;
        const total = emotions.Tedio + emotions.Confusao + emotions.Engajamento + emotions.Frustracao;

        this.chartOptions.series[0].data.push({ x: Number(time), y: 'Boredome', value: this.normalize(emotions.Tedio, total) });
        this.chartOptions.series[1].data.push({ x: Number(time), y: 'Confusion', value: this.normalize(emotions.Confusao, total) });
        this.chartOptions.series[2].data.push({ x: Number(time), y: 'Engaged', value: this.normalize(emotions.Engajamento, total) });
        this.chartOptions.series[3].data.push({ x: Number(time), y: 'Frustration', value: this.normalize(emotions.Frustracao, total) });

        this.chartOptions = { ...this.chartOptions }; // Garante reatividade
      },
      error: (err) => {
        console.error('Erro ao receber dados do backend:', err);
      }
    });
  }

  /**
   * Normaliza um valor em porcentagem baseado no total.
   */
  private normalize(value: number, total: number): number {
    return total ? Math.round((value / total) * 100) : 0;
  }
}
