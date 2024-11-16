export interface Result {
  emotions: Emotions;
  time: string;
  frame: string;
  message: string;
}

export interface Emotions{
  Engajamento: number;
  Tedio: number;
  Frustracao: number;
  Confusao: number;
}
