import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { StockService } from '../../../services/stock.service';
import { StockOverview, StockAlert } from '../../../models/business.model';

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, MatTabsModule],
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.css']
})
export class StockOverviewComponent implements OnInit {
  private stockService = inject(StockService);
  
  stockOverview: StockOverview[] = [];
  alerts: StockAlert[] = [];
  stockColumns = ['productReference', 'productName', 'currentStock', 'reorderPoint'];
  alertColumns = ['productName', 'currentStock', 'reorderPoint', 'deficit'];

  ngOnInit() {
    this.loadStock();
    this.loadAlerts();
  }

  loadStock() {
    this.stockService.getOverview().subscribe(data => this.stockOverview = data);
  }

  loadAlerts() {
    this.stockService.getAlerts().subscribe(data => this.alerts = data);
  }
}
