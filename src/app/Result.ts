export interface Result {
  emotions: Emotions;
  time: string;
}

export interface Emotions{
  Engajamento: number;
  Tedio: number;
  Frustracao: number;
  Confusao: number;
}
