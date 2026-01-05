import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierOrder } from '../models/business.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9091/api/v1/commandes';

  getAll(status?: string, startDate?: string, endDate?: string): Observable<SupplierOrder[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<SupplierOrder[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<SupplierOrder> {
    return this.http.get<SupplierOrder>(`${this.baseUrl}/${id}`);
  }

  getBySupplier(supplierId: number): Observable<SupplierOrder[]> {
    return this.http.get<SupplierOrder[]>(`${this.baseUrl}/fournisseur/${supplierId}`);
  }

  create(order: SupplierOrder): Observable<SupplierOrder> {
    return this.http.post<SupplierOrder>(this.baseUrl, order);
  }

  update(id: number, order: SupplierOrder): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.baseUrl}/${id}`, order);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  validate(id: number): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.baseUrl}/${id}/valider`, {});
  }

  cancel(id: number): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.baseUrl}/${id}/annuler`, {});
  }

  receive(id: number): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.baseUrl}/${id}/reception`, {});
  }
}
