import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_CONFIG, getApiUrl} from '../../config/api.config';

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

  constructor(private http: HttpClient) { }

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/summary`);
  }
  getRevenueHistory(): Observable<TimeSeriesData[]> {
    return this.http.get<TimeSeriesData[]>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/revenue-history`);
  }
  getExpenseHistory(): Observable<TimeSeriesData[]> {
    return this.http.get<TimeSeriesData[]>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/expense-history`);
  }
}
