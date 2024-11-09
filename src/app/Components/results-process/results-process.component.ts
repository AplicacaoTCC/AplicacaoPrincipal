import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result, Emotions } from 'src/app/Result';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-results-process',
  templateUrl: './results-process.component.html',
  styleUrls: ['./results-process.component.css']
})
export class ResultsProcessComponent implements OnInit {
  results: Result[] = [];
  basicData: any;
  options: any;
  paginatedResults: Result[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  sortColumn: 'time' | keyof Emotions = 'time'; // Default sort column
  sortDirection: 'desc' | 'asc' = 'desc';

  constructor(private router: Router) {
    // Retrieve navigation state data
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: any };

    if (state && state.data && state.data.results) {
      this.results = state.data.results as Result[];
      this.totalPages = Math.ceil(this.results.length / this.itemsPerPage);
      this.sortData(this.sortColumn); // Sort by time initially
      this.updatePaginatedResults();  // Update pagination on initial load
    }
  }

  ngOnInit(): void {
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Probabilidade Média (%)'
          }
        }
      }
    };

    if (this.results.length > 0) {
      this.prepareChartData(this.results);
    }
  }

  // Update paginated results based on the current page
  updatePaginatedResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResults = this.results.slice(startIndex, endIndex);
  }

  // Go to the previous page if not on the first page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedResults();
    }
  }

  // Go to the next page if not on the last page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedResults();
    }
  }

  // Sort the data based on the selected column
  sortData(column: 'time' | keyof Emotions) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }

    this.results.sort((a, b) => {
      // Convert time to seconds if the column is 'time'
      const valueA = column === 'time' ? this.timeToSeconds(a[column]) : parseFloat(a.emotions[column as keyof Emotions].toString());
      const valueB = column === 'time' ? this.timeToSeconds(b[column]) : parseFloat(b.emotions[column as keyof Emotions].toString());

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.updatePaginatedResults();
  }

  // Convert time in 'mm:ss' format to seconds
  timeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(part => parseInt(part, 10));
    return minutes * 60 + seconds;
  }

  // Prepare data for the chart
  prepareChartData(results: Result[]) {
    const emotionTotals: { [key in keyof Emotions]: number } = {
      Engajamento: 0,
      Tedio: 0,
      Frustracao: 0,
      Confusao: 0
    };
    const emotionCounts: { [key in keyof Emotions]: number } = {
      Engajamento: 0,
      Tedio: 0,
      Frustracao: 0,
      Confusao: 0
    };

    results.forEach(result => {
      const emotions = result.emotions;
      for (const [emotion, value] of Object.entries(emotions) as [keyof Emotions, number][]) {
        emotionTotals[emotion] += value;
        emotionCounts[emotion] += 1;
      }
    });

    const emotionLabels = {
      Engajamento: 'Engajamento',
      Tedio: 'Tédio',
      Frustracao: 'Frustração',
      Confusao: 'Confusão'
    };

    const emotionAverages = Object.keys(emotionTotals).map(emotion => ({
      emotion: emotionLabels[emotion as keyof Emotions],
      average: emotionTotals[emotion as keyof Emotions] / emotionCounts[emotion as keyof Emotions]
    }));

    this.basicData = {
      labels: emotionAverages.map(e => e.emotion),
      datasets: [
        {
          label: 'Probabilidade Média (%)',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: emotionAverages.map(e => e.average.toFixed(2))
        }
      ]
    };
  }

  // Get a list of emotions with their values for a result
  getEmotionList(emotions: Emotions): { name: string; value: number }[] {
    const emotionLabels = {
      Engajamento: 'Engajamento',
      Tedio: 'Tédio',
      Frustracao: 'Frustração',
      Confusao: 'Confusão'
    };
    return Object.entries(emotions).map(([key, value]) => ({
      name: emotionLabels[key as keyof Emotions],
      value
    }));
  }

  // Export results to CSV
  exportToCSV() {
    const csvContent = this.convertToCSV(this.results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'resultados_emocoes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Convert results to CSV format
  convertToCSV(results: Result[]): string {
    const headers = ['Tempo', 'Confusão (%)', 'Engajamento (%)', 'Frustração (%)', 'Tédio (%)'];
    const rows = results.map(result => [
      result.time,
      result.emotions.Confusao.toFixed(2),
      result.emotions.Engajamento.toFixed(2),
      result.emotions.Frustracao.toFixed(2),
      result.emotions.Tedio.toFixed(2)
    ]);

    const csvRows = [headers, ...rows].map(e => e.join(',')).join('\n');
    return csvRows;
  }
}
