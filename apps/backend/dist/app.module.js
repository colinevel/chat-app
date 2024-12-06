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
const auth_module_1 = require("./auth/auth.module");
const chat_module_1 = require("./chat/chat.module");
const env_variables_1 = require("./config/env_variables");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
    onModuleInit() {
        mongoose_2.default.set('debug', true);
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
                    const parsedConfig = env_variables_1.configSchema.safeParse(config);
                    if (!parsedConfig.success) {
                        throw new Error(`Configuration validation failed: ${parsedConfig.error}`);
                    }
                    return parsedConfig.data;
                },
            }),
            chat_module_1.ChatModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
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