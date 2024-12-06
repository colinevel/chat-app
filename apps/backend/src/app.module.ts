import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { configSchema } from './config/env_variables';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({ ...process.env })],
      isGlobal: true,
      validate: (config) => {
        const parsedConfig = configSchema.safeParse(config);

        if (!parsedConfig.success) {
          throw new Error(
            `Configuration validation failed: ${parsedConfig.error}`,
          );
        }

        return parsedConfig.data;
      },
    }),

    ChatModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    mongoose.set('debug', true);
  }
}
