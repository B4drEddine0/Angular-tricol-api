import { Component } from '@angular/core';
import { StockOverviewComponent } from '../../components/stock/stock-overview/stock-overview.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [StockOverviewComponent],
  templateUrl: './stock.html',
  styleUrls: ['./stock.css']
})
export class StockComponent {}
