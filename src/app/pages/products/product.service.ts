import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from './product';
import {API_CONFIG, getApiUrl} from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS));
  }
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS), product);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`, product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${getApiUrl(API_CONFIG.ENDPOINTS.CLIENTS)}/${id}`);
  }
}
