import { ApiService } from './apiService';

export interface Train {
  id?: string;
  name: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
}

export class TrainService {
  static async createTrain(train: Train): Promise<Train> {
    return ApiService.post('/train', train);
  }

  static async getAll(): Promise<Train[]> {
    return ApiService.get<Train[]>('/train');
  }

  static async getById(id: string): Promise<Train> {
    return ApiService.get<Train>(`/train/${id}`);
  }

  static async updateTrainDetails(
    id: string,
    trainDetails: Train
  ): Promise<Train> {
    return ApiService.put<Train, Train>(`/train/${id}`, trainDetails);
  }

  static async deleteTrain(id: string): Promise<object> {
    return ApiService.delete<object>(`/train/${id}`);
  }
}
