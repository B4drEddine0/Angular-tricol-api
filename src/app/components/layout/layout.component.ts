import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer mode="side" opened class="sidenav">
        <div class="logo">TRICOL</div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/suppliers" routerLinkActive="active">
            <mat-icon>business</mat-icon>
            <span>Suppliers</span>
          </a>
          <a mat-list-item routerLink="/products" routerLinkActive="active">
            <mat-icon>inventory</mat-icon>
            <span>Products</span>
          </a>
          <a mat-list-item routerLink="/orders" routerLinkActive="active">
            <mat-icon>shopping_cart</mat-icon>
            <span>Orders</span>
          </a>
          <a mat-list-item routerLink="/delivery-notes" routerLinkActive="active">
            <mat-icon>local_shipping</mat-icon>
            <span>Delivery Notes</span>
          </a>
          <a mat-list-item routerLink="/stock" routerLinkActive="active">
            <mat-icon>warehouse</mat-icon>
            <span>Stock</span>
          </a>
          <a mat-list-item routerLink="/admin/users" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Users</span>
          </a>
        </mat-nav-list>
        <div class="theme-selector">
          <div class="theme-label">Theme</div>
          <div class="theme-options">
            <button class="theme-btn indigo" [class.active]="currentTheme === 'indigo'" (click)="changeTheme('indigo')" title="Indigo"></button>
            <button class="theme-btn teal" [class.active]="currentTheme === 'teal'" (click)="changeTheme('teal')" title="Teal"></button>
            <button class="theme-btn purple" [class.active]="currentTheme === 'purple'" (click)="changeTheme('purple')" title="Purple"></button>
            <button class="theme-btn pink" [class.active]="currentTheme === 'pink'" (click)="changeTheme('pink')" title="Pink"></button>
          </div>
        </div>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Supply Chain Management</span>
          <span class="spacer"></span>
          <span class="user-info">{{currentUser?.username}}</span>
          <button mat-icon-button (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }
    .sidenav { width: 250px; background: #3949ab; color: white; display: flex; flex-direction: column; }
    .logo { padding: 20px; font-size: 24px; font-weight: bold; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
    mat-nav-list { flex: 1; }
    mat-nav-list a { color: white !important; }
    mat-nav-list a span { color: white !important; }
    mat-nav-list a mat-icon { color: white !important; }
    mat-nav-list a:hover { background: rgba(255,255,255,0.15); }
    mat-nav-list a.active { background: rgba(255,255,255,0.25); color: white; font-weight: 500; }
    mat-nav-list mat-icon { margin-right: 12px; }
    .theme-selector { padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
    .theme-label { font-size: 12px; margin-bottom: 8px; opacity: 0.8; }
    .theme-options { display: flex; gap: 8px; }
    .theme-btn { width: 32px; height: 32px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
    .theme-btn:hover { transform: scale(1.1); }
    .theme-btn.active { border-color: white; box-shadow: 0 0 0 2px rgba(255,255,255,0.3); }
    .theme-btn.indigo { background: #3949ab; }
    .theme-btn.teal { background: #00897b; }
    .theme-btn.purple { background: #7b1fa2; }
    .theme-btn.pink { background: #c2185b; }
    .content { padding: 24px; background: #f1f5f9; min-height: calc(100vh - 64px); }
    .spacer { flex: 1; }
    .user-info { margin-right: 16px; }
  `]
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.getCurrentUser();
  currentTheme = localStorage.getItem('theme') || 'indigo';

  constructor() {
    this.applyTheme(this.currentTheme);
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  applyTheme(theme: string) {
    const themes: any = {
      indigo: { primary: '#3949ab', sidebar: '#3949ab' },
      teal: { primary: '#00897b', sidebar: '#00897b' },
      purple: { primary: '#7b1fa2', sidebar: '#7b1fa2' },
      pink: { primary: '#c2185b', sidebar: '#c2185b' }
    };
    const colors = themes[theme];
    const sidebar = document.querySelector('.sidenav') as HTMLElement;
    const toolbar = document.querySelector('mat-toolbar') as HTMLElement;
    if (sidebar) sidebar.style.background = colors.sidebar;
    if (toolbar) toolbar.style.background = colors.primary;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth/login']);
  }
}
