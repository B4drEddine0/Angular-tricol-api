import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SupplierService } from '../../../services/supplier.service';
import { ProductService } from '../../../services/product.service';
import { SupplierOrder, Supplier, Product } from '../../../models/business.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule, MatIconModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  fb = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);
  
  data: SupplierOrder | null = null;
  suppliers: Supplier[] = [];
  products: Product[] = [];
  
  form = this.fb.group({
    supplierId: [null as number | null, Validators.required],
    notes: [''],
    orderLines: this.fb.array([])
  });

  get orderLines() {
    return this.form.get('orderLines') as FormArray;
  }

  ngOnInit() {
    this.supplierService.getAll().subscribe(s => this.suppliers = s);
    this.productService.getAll().subscribe(p => this.products = p);
    if (this.orderLines.length === 0) this.addLine();
  }

  addLine() {
    this.orderLines.push(this.fb.group({
      productId: [null as number | null, Validators.required],
      quantityOrdered: [0, [Validators.required, Validators.min(0.01)]],
      unitPurchasePrice: [0, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeLine(index: number) {
    this.orderLines.removeAt(index);
  }

  save() {}
}
