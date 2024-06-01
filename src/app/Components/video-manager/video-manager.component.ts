import { Component } from '@angular/core';

interface Video {
  url: string;
  name: string;
}

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.css']
})
export class VideoManagerComponent {
  videos: Video[] = [];
  selectedVideo: Video | null = null;

  importVideo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);

        if (!this.isDuplicate(file.name)) {
          this.videos.push({ url, name: file.name });
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
    if (this.selectedVideo) {
      console.log('Video confirmed:', this.selectedVideo.url);
      // Faça a manipulação necessária do vídeo aqui
    }
  }
}
