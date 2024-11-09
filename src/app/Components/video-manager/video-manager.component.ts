import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa o Router para navegação
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
  isLoading: boolean = false; // Variável de estado de carregamento

  constructor(private http: HttpClient, private router: Router) { } // Injetar o Router

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

      this.isLoading = true; // Iniciar o estado de carregamento
      this.router.navigate(['/awaiting']); // Navegar para tela de "Aguardando Análise"

      this.http.post(`${this.apiUrl}/process_video`, formData)
        .subscribe(
          (response) => {
            console.log('Vídeo enviado com sucesso:', response);
            this.isLoading = false; // Terminar o carregamento
            // Redireciona para a tela de resultados com os dados de resposta
            this.router.navigate(['/results'], { state: { data: response } });
          },
          (error) => {
            console.error('Erro ao enviar o vídeo:', error);
            this.isLoading = false; // Terminar o carregamento em caso de erro
          }
        );
    }
  }
}
