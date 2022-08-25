import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../interface/chat-message';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  webSocketEndpoint: string = 'http://localhost:8080/chat';
  stompClient: any;
  usernameOfChosenUser!: string;
  usernameOfCurrentUser!: string;
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

  connect(chosenUserUsername: string, currentUserUsername: string) {
    console.log('Initialize chat connection');
    this.usernameOfChosenUser = chosenUserUsername;
    this.usernameOfCurrentUser = currentUserUsername;
    let ws = new SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      () => {
        this.stompClient.subscribe('/user/' + this.usernameOfCurrentUser, (resp: any) => {
          this.onMessageReceived(resp);
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
      this.connect(this.usernameOfChosenUser, this.usernameOfCurrentUser);
    }, 5000);
  }

  send(chatMessage: ChatMessage, chosenUserUsername: string) {
    this.stompClient.send(
      '/app/chat/' + chosenUserUsername,
      {},
      JSON.stringify(chatMessage)
    );
    this.chatMessages.push(chatMessage);
  }

  onMessageReceived(chatMessage: ChatMessage) {
    console.log('Message Recieved from Server: ' + chatMessage);
    this.chatMessages.push(chatMessage);
  }
}
