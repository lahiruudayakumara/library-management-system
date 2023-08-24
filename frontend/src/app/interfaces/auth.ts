export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  isSucess: boolean;
  message: string;
}
