import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../interface/chat-message';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  webSocketEndpoint: string = 'http://localhost:8080/chat';
  topic: string = 'user';
  stompClient: any;
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

  connect() {
    console.log('Initialize chat connection');
    let ws = new SockJS(this.webSocketEndpoint);
    
    const _this = this;
    this.stompClient.connect(
      {},
       () => {
        this.stompClient.subscribe(this.topic,  (event: any) => {
          this.onMessageReceived(event);
        });
      },
      this.errorCallBack
    );
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Chat disconnected');
  }

  errorCallBack(error: string) {
    console.log('ErrorCallBack -> ' + error);
    console.log('Reconnecting...');
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  send(chatMessage: ChatMessage) {
    console.log('Sending message via WebSocket.');
    this.stompClient.send('/app', {}, JSON.stringify(chatMessage));
    this.chatMessages.push(chatMessage);
  }

  onMessageReceived(chatMessage: ChatMessage) {
    console.log('Message Recieved from Server: ' + chatMessage);
    this.chatMessages.push(chatMessage);
  }
}
