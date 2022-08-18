import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ChatMessage } from 'src/app/interface/chat-message';
import { ChatService } from 'src/app/service/chat.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input('chosenUsername') usernameOfChosenUser: string = '';
  sendMessageForm!: FormGroup;

  constructor(
    public chatService: ChatService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.sendMessageForm = this.formBuilder.group({
      message: [null],
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage() {
    let chatMessage!: ChatMessage;
    chatMessage.message = this.sendMessageForm.value;
    chatMessage.usernameOfReceiver = this.usernameOfChosenUser;
    chatMessage.idOfSender = this.tokenStorageService.getUserId();
    this.chatService.send(chatMessage);
    // this.sendMessageForm.controls['message'].reset();
  }
}
