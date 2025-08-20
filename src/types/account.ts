export type LoginPayload = {
  email: string;
  username?: string;
  password: string;
};
export type RegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  [x: string]: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  username: string;
  [x: string]: string;
};

// Additional types for template
export interface AccountOwner {
  id: string;
  name: string;
  email: string;
  role: string;
}
