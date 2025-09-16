import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenue } from './revenue';
import {API_CONFIG, getApiUrl} from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private http: HttpClient) { }

  getRevenues(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS));
  }

  getRevenueById(id: number): Observable<Revenue> {
    return this.http.get<Revenue>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }

  createRevenue(revenue: Partial<Revenue>): Observable<Revenue> {
    return this.http.post<Revenue>(getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS), revenue);
  }

  updateRevenue(id: number, revenue: Partial<Revenue>): Observable<Revenue> {
    return this.http.put<Revenue>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`, revenue);
  }

  deleteRevenue(id: number): Observable<void> {
    return this.http.delete<void>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }
}
