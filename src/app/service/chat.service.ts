import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../interface/chat-message';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getConversationHistory(username: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/chat_message/user`, {
        params: new HttpParams().set('username', username),
        headers: this.tokenStorageService.getAccessToken(),
      })
      .subscribe({
        next: (resp) => {
          this.chatMessages = resp;
        },
        error: (error) => {
          console.error(
            'Something went wrong, status code:' +
              error.status +
              ', error message:' +
              error.error
          );
          alert('Something bad happened, try again later.');
        },
      });
  }

  openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      let chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessage: ChatMessage) {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
