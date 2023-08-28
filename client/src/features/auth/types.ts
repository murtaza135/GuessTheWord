export type TokenResponse = {
  token: string;
};

export type ProfileResponse = {
  userId: number;
  name?: string;
  email?: string;
  image?: string;
};

export type AccountsResponse = {
  localAccount?: {
    username: string;
  };
  oAuthAccounts: {
    username: string | null;
    provider: string;
  }[];
};