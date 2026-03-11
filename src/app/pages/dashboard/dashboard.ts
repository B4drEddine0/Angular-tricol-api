import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AdminDashboardComponent } from '../../components/dashboards/admin-dashboard/admin-dashboard.component';
import { AchatsDashboardComponent } from '../../components/dashboards/achats-dashboard/achats-dashboard.component';
import { MagasinierDashboardComponent } from '../../components/dashboards/magasinier-dashboard/magasinier-dashboard.component';
import { ChefDashboardComponent } from '../../components/dashboards/chef-dashboard/chef-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AdminDashboardComponent, AchatsDashboardComponent, MagasinierDashboardComponent, ChefDashboardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  userRole: string = '';

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    console.log('Current user:', user);
    if (user && user.roles && user.roles.length > 0) {
      this.userRole = user.roles[0];
      console.log('User role:', this.userRole);
    } else {
      console.log('No user or roles found');
    }
  }
}
