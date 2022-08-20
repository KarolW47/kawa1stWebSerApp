import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ChatMessage } from 'src/app/interface/chat-message';
import { User } from 'src/app/interface/user';
import { ChatService } from 'src/app/service/chat.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input('chosenUser') chosenUser!: User;
  sendMessageForm!: FormGroup;

  constructor(
    public chatService: ChatService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.sendMessageForm = this.formBuilder.group({
      message: [''],
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage() {
    let chatMessage: ChatMessage = {
      id: undefined,
      message: this.sendMessageForm.get('message')?.value,
      idOfReceiver: this.chosenUser.id,
      idOfSender: this.tokenStorageService.getUserId(),
    };
    this.chatService.send(chatMessage);
    this.sendMessageForm.controls['message'].reset();
  }
}