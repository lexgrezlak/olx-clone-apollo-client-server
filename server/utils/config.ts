import * as dotenv from 'dotenv';

dotenv.config();
let path;

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}

dotenv.config({ path });

export const MONGODB_URI: string = process.env.MONGODB_URI as string;
export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const CLOUDINARY_API_SECRET: string = process.env
  .CLOUDINARY_API_SECRET as string;
export const CLOUDINARY_API_KEY: string = process.env
  .CLOUDINARY_API_KEY as string;
export const CLOUDINARY_CLOUD_NAME: string = process.env
  .CLOUDINARY_CLOUD_NAME as string;
