import { Component } from '@angular/core';
import { OrderListComponent } from '../../components/orders/order-list/order-list.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent {}
