import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/business.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9091/api/v1/fournisseurs';

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  getById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
  }

  create(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier);
  }

  update(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/${id}`, supplier);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
