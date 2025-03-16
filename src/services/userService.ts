import { ApiService } from './apiService';

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: 'USER' | 'ADMIN';
}

export class UserService {
  static async getProfile(): Promise<User> {
    return ApiService.get<User>('/user/me');
  }

  // not used yet
  static async setRole(uid: string, isAdmin: boolean): Promise<User> {
    return ApiService.patch('/user/update-role', { uid, isAdmin });
  }

  static async updateNames(name: string, surname: string): Promise<User> {
    return ApiService.patch('/user/update-names', { name, surname });
  }
}
