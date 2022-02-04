import { CorsOptions } from "cors"

export const configs = {
  isProduction: process.env.NODE_ENV === 'production',
  database: process.env.DATABASE_URL as string,
  mailFrom: `noreply@${process.env.APP_HOSTNAME as string}`
}

export const corsOptions: CorsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
}