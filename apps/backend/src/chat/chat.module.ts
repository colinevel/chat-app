import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, JwtService],
})
export class ChatModule {}
