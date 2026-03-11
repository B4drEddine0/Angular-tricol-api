import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { OrderService } from '../../../services/order.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-achats-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './achats-dashboard.component.html',
  styleUrls: ['./achats-dashboard.component.css']
})
export class AchatsDashboardComponent implements OnInit {
  private stockService = inject(StockService);
  private orderService = inject(OrderService);
  private supplierService = inject(SupplierService);

  pendingOrders = 0;
  validatedOrders = 0;
  stockAlerts = 0;
  totalSuppliers = 0;

  ngOnInit() {
    this.orderService.getAll('EN_ATTENTE').subscribe(orders => this.pendingOrders = orders.length);
    this.orderService.getAll('VALIDEE').subscribe(orders => this.validatedOrders = orders.length);
    this.stockService.getAlerts().subscribe(alerts => this.stockAlerts = alerts.length);
    this.supplierService.getAll().subscribe(suppliers => this.totalSuppliers = suppliers.length);
  }
}
