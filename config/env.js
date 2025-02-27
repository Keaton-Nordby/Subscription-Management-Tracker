import { config } from 'dotenv';

// eslint-disable-next-line no-undef
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  PORT, NODE_ENV, DB_URI
// eslint-disable-next-line no-undef
} = process.env;