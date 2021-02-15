import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from './Interfaces/message.interface';
import {Dto} from './Interfaces/dto.interface';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    constructor(private http: HttpClient) { }

    sendMessage(messages: Message[], message: Message): void {
        try {
            this.addMessage(messages, message);
            const response = this.http.post<Dto>(environment.apiUrl,
                JSON.stringify({message: message.message}),
                {headers: {'Content-Type': 'application/json'}});
            response.subscribe(dto =>  this.addMessage(messages, this.createMessageFromBot(dto)));

        } catch (err) {
            console.log(err);
        }
    }

    createMessageFromUser(msg: string): Message {
        const message: Message = {
            message: msg,
            type: 'text',
            sender: 'User',
            reply: true,
            date: Date(),
            avatar: ''
        };
        return message;

    }

    createMessageFromBot(dto: Dto): Message {
        const message: Message = {
            message: dto.message,
            reply: false,
            date: Date(),
            avatar: 'https://i.gifer.com/no.gif',
            type: 'text',
            sender: 'Doggie'
        };
        return message;
    }

    addMessage(messages: Message[], message: Message): void {
        messages.push(message);
    }
}
