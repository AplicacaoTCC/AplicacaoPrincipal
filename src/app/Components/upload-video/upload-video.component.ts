import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0]; // Definindo o arquivo selecionado
    }
    if (this.videoContainer && this.selectedFile) {
      const video = document.createElement('video');
      const videoURL = URL.createObjectURL(this.selectedFile);
      video.src = videoURL;
      video.controls = true;
      this.videoContainer.nativeElement.innerHTML = ''; // Limpa o conteúdo existente
      this.videoContainer.nativeElement.appendChild(video);
    }
  }

  uploadVideo() {
    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado');
      return;
    }
    const formData = new FormData();
    formData.append('video', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:5000/upload', formData)
      .subscribe(response => {
        console.log('Vídeo enviado com sucesso', response);
      }, error => {
        console.error('Erro ao enviar o vídeo', error);
      });
  }
}
