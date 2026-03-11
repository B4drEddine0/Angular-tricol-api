import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../models/business.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  data: Product | null = null;

  form = this.fb.group({
    reference: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    category: ['', Validators.required],
    unitPrice: [0, [Validators.required, Validators.min(5)]],
    unitOfMeasure: ['', Validators.required],
    reorderPoint: [0, Validators.min(0)]
  });

  save() {}
}
