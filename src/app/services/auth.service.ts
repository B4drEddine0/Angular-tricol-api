import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9091/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.currentUserSubject.next(null);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
