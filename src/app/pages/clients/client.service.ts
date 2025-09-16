import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiUrl, API_CONFIG } from '../../config/api.config';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS));
  }

  createClient(client: Partial<Client>): Observable<Client> {
    return this.http.post<Client>(getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS), client);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }

  updateClient(id: number, client: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }
}
