import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    MONGODB_URI: z.ZodString;
    PORT: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    MONGODB_URI?: string;
    PORT?: number;
}, {
    MONGODB_URI?: string;
    PORT?: number;
}>;
