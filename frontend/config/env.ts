import 'server-only';
import { z } from 'zod';


const EnvSchema = z.object({
    ENV: z.enum(['dev', 'prod'], { error: 'ENV must be dev or prod' }),
    PORT: z.coerce.number().int().min(1).max(65535),
    SERVER_URL: z.string().url('SERVER_URL must be a valid URL'),
    NEXT_PUBLIC_API_BASE: z.string().url('NEXT_PUBLIC_API_BASE must be a valid URL'),
});

const envParsed = EnvSchema.parse(process.env);

export const config = {
    env: envParsed.ENV,               // 'dev' | 'prod'
    port: envParsed.PORT,             // number
    serverUrl: envParsed.SERVER_URL,  // string
    apiBase: envParsed.NEXT_PUBLIC_API_BASE, // string
} as const;


export const APP_NAME = 'firewalls_app' as const;
export const STRINGS = {
    serverStarting: `${APP_NAME} starting...`,
    serverReady: `${APP_NAME} ready`,
    serverError: `${APP_NAME} failed to start`,
} as const;
