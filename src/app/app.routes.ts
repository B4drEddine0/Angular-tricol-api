import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/auth/login';
import { RegisterComponent } from './pages/auth/register';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SuppliersComponent } from './pages/suppliers/suppliers';
import { ProductsComponent } from './pages/products/products';
import { OrdersComponent } from './pages/orders/orders';
import { DeliveryNotesComponent } from './pages/delivery-notes/delivery-notes';
import { StockComponent } from './pages/stock/stock';
import { UsersComponent } from './pages/admin/users';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'delivery-notes', component: DeliveryNotesComponent },
      { path: 'stock', component: StockComponent },
      { path: 'admin/users', component: UsersComponent }
    ]
  }
];
