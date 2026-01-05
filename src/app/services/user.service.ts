import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Permission } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9091/api/users';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  assignRole(userId: number, role: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/roles`, { role });
  }

  removeRole(userId: number, role: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}/roles/${role}`);
  }

  updatePermission(userId: number, permissionName: string, granted: boolean): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${userId}/permissions`, { permissionName, granted });
  }

  getPermissions(userId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/${userId}/permissions`);
  }

  getAllPermissions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/permissions/all`);
  }

  toggleStatus(userId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${userId}/toggle-status`, {});
  }
}
