export interface ChatMessage {
  id: number;
  message: string;
  usernameOfSender: string;
  usernameOfReceiver: string;
  sentDate: Date;
  idOfSender: number;
}
