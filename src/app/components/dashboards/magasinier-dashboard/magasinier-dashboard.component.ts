import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { DeliveryNoteService } from '../../../services/delivery-note.service';

@Component({
  selector: 'app-magasinier-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './magasinier-dashboard.component.html',
  styleUrls: ['./magasinier-dashboard.component.css']
})
export class MagasinierDashboardComponent implements OnInit {
  private stockService = inject(StockService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private deliveryNoteService = inject(DeliveryNoteService);

  totalProducts = 0;
  stockAlerts = 0;
  pendingDeliveries = 0;
  ordersToReceive = 0;

  ngOnInit() {
    this.productService.getAll().subscribe(products => this.totalProducts = products.length);
    this.stockService.getAlerts().subscribe(alerts => this.stockAlerts = alerts.length);
    this.deliveryNoteService.getAll().subscribe(notes => 
      this.pendingDeliveries = notes.filter(n => n.status === 'BROUILLON').length
    );
    this.orderService.getAll('VALIDEE').subscribe(orders => this.ordersToReceive = orders.length);
  }
}
