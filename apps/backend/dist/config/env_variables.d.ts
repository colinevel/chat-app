import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    MONGODB_URI: z.ZodString;
    PORT: z.ZodDefault<z.ZodNumber>;
    JWT_SECRET: z.ZodString;
}, "strip", z.ZodTypeAny, {
    JWT_SECRET?: string;
    MONGODB_URI?: string;
    PORT?: number;
}, {
    JWT_SECRET?: string;
    MONGODB_URI?: string;
    PORT?: number;
}>;
