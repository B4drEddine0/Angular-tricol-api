import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Supplier } from '../../../models/business.model';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent {
  private fb = inject(FormBuilder);
  data: Supplier | null = null;
  
  form = this.fb.group({
    raisonSociale: ['', Validators.required],
    contactPerson: [''],
    email: ['', Validators.email],
    phone: [''],
    address: [''],
    city: [''],
    ice: ['']
  });

  save() {}
}
