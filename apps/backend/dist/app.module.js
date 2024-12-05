"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_module_1 = require("./chat/chat.module");
const schema_1 = require("./config/schema");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
    onModuleInit() {
        mongoose_2.default.set('debug', true);
        mongoose_2.default.connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        });
        mongoose_2.default.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });
        mongoose_2.default.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [() => ({ ...process.env })],
                isGlobal: true,
                validate: (config) => {
                    const parsedConfig = schema_1.configSchema.safeParse(config);
                    if (!parsedConfig.success) {
                        throw new Error(`Configuration validation failed: ${parsedConfig.error}`);
                    }
                    return parsedConfig.data;
                },
            }),
            chat_module_1.ChatModule,
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map