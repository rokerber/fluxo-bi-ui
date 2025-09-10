import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para os totais (pode ser útil no futuro)
export interface DashboardSummary {
  totalRevenues: number;
  totalExpenses: number;
  balance: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'https://fluxo-bi-api.sp1.br.saveincloud.net.br/api/dashboard';

  constructor(private http: HttpClient) { }

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
  }
  getRevenueHistory(): Observable<TimeSeriesData[]> {
    return this.http.get<TimeSeriesData[]>(`${this.apiUrl}/revenue-history`);
  }
  getExpenseHistory(): Observable<TimeSeriesData[]> {
    return this.http.get<TimeSeriesData[]>(`${this.apiUrl}/expense-history`);
  }
}
