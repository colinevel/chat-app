import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private messages: { sender: string; content: string; timestamp: Date }[] = [];

  saveMessage(message: { sender: string; content: string }): {
    sender: string;
    content: string;
    timestamp: Date;
  } {
    const timestampedMessage = { ...message, timestamp: new Date() };
    this.messages.push(timestampedMessage);
    return timestampedMessage;
  }

  getMessages(): { sender: string; content: string; timestamp: Date }[] {
    return this.messages;
  }
}
