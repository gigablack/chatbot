import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';
import {Message} from '../Interfaces/message.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styles: [`::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }`]
})
export class ChatComponent implements OnInit {

    messages: Message[] = [];
  constructor(private chatService: ChatService) { }

    sendMessage(event: any): void {
                this.chatService.sendMessage(this.messages, this.chatService.createMessageFromUser(event.message));
    }

  ngOnInit(): void {
  }

}
