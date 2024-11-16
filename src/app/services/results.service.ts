import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Result } from '../Result';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHighlightedFrames(): Observable<{ url: string; time: string }[]> {
    return this.http.get<{ frames: { filename: string; url: string }[] }>(`${this.apiUrl}/highlighted_frames`).pipe(
      map(response => response.frames.map(frame => {
        const time = frame.filename.replace('.png', '');
        const formattedTime = `${time.slice(0, 2)}:${time.slice(2, 4)}`;
        return {
          url: `${this.apiUrl}${frame.url}`, // URL direta para o frame específico
          time: formattedTime
        };
      }))
    );
  }
  getProcessingUpdates(): Observable<Result> {
    return new Observable((observer) => {
      const eventSource = new EventSource(`${this.apiUrl}/process_video`);

      eventSource.onmessage = (event) => {
        const data: Result = JSON.parse(event.data);
        observer.next(data); // Envia o dado do frame ao Observable
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      return () => eventSource.close(); // Fecha o stream ao cancelar a inscrição
    });
  }
}
