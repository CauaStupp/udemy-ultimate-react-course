export type UserSessionType = {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: UserType;
  weak_password: WeakPasswordType;
};

export type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: "authenticated" | "dennied";
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: {
    created_at: string;
    email: string;
    id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    identity_id: string;
    last_sign_in_at: string;
    provider: string;
    updated_at: string;
    user_id: string;
  }[];
  is_anonymous: boolean;
  last_sign_in_at: string;
  phone: string;
  role: "authenticated";
  updated_at: string;
  user_metadata: { email_verified: boolean };
};

export type WeakPasswordType = {
  message: string;
  reasons: string[];
};

export type CreateNewUserType = {
  full_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export type UpdateUserPasswordType = {
  password: string;
  password_confirm: string;
};

export type UpdateUserDataType = {
  full_name?: string;
  avatar?: File | null;
  password?: string;
};

export type UserLoginReturnType = {
  session: UserSessionType;
  user: UserType;
  weakPassword: WeakPasswordType;
};
