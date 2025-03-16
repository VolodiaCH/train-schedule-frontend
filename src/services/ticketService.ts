import { ApiService } from './apiService';
import { Train } from './trainService';

export interface Ticket {
  userId: string;
  trainId: string;
}

export class TicketService {
  static async getUserTickets(): Promise<Train[]> {
    return ApiService.get<Train[]>('/ticket');
  }

  static async bookTicket(trainId: string): Promise<Ticket> {
    return ApiService.post('/ticket', { trainId });
  }

  static async unbookTicket(trainId: string): Promise<Ticket> {
    return ApiService.delete(`/ticket/${trainId}`);
  }

  static async isBooked(trainId: string): Promise<boolean> {
    return ApiService.get(`/ticket/booked/${trainId}`);
  }
}
