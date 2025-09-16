import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './expense';
import {API_CONFIG, getApiUrl} from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(getApiUrl(API_CONFIG.ENDPOINTS.EXPENSES));
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${getApiUrl(API_CONFIG.ENDPOINTS.EXPENSES)}/${id}`);
  }

  createExpense(expense: Partial<Expense>): Observable<Expense> {
    return this.http.post<Expense>(getApiUrl(API_CONFIG.ENDPOINTS.EXPENSES), expense);
  }

  updateExpense(id: number, expense: Partial<Expense>): Observable<Expense> {
    return this.http.put<Expense>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }
}
