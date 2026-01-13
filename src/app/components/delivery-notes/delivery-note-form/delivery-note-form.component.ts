import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from '../../../services/product.service';
import { DeliveryNote, Product } from '../../../models/business.model';

@Component({
  selector: 'app-delivery-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './delivery-note-form.component.html',
  styleUrls: ['./delivery-note-form.component.css']
})
export class DeliveryNoteFormComponent implements OnInit {
  fb = inject(FormBuilder);
  private productService = inject(ProductService);
  
  data: DeliveryNote | null = null;
  products: Product[] = [];
  
  form = this.fb.group({
    noteNumber: ['', Validators.required],
    exitDate: ['', Validators.required],
    workshop: ['', Validators.required],
    exitReason: ['PRODUCTION', Validators.required],
    comments: [''],
    deliveryNoteLines: this.fb.array([])
  });

  get deliveryLines() {
    return this.form.get('deliveryNoteLines') as FormArray;
  }

  ngOnInit() {
    this.productService.getAll().subscribe(p => this.products = p);
    if (this.deliveryLines.length === 0) this.addLine();
  }

  addLine() {
    this.deliveryLines.push(this.fb.group({
      productId: [null as number | null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeLine(index: number) {
    this.deliveryLines.removeAt(index);
  }

  save() {}
}
