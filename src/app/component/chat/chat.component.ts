import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessage } from 'src/app/interface/chat-message';
import { ChatService } from 'src/app/service/chat.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input('chosenUsername') usernameOfChosenUser: string = "";

  constructor(public chatService: ChatService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.chatService.connect();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage(sendMessageForm: NgForm) {
    let chatMessage!: ChatMessage;
    chatMessage.message = sendMessageForm.value.message;
    chatMessage.usernameOfReceiver = this.usernameOfChosenUser;
    chatMessage.idOfSender = this.tokenStorageService.getUserId();
    this.chatService.send(chatMessage);
    sendMessageForm.controls['message'].reset();
  }
}
