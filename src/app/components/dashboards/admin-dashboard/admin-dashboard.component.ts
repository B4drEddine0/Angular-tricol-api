import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { StockService } from '../../../services/stock.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private stockService = inject(StockService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  private supplierService = inject(SupplierService);

  totalProducts = 0;
  pendingOrders = 0;
  stockAlerts = 0;
  stockValue = 0;
  totalUsers = 0;
  totalSuppliers = 0;
  greeting = '';

  // Chart configs
  orderChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Pending', 'Validated', 'Delivered', 'Cancelled'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#fbbf24', '#10b981', '#14b8a6', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  };

  orderChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '72%',
    plugins: {
      legend: { display: false }
    }
  };

  activityChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Orders',
      data: [4, 7, 3, 5, 8, 2, 6],
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#10B981',
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor: 'rgba(16, 185, 129, 0.3)'
    }]
  };

  activityChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 }, color: '#9ca3af' } },
      y: { grid: { color: '#f3f4f6' }, ticks: { font: { family: 'Inter', size: 12 }, color: '#9ca3af' }, beginAtZero: true }
    }
  };

  ngOnInit() {
    this.setGreeting();
    this.productService.getAll().subscribe(products => this.totalProducts = products.length);
    this.orderService.getAll('EN_ATTENTE').subscribe(orders => {
      this.pendingOrders = orders.length;
      this.updateOrderChart();
    });
    this.orderService.getAll('VALIDEE').subscribe(orders => {
      this.orderChartData.datasets[0].data[1] = orders.length;
      this.updateOrderChart();
    });
    this.orderService.getAll('LIVREE').subscribe(orders => {
      this.orderChartData.datasets[0].data[2] = orders.length;
      this.updateOrderChart();
    });
    this.orderService.getAll('ANNULEE').subscribe(orders => {
      this.orderChartData.datasets[0].data[3] = orders.length;
      this.updateOrderChart();
    });
    this.stockService.getAlerts().subscribe(alerts => this.stockAlerts = alerts.length);
    this.stockService.getValuation().subscribe(val => this.stockValue = val.totalStockValue);
    this.userService.getAll().subscribe(users => this.totalUsers = users.length);
    this.supplierService.getAll().subscribe(suppliers => this.totalSuppliers = suppliers.length);
  }

  private updateOrderChart() {
    this.orderChartData.datasets[0].data = [...this.orderChartData.datasets[0].data];
    this.orderChartData = { ...this.orderChartData };
  }

  private setGreeting() {
    const h = new Date().getHours();
    if (h < 12) this.greeting = 'Good morning';
    else if (h < 18) this.greeting = 'Good afternoon';
    else this.greeting = 'Good evening';
  }
}
