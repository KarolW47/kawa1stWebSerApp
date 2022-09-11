export interface ChatMessage {
  id?: number;
  message?: string;
  sentDate?: Date;
  usernameOfSender?: string;
  usernameOfReceiver?: string;
  idOfReceiver?: number;
  idOfSender?: number;
}
