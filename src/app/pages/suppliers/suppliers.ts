import { Component } from '@angular/core';
import { SupplierListComponent } from '../../components/suppliers/supplier-list/supplier-list.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [SupplierListComponent],
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css']
})
export class SuppliersComponent {}
