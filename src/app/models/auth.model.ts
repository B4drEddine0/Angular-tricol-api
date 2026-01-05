export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  enabled: boolean;
  createdAt: string;
}

export interface Permission {
  name: string;
  granted: boolean;
  source: 'ROLE' | 'CUSTOM';
}
