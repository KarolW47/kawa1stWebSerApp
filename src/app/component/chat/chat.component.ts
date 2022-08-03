import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/interface/chat-message';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input('chosenUsername') usernameOfChosenUser: string = "";

  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.chatService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
  }

  sendMessage(sendMessageForm: NgForm) {
    let chatMessage!: ChatMessage;
    chatMessage.message = sendMessageForm.value.message;
    chatMessage.to = this.usernameOfChosenUser;
    this.chatService.sendMessage(chatMessage);
    sendMessageForm.controls['message'].reset();
  }
}
