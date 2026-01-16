import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private stockService = inject(StockService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);

  totalProducts = 0;
  pendingOrders = 0;
  stockAlerts = 0;
  stockValue = 0;

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.productService.getAll().subscribe(products => this.totalProducts = products.length);
    this.orderService.getAll('EN_ATTENTE').subscribe(orders => this.pendingOrders = orders.length);
    this.stockService.getAlerts().subscribe(alerts => this.stockAlerts = alerts.length);
    this.stockService.getValuation().subscribe(val => this.stockValue = val.totalStockValue);
  }
}
