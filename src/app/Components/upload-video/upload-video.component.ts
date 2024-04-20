import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      console.error('Nenhum arquivo selecionado');
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
