export interface ChatMessage {
  id: number;
  message: string;
  from: string;
  to: string;
  sendDate: Date;
}
