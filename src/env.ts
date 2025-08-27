import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const envString = z.string().min(1);

export const env = createEnv({
  server: {
    DATABASE_URL: envString,
    CLERK_SECRET_KEY: envString,
    BLOB_READ_WRITE_TOKEN: envString,
    GEMINI_API_KEY: envString,
    STRIPE_SECRET_KEY: envString,
    STRIPE_WEBHOOK_SECRET: envString,
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: envString,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: envString,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: envString,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: envString,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY: envString,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: envString,
    NEXT_PUBLIC_BASE_URL: envString.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
