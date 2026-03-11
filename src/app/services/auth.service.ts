import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://springboot-tricol-api.onrender.com/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromToken();
  }

  private loadUserFromToken() {
    const token = this.getToken();
    if (token) {
      const user = this.decodeToken(token);
      if (user) {
        this.currentUserSubject.next(user);
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
        const username = payload.sub;


        let role = 'ADMIN';
        if (username.toLowerCase().includes('achats')) role = 'RESPONSABLE_ACHATS';
        else if (username.toLowerCase().includes('magasinier')) role = 'MAGASINIER';
        else if (username.toLowerCase().includes('chef') || username.toLowerCase().includes('atelier')) role = 'CHEF_ATELIER';

        const user: User = {
          id: 0,
          username: username,
          email: '',
          roles: [role],
          enabled: true,
          createdAt: ''
        };
        this.currentUserSubject.next(user);
      })
    );
  }

  private decodeToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub;

      let role = 'ADMIN';
      if (username.toLowerCase().includes('achats')) role = 'RESPONSABLE_ACHATS';
      else if (username.toLowerCase().includes('magasinier')) role = 'MAGASINIER';
      else if (username.toLowerCase().includes('chef') || username.toLowerCase().includes('atelier')) role = 'CHEF_ATELIER';

      return {
        id: 0,
        username: username,
        email: '',
        roles: [role],
        enabled: true,
        createdAt: ''
      };
    } catch (e) {
      return null;
    }
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
