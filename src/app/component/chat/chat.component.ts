import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  @Input('currentUserUsername') currentUserUsername!: string;
  sendMessageForm!: FormGroup;
  chatMessages: ChatMessage[] = [];

  constructor(
    private chatService: ChatService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chatService
      .getConversationHistory(this.chosenUser.username)
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

    this.chatService.connect(
      this.chosenUser.username,
      this.currentUserUsername
    );

    this.chatService.messageReceived.subscribe({
      next: (message) => {
        let jsnObj = JSON.parse(message);
        let recMess: ChatMessage = jsnObj as ChatMessage;
        console.error(recMess);
        this.chatMessages.push(recMess);
        console.log('Message Recieved from Server: ' + recMess);
      },
      error: (err) => console.log(err),
    });

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
      usernameOfReceiver: this.chosenUser.username,
      sentDate: new Date(),
      idOfSender: this.tokenStorageService.getUserId(),
      usernameOfSender: this.currentUserUsername,
    };
    this.chatService.send(chatMessage, this.chosenUser.username);
    this.chatMessages.push(chatMessage);
    this.sendMessageForm.controls['message'].reset();
  }

  checkProfile(id: number) {
    this.router.navigate(['/user_profile/' + id]);
  }
}
