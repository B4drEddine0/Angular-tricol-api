import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { ProductService } from '../../../services/product.service';
import { DeliveryNoteService } from '../../../services/delivery-note.service';

@Component({
  selector: 'app-chef-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './chef-dashboard.component.html',
  styleUrls: ['./chef-dashboard.component.css']
})
export class ChefDashboardComponent implements OnInit {
  private stockService = inject(StockService);
  private productService = inject(ProductService);
  private deliveryNoteService = inject(DeliveryNoteService);

  availableStock = 0;
  stockAlerts = 0;
  myDeliveries = 0;
  totalProducts = 0;

  ngOnInit() {
    this.stockService.getOverview().subscribe(stock => 
      this.availableStock = stock.filter(s => s.currentStock > 0).length
    );
    this.stockService.getAlerts().subscribe(alerts => this.stockAlerts = alerts.length);
    this.deliveryNoteService.getAll().subscribe(notes => this.myDeliveries = notes.length);
    this.productService.getAll().subscribe(products => this.totalProducts = products.length);
  }
}
