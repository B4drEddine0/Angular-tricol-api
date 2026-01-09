import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent {}
