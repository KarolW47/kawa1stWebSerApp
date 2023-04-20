import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../interface/chat-message';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  webSocketEndpoint: string = `${environment.apiUrl}/chat`;
  stompClient: any;
  usernameOfChosenUser!: string;
  usernameOfCurrentUser!: string;
  messageReceived = new BehaviorSubject<string>("");

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) {}

  getConversationHistory(username: string) {
    return this.http.get<ChatMessage[]>(
      `${environment.apiUrl}/chat_messages/user`,
      {
        params: new HttpParams().set('username', username),
        headers: this.tokenStorageService.getTokensAsHeaders(),
      }
    );
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
        this.stompClient.subscribe(
          '/user/' +
            this.tokenStorageService.getUserId() +
            '/' +
            this.usernameOfCurrentUser, 
          (resp: any) => {
            this.messageReceived.next(resp.body);
          }
        );
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
      '/app/chat/' + chatMessage.idOfReceiver + '/' + chosenUserUsername,
      {},
      JSON.stringify(chatMessage)
    );
    return chatMessage;
  }
}
