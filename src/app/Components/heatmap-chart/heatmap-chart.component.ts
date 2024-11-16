import { Component, OnInit } from '@angular/core';
import { ProcessingStateService } from '../../services/processing-state.service';
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

  constructor(private processingStateService: ProcessingStateService) {
    this.chartOptions = {
      series: [
        { name: 'Tédio', data: [] },
        { name: 'Confusão', data: [] },
        { name: 'Engajamento', data: [] },
        { name: 'Frustração', data: [] }
      ],
      chart: {
        type: 'heatmap',
        height: 350
      },
      title: {
        text: 'Mapa de Calor das Emoções'
      },
      xaxis: {
        title: { text: 'Tempo (segundos)' },
        labels: {
          formatter: (value) => `${value}s`
        }
      },
      yaxis: {
        title: { text: 'Emoções' },
        labels: {
          formatter: (value) => value.toString()
        }
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              { from: 0, to: 24, color: '#f4f4f4', name: 'Muito Baixo' },
              { from: 25, to: 49, color: '#ffe0b2', name: 'Baixo' },
              { from: 50, to: 74, color: '#ffb74d', name: 'Moderado' },
              { from: 75, to: 100, color: '#e65100', name: 'Alto' }
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
    this.processingStateService.results$.subscribe({
      next: (results) => {
        const updatedSeries = [...this.chartOptions.series];
        console.log(updatedSeries)
        results.forEach((result) => {
          const tempo = this.parseTimeToSeconds(result.time);

          // Adiciona os valores normalizados das emoções ao heatmap
          const emocoes = result.emotions;
          const total = emocoes.Tedio + emocoes.Confusao + emocoes.Engajamento + emocoes.Frustracao;

          updatedSeries[0].data.push({ x: tempo, y: 'Tédio', value: this.normalizar(emocoes.Tedio, total) });
          updatedSeries[1].data.push({ x: tempo, y: 'Confusão', value: this.normalizar(emocoes.Confusao, total) });
          updatedSeries[2].data.push({ x: tempo, y: 'Engajamento', value: this.normalizar(emocoes.Engajamento, total) });
          updatedSeries[3].data.push({ x: tempo, y: 'Frustração', value: this.normalizar(emocoes.Frustracao, total) });
        });

        this.chartOptions.series = updatedSeries; // Atualiza a série
      },
      error: (err) => {
        console.error('Erro ao receber dados do backend:', err);
      }
    });
  }

  /**
   * Normaliza um valor em porcentagem baseado no total.
   */
  private normalizar(valor: number, total: number): number {
    return total ? Math.round((valor / total) * 100) : 0;
  }

  /**
   * Converte o tempo no formato "MM:SS" para segundos.
   */
  private parseTimeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map((part) => parseInt(part, 10));
    return minutes * 60 + seconds;
  }
}
