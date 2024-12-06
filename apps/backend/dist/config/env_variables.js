"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const zod_1 = require("zod");
exports.configSchema = zod_1.z.object({
    MONGODB_URI: zod_1.z.string().url(),
    PORT: zod_1.z.coerce.number().default(3000),
    JWT_SECRET: zod_1.z.string().min(1),
});
//# sourceMappingURL=env_variables.js.map