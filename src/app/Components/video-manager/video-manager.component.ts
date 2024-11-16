import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProcessingStateService } from 'src/app/services/processing-state.service';
import { environment } from '../../../environments/environments';

interface Video {
  url: string;
  name: string;
  file: File;
}

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.css']
})
export class VideoManagerComponent {
  apiUrl = environment.apiUrl;
  videos: Video[] = [];
  selectedVideo: Video | null = null;
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private processingStateService: ProcessingStateService
  ) { }

  importVideo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        if (!this.isDuplicate(file.name)) {
          this.videos.push({ url, name: file.name, file });
        } else {
          alert('Este vídeo já foi adicionado.');
        }
      }
    };
    input.click();
  }

  isDuplicate(name: string): boolean {
    return this.videos.some(video => video.name === name);
  }

  removeVideo(index: number) {
    this.videos.splice(index, 1);
    if (this.selectedVideo && this.selectedVideo === this.videos[index]) {
      this.selectedVideo = null;
    }
  }

  selectVideo(video: Video) {
    this.selectedVideo = video;
  }

  confirmVideo() {
    if (this.selectedVideo && this.selectedVideo.file) {
      const formData = new FormData();
      formData.append('video', this.selectedVideo.file, this.selectedVideo.name);
      this.processingStateService.clearResults();
      this.isLoading = true;

      // Envia o vídeo com `HttpClient`
      this.http.post(`${this.apiUrl}/process_video`, formData).subscribe({
        next: () => {
          this.isLoading = false;
          // Navega para a tela de "Aguardando Análise" e inicia o stream
          this.router.navigate(['/awaiting']).then(() => {
            this.streamProcessingUpdates();
          });
        },
        error: (error) => {
          console.error('Erro ao enviar o vídeo:', error);
          this.isLoading = false;
        }
      });
    }
  }


  streamProcessingUpdates() {
    const eventSource = new EventSource(`${this.apiUrl}/process_video`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.frame) {
        // Atualiza a mensagem de progresso no serviço de estado
        this.processingStateService.updateProgressMessage(`Processando emoções do frame: ${data.frame}`);
        console.log("Passando frame:", data.frame);

        // Adiciona o resultado ao serviço
        this.processingStateService.addResult(data);
      }

      if (data.message === 'Processamento concluído') {
        // Fecha o EventSource e redireciona para a tela de resultados
        eventSource.close();
        console.log("Processamento concluído.");
        this.router.navigate(['/results']);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Erro ao receber atualizações:', error);
      eventSource.close();
    };
  }
}
