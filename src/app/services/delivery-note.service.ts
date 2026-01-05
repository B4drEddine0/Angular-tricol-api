import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryNote } from '../models/business.model';

@Injectable({ providedIn: 'root' })
export class DeliveryNoteService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9091/api/v1/bons-sortie';

  getAll(): Observable<DeliveryNote[]> {
    return this.http.get<DeliveryNote[]>(this.baseUrl);
  }

  getById(id: number): Observable<DeliveryNote> {
    return this.http.get<DeliveryNote>(`${this.baseUrl}/${id}`);
  }

  getByWorkshop(workshop: string): Observable<DeliveryNote[]> {
    return this.http.get<DeliveryNote[]>(`${this.baseUrl}/atelier/${workshop}`);
  }

  create(note: DeliveryNote): Observable<DeliveryNote> {
    return this.http.post<DeliveryNote>(this.baseUrl, note);
  }

  update(id: number, note: DeliveryNote): Observable<DeliveryNote> {
    return this.http.put<DeliveryNote>(`${this.baseUrl}/${id}`, note);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  validate(id: number): Observable<DeliveryNote> {
    return this.http.put<DeliveryNote>(`${this.baseUrl}/${id}/valider`, {});
  }

  cancel(id: number): Observable<DeliveryNote> {
    return this.http.put<DeliveryNote>(`${this.baseUrl}/${id}/annuler`, {});
  }
}
