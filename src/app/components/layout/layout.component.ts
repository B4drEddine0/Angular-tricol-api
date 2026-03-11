import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { PermissionService } from '../../services/permission.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule, MatDividerModule],
  animations: [
    trigger('sidebarToggle', [
      state('expanded', style({ width: 'var(--sidebar-width)' })),
      state('collapsed', style({ width: 'var(--sidebar-collapsed-width)' })),
      transition('expanded <=> collapsed', animate('280ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('fadeLabel', [
      state('visible', style({ opacity: 1, width: '*' })),
      state('hidden', style({ opacity: 0, width: '0px', overflow: 'hidden' })),
      transition('visible <=> hidden', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ],
  template: `
    <div class="app-shell">
      <!-- Sidebar -->
      <aside class="sidebar" [@sidebarToggle]="collapsed() ? 'collapsed' : 'expanded'">
        <!-- Logo -->
        <div class="sidebar-logo" (click)="toggleSidebar()">
          <div class="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#logo-grad)"/>
              <path d="M8 10h12M8 14h8M8 18h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <defs><linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28"><stop stop-color="#34D399"/><stop offset="1" stop-color="#10B981"/></linearGradient></defs>
            </svg>
          </div>
          <span class="logo-text" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">TRICOL</span>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <a class="nav-item" routerLink="/dashboard" routerLinkActive="active" [matTooltip]="collapsed() ? 'Dashboard' : ''" matTooltipPosition="right">
            <mat-icon class="nav-icon">dashboard</mat-icon>
            <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Dashboard</span>
          </a>
          @if (hasPermission('READ_SUPPLIER')) {
            <a class="nav-item" routerLink="/suppliers" routerLinkActive="active" [matTooltip]="collapsed() ? 'Suppliers' : ''" matTooltipPosition="right">
              <mat-icon class="nav-icon">business</mat-icon>
              <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Suppliers</span>
            </a>
          }
          @if (hasPermission('READ_PRODUCT')) {
            <a class="nav-item" routerLink="/products" routerLinkActive="active" [matTooltip]="collapsed() ? 'Products' : ''" matTooltipPosition="right">
              <mat-icon class="nav-icon">inventory</mat-icon>
              <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Products</span>
            </a>
          }
          @if (hasPermission('READ_SUPPLIER_ORDER')) {
            <a class="nav-item" routerLink="/orders" routerLinkActive="active" [matTooltip]="collapsed() ? 'Orders' : ''" matTooltipPosition="right">
              <mat-icon class="nav-icon">description</mat-icon>
              <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Orders</span>
            </a>
          }
          @if (hasPermission('READ_DELIVERY_NOTE')) {
            <a class="nav-item" routerLink="/delivery-notes" routerLinkActive="active" [matTooltip]="collapsed() ? 'Delivery Notes' : ''" matTooltipPosition="right">
              <mat-icon class="nav-icon">local_shipping</mat-icon>
              <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Deliveries</span>
            </a>
          }
          @if (hasPermission('READ_STOCK')) {
            <a class="nav-item" routerLink="/stock" routerLinkActive="active" [matTooltip]="collapsed() ? 'Stock' : ''" matTooltipPosition="right">
              <mat-icon class="nav-icon">store</mat-icon>
              <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Stock</span>
            </a>
          }
          @if (hasPermission('MANAGE_USERS')) {
            <div class="nav-divider"></div>
            <span class="nav-section-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Administration</span>
            <a class="nav-item" routerLink="/admin/users" routerLinkActive="active" [matTooltip]="collapsed() ? 'Users' : ''" matTooltipPosition="right">
              <mat-icon class="nav-icon">people</mat-icon>
              <span class="nav-label" [@fadeLabel]="collapsed() ? 'hidden' : 'visible'">Users</span>
            </a>
          }
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <button class="collapse-btn" (click)="toggleSidebar()">
            <mat-icon>{{ collapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main-wrapper">
        <!-- Header -->
        <header class="top-header">
          <div class="header-left">
            <div class="breadcrumb">
              <span class="breadcrumb-app">TRICOL</span>
              <mat-icon class="breadcrumb-sep">chevron_right</mat-icon>
              <span class="breadcrumb-page">Supply Chain Management</span>
            </div>
          </div>
          <div class="header-right">
            <button class="header-icon-btn" matTooltip="Notifications">
              <mat-icon>notifications_none</mat-icon>
              <span class="notification-dot"></span>
            </button>
            <div class="header-divider"></div>
            <button class="user-menu" [matMenuTriggerFor]="userDropdown">
              <div class="user-avatar">{{ getUserInitials() }}</div>
              <div class="user-info" *ngIf="!collapsed()">
                <span class="user-name">{{ currentUser?.username }}</span>
                <span class="user-role">{{ formatRole(userRole) }}</span>
              </div>
              <mat-icon class="dropdown-arrow">expand_more</mat-icon>
            </button>
            <mat-menu #userDropdown="matMenu" class="user-dropdown-menu">
              <div class="dropdown-header">
                <div class="dropdown-avatar">{{ getUserInitials() }}</div>
                <div>
                  <div class="dropdown-name">{{ currentUser?.username }}</div>
                  <div class="dropdown-role">{{ formatRole(userRole) }}</div>
                </div>
              </div>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                <span>Sign out</span>
              </button>
            </mat-menu>
          </div>
        </header>

        <!-- Page Content -->
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background: var(--surface-secondary);
    }

    /* ---- Sidebar ---- */
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: #2A2F3A;
      border-right: 1px solid rgba(255,255,255,0.06);
      overflow: hidden;
      flex-shrink: 0;
      z-index: 10;
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 20px 16px;
      cursor: pointer;
      user-select: none;
    }

    .logo-icon {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: #ffffff;
      white-space: nowrap;
    }

    /* Navigation */
    .sidebar-nav {
      flex: 1;
      padding: 8px 12px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .nav-section-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: rgba(255,255,255,0.35);
      padding: 4px 12px 8px;
      white-space: nowrap;
    }

    .nav-divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 12px 12px 12px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--radius-md);
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      transition: all var(--transition-fast);
      margin-bottom: 2px;
      white-space: nowrap;
      cursor: pointer;
      position: relative;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.08);
      color: #ffffff;
    }

    .nav-item.active {
      background: rgba(16, 185, 129, 0.12);
      color: #34D399;
    }

    .nav-item.active .nav-icon {
      color: #34D399;
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: #10B981;
      border-radius: 0 var(--radius-full) var(--radius-full) 0;
    }

    .nav-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: rgba(255,255,255,0.5);
      transition: color var(--transition-fast);
    }

    .nav-label {
      white-space: nowrap;
      overflow: hidden;
    }

    /* Sidebar Footer */
    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 36px;
      border: none;
      background: rgba(255,255,255,0.06);
      border-radius: var(--radius-md);
      cursor: pointer;
      color: rgba(255,255,255,0.5);
      transition: all var(--transition-fast);
    }

    .collapse-btn:hover {
      background: rgba(255,255,255,0.12);
      color: #ffffff;
    }

    .collapse-btn mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    /* ---- Main Wrapper ---- */
    .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
    }

    /* ---- Header ---- */
    .top-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--header-height);
      padding: 0 24px;
      background: var(--surface-primary);
      border-bottom: 1px solid var(--border-secondary);
      flex-shrink: 0;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .breadcrumb-app {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .breadcrumb-sep {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--tricol-gray-300);
    }

    .breadcrumb-page {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-icon-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      border-radius: var(--radius-md);
      cursor: pointer;
      color: var(--text-secondary);
      transition: all var(--transition-fast);
    }

    .header-icon-btn:hover {
      background: var(--tricol-gray-100);
      color: var(--text-primary);
    }

    .header-icon-btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .notification-dot {
      position: absolute;
      top: 7px;
      right: 8px;
      width: 7px;
      height: 7px;
      background: var(--tricol-error);
      border-radius: 50%;
      border: 1.5px solid white;
    }

    .header-divider {
      width: 1px;
      height: 24px;
      background: var(--border-primary);
      margin: 0 4px;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px 6px 6px;
      border: none;
      background: transparent;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .user-menu:hover {
      background: var(--tricol-gray-100);
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, #34D399, #10B981);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .user-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .user-role {
      font-size: 11px;
      color: var(--text-tertiary);
      line-height: 1.2;
    }

    .dropdown-arrow {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: var(--text-tertiary);
    }

    /* Dropdown */
    .dropdown-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
    }

    .dropdown-avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, #34D399, #10B981);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
    }

    .dropdown-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .dropdown-role {
      font-size: 12px;
      color: var(--text-secondary);
    }

    /* ---- Page Content ---- */
    .page-content {
      flex: 1;
      overflow-y: auto;
      padding: 28px 32px;
      background: var(--surface-secondary);
      position: relative;
    }
  `]
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private permissionService = inject(PermissionService);
  private router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  userRole = this.currentUser?.roles[0] || '';
  collapsed = signal(false);

  hasPermission(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  toggleSidebar() {
    this.collapsed.update(v => !v);
  }

  getUserInitials(): string {
    const name = this.currentUser?.username || '';
    return name.substring(0, 2).toUpperCase();
  }

  formatRole(role: string): string {
    return role.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth/login']);
  }
}
