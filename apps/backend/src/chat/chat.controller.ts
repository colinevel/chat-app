import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api/chat')
export class ChatController {
  private messages: { sender: string; content: string }[] = [];

  @Post('send')
  sendMessage(@Body() message: { sender: string; content: string }) {
    this.messages.push(message);
    return { message: 'Message sent successfully!' };
  }

  @Get('messages')
  getMessages() {
    return this.messages;
  }
}
