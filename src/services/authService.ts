import { ApiService } from './apiService';

interface AuthResponse {
  access_token: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  name: string;
  surname: string;
  password: string;
  isAdmin: boolean;
}

export class AuthService {
  static async signIn(email: string, password: string): Promise<AuthResponse> {
    return ApiService.post<AuthResponse, SignInData>('/auth/sign-in', {
      email,
      password,
    });
  }

  static async signUp(data: SignUpData): Promise<AuthResponse> {
    return ApiService.post<AuthResponse, SignUpData>('/auth/sign-up', data);
  }
}
