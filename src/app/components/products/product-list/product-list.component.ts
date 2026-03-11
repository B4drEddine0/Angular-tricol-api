import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';
import { PermissionService } from '../../../services/permission.service';
import { Product } from '../../../models/business.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private permissionService = inject(PermissionService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  products: Product[] = [];
  columns: string[] = [];

  ngOnInit() {
    this.columns = ['reference', 'name', 'category', 'unitPrice', 'currentStock'];
    if (this.hasPermission('UPDATE_PRODUCT') || this.hasPermission('DELETE_PRODUCT')) {
      this.columns.push('actions');
    }
    this.loadProducts();
  }

  hasPermission(permission: string): boolean {
    return this.permissionService.hasPermission(permission);
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent);
    if (product) dialogRef.componentInstance.data = product;
    dialogRef.componentInstance.form.patchValue(product || {});
    dialogRef.componentInstance.save = () => {
      const formValue = dialogRef.componentInstance.form.value;
      const value = Object.fromEntries(Object.entries(formValue).filter(([_, v]) => v !== '' && v !== null));
      const obs = product ? this.productService.update(product.id!, value as any) : this.productService.create(value as any);
      obs.subscribe({
        next: () => {
          this.snackBar.open('Product saved', 'Close', { duration: 2000 });
          this.loadProducts();
          dialogRef.close();
        },
        error: () => this.snackBar.open('Error saving product', 'Close', { duration: 2000 })
      });
    };
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Delete Product';
    dialogRef.componentInstance.message = 'Are you sure you want to delete this product?';
    dialogRef.componentInstance.confirmText = 'Delete';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Product deleted successfully', 'Close', { duration: 2000 });
            this.loadProducts();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error deleting product', 'Close', { duration: 3000 })
        });
      }
    });
  }
}
