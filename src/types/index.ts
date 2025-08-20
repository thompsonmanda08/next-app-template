import { JWTPayload } from 'jose';

export type Session = JWTPayload & {
  user?: any;
  accessToken: string | null;
};

export type PageProps = {
  params?: Promise<{ [key: string]: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type APIResponse = {
  success: boolean;
  message: string;
  data: any;
  status?: number;
  [x: string]: unknown;
};

export type ErrorState = {
  status?: boolean;
  message?: string;
  [x: string]: any;
};

export type GenericJSONB = {
  [x: string]: any;
};
