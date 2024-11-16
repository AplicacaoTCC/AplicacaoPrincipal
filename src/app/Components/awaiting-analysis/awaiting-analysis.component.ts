import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessingStateService } from 'src/app/services/processing-state.service';

@Component({
  selector: 'app-awaiting-analysis',
  templateUrl: './awaiting-analysis.component.html',
  styleUrls: ['./awaiting-analysis.component.css']
})
export class AwaitingAnalysisComponent implements OnInit, OnDestroy {
  processingMessage: string = '';
  private subscription!: Subscription;

  constructor(
    private processingStateService: ProcessingStateService,
    private cdr: ChangeDetectorRef  // Injeção do ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Inscreve-se nas atualizações de progresso para exibir na tela
    this.subscription = this.processingStateService.progressMessage$.subscribe(message => {
      this.processingMessage = message;
      console.log(message);
      this.cdr.detectChanges();  // Força a detecção de mudanças
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Evita vazamento de memória ao destruir o componente
  }
}

