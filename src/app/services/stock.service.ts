import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockOverview, StockDetail, StockMovement, StockAlert } from '../models/business.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  private http = inject(HttpClient);
  private baseUrl = 'https://springboot-tricol-api.onrender.com/api/v1/stock';

  getOverview(): Observable<StockOverview[]> {
    return this.http.get<StockOverview[]>(this.baseUrl);
  }

  getProductDetail(productId: number): Observable<StockDetail> {
    return this.http.get<StockDetail>(`${this.baseUrl}/produit/${productId}`);
  }

  getMovements(filters?: any): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }
    return this.http.get<any>(`${this.baseUrl}/mouvements`, { params });
  }

  getMovementsByProduct(productId: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.baseUrl}/mouvements/produit/${productId}`);
  }

  getAlerts(): Observable<StockAlert[]> {
    return this.http.get<StockAlert[]>(`${this.baseUrl}/alertes`);
  }

  getValuation(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/valorisation`);
  }
}
