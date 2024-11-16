import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Result } from 'src/app/Result';

@Injectable({
  providedIn: 'root',
})
export class ProcessingStateService {
  private progressMessageSubject = new BehaviorSubject<string>('');
  progressMessage$: Observable<string> = this.progressMessageSubject.asObservable();

  private resultsSubject = new BehaviorSubject<Result[]>([]);
  results$: Observable<Result[]> = this.resultsSubject.asObservable();

  updateProgressMessage(message: string) {
    this.progressMessageSubject.next(message);
  }

  addResult(result: Result) {
    const currentResults = this.resultsSubject.getValue();
    this.resultsSubject.next([...currentResults, result]);
  }

  clearResults() {
    this.resultsSubject.next([]);
    this.progressMessageSubject.next('')
  }
}
