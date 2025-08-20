export type LoginPayload = {
  email: string;
  username?: string;
  password: string;
};
export type RegistrationPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  [x: string]: string;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  username: string;
  [x: string]: string;
};
