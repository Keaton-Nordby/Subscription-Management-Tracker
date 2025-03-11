import { config } from 'dotenv';

// eslint-disable-next-line no-undef
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  PORT,
  NODE_ENV, 
  DB_URI,
  JWT_SECRET,
  JWE_EXPIRES_IN, 


// eslint-disable-next-line no-undef
} = process.env;