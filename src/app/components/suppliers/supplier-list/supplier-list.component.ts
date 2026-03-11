import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupplierService } from '../../../services/supplier.service';
import { PermissionService } from '../../../services/permission.service';
import { Supplier } from '../../../models/business.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private permissionService = inject(PermissionService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  suppliers: Supplier[] = [];
  columns: string[] = [];

  ngOnInit() {
    this.columns = ['raisonSociale', 'contactPerson', 'email', 'phone', 'city'];
    if (this.hasPermission('UPDATE_SUPPLIER') || this.hasPermission('DELETE_SUPPLIER')) {
      this.columns.push('actions');
    }
    this.loadSuppliers();
  }

  hasPermission(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe(data => this.suppliers = data);
  }

  openDialog(supplier?: Supplier) {
    const dialogRef = this.dialog.open(SupplierFormComponent);
    if (supplier) dialogRef.componentInstance.data = supplier;
    dialogRef.componentInstance.form.patchValue(supplier || {});
    dialogRef.componentInstance.save = () => {
      const formValue = dialogRef.componentInstance.form.value;
      const value = Object.fromEntries(Object.entries(formValue).filter(([_, v]) => v !== '' && v !== null));
      const obs = supplier ? this.supplierService.update(supplier.id!, value as any) : this.supplierService.create(value as any);
      obs.subscribe({
        next: () => {
          this.snackBar.open('Supplier saved', 'Close', { duration: 2000 });
          this.loadSuppliers();
          dialogRef.close();
        },
        error: () => this.snackBar.open('Error saving supplier', 'Close', { duration: 2000 })
      });
    };
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Delete Supplier';
    dialogRef.componentInstance.message = 'Are you sure you want to delete this supplier?';
    dialogRef.componentInstance.confirmText = 'Delete';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.supplierService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Supplier deleted successfully', 'Close', { duration: 2000 });
            this.loadSuppliers();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error deleting supplier', 'Close', { duration: 3000 })
        });
      }
    });
  }
}
