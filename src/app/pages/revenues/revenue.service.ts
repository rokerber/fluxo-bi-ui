// src/app/pages/revenues/revenue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenue } from './revenue';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private apiUrl = 'https://fluxo-bi-api.sp1.br.saveincloud.net.br/api/revenues';

  constructor(private http: HttpClient) { }

  getRevenues(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(this.apiUrl);
  }

  getRevenueById(id: number): Observable<Revenue> {
    return this.http.get<Revenue>(`${this.apiUrl}/${id}`);
  }

  createRevenue(revenue: Partial<Revenue>): Observable<Revenue> {
    return this.http.post<Revenue>(this.apiUrl, revenue);
  }

  updateRevenue(id: number, revenue: Partial<Revenue>): Observable<Revenue> {
    return this.http.put<Revenue>(`${this.apiUrl}/${id}`, revenue);
  }

  deleteRevenue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
