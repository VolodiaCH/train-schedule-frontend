import { ApiService } from './apiService';

export interface Train {
  id?: string;
  name: string;
  departure: string;
  arrival: string;
  departureTime: Date;
  arrivalTime: Date;
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

  static async updateTrainDetails(trainDetails: Train): Promise<Train> {
    return ApiService.put<Train, Train>('/train/update-details', trainDetails);
  }

  static async deleteTrain(id: string): Promise<object> {
    return ApiService.delete<object>(`/train/${id}`);
  }
}
