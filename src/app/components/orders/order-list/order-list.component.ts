import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { SupplierOrder } from '../../../models/business.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  orders: SupplierOrder[] = [];
  columns = ['orderNumber', 'orderDate', 'supplier', 'totalAmount', 'status', 'actions'];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe(data => this.orders = data);
  }

  openDialog(order?: SupplierOrder) {
    const dialogRef = this.dialog.open(OrderFormComponent, { width: '700px' });
    if (order) {
      dialogRef.componentInstance.data = order;
      dialogRef.componentInstance.form.patchValue({
        supplierId: order.supplier?.id,
        notes: order.notes
      });
      dialogRef.componentInstance.orderLines.clear();
      order.orderLines.forEach(line => {
        dialogRef.componentInstance.orderLines.push(dialogRef.componentInstance.fb.group({
          productId: [line.product?.id, Validators.required],
          quantityOrdered: [line.quantityOrdered, [Validators.required, Validators.min(0.01)]],
          unitPurchasePrice: [line.unitPurchasePrice, [Validators.required, Validators.min(0.01)]]
        }));
      });
    }
    dialogRef.componentInstance.save = () => {
      const formValue = dialogRef.componentInstance.form.value;
      const value = Object.fromEntries(Object.entries(formValue).filter(([_, v]) => v !== '' && v !== null));
      const obs = order ? this.orderService.update(order.id!, value as any) : this.orderService.create(value as any);
      obs.subscribe({
        next: () => {
          this.snackBar.open('Order saved', 'Close', { duration: 2000 });
          this.loadOrders();
          dialogRef.close();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error saving order', 'Close', { duration: 3000 })
      });
    };
  }

  validate(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Validate Order';
    dialogRef.componentInstance.message = 'Are you sure you want to validate this order?';
    dialogRef.componentInstance.confirmText = 'Validate';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.orderService.validate(id).subscribe({
          next: () => {
            this.snackBar.open('Order validated successfully', 'Close', { duration: 2000 });
            this.loadOrders();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error validating order', 'Close', { duration: 3000 })
        });
      }
    });
  }

  cancel(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Cancel Order';
    dialogRef.componentInstance.message = 'Are you sure you want to cancel this order?';
    dialogRef.componentInstance.confirmText = 'Cancel Order';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.orderService.cancel(id).subscribe({
          next: () => {
            this.snackBar.open('Order cancelled successfully', 'Close', { duration: 2000 });
            this.loadOrders();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error cancelling order', 'Close', { duration: 3000 })
        });
      }
    });
  }

  receive(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Receive Order';
    dialogRef.componentInstance.message = 'Receive this order? This will update stock using FIFO.';
    dialogRef.componentInstance.confirmText = 'Receive';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.orderService.receive(id).subscribe({
          next: () => {
            this.snackBar.open('Order received, stock updated successfully', 'Close', { duration: 2000 });
            this.loadOrders();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error receiving order', 'Close', { duration: 3000 })
        });
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Delete Order';
    dialogRef.componentInstance.message = 'Are you sure you want to delete this order?';
    dialogRef.componentInstance.confirmText = 'Delete';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.orderService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Order deleted successfully', 'Close', { duration: 2000 });
            this.loadOrders();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error deleting order', 'Close', { duration: 3000 })
        });
      }
    });
  }
}
