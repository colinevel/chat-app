import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ChatModule } from './chat/chat.module';
import { configSchema } from './config/schema';
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
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  }
}
