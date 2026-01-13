import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';
import { DeliveryNoteService } from '../../../services/delivery-note.service';
import { DeliveryNote } from '../../../models/business.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { DeliveryNoteFormComponent } from '../delivery-note-form/delivery-note-form.component';

@Component({
  selector: 'app-delivery-note-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './delivery-note-list.component.html',
  styleUrls: ['./delivery-note-list.component.css']
})
export class DeliveryNoteListComponent implements OnInit {
  private deliveryNoteService = inject(DeliveryNoteService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  notes: DeliveryNote[] = [];
  columns = ['noteNumber', 'exitDate', 'workshop', 'exitReason', 'status', 'actions'];

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.deliveryNoteService.getAll().subscribe(data => this.notes = data);
  }

  openDialog(note?: DeliveryNote) {
    const dialogRef = this.dialog.open(DeliveryNoteFormComponent, { width: '600px' });
    if (note) {
      dialogRef.componentInstance.data = note;
      dialogRef.componentInstance.form.patchValue({
        noteNumber: note.noteNumber,
        exitDate: note.exitDate,
        workshop: note.workshop,
        exitReason: note.exitReason,
        comments: note.comments
      });
      dialogRef.componentInstance.deliveryLines.clear();
      note.deliveryNoteLines.forEach(line => {
        dialogRef.componentInstance.deliveryLines.push(dialogRef.componentInstance.fb.group({
          productId: [line.product?.id || line.productId, Validators.required],
          quantity: [line.quantity, [Validators.required, Validators.min(0.01)]]
        }));
      });
    }
    dialogRef.componentInstance.save = () => {
      const formValue = dialogRef.componentInstance.form.value;
      const value = Object.fromEntries(Object.entries(formValue).filter(([_, v]) => v !== '' && v !== null));
      const obs = note ? this.deliveryNoteService.update(note.id!, value as any) : this.deliveryNoteService.create(value as any);
      obs.subscribe({
        next: () => {
          this.snackBar.open('Delivery note saved', 'Close', { duration: 2000 });
          this.loadNotes();
          dialogRef.close();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error saving delivery note', 'Close', { duration: 3000 })
      });
    };
  }

  validate(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Validate Delivery Note';
    dialogRef.componentInstance.message = 'Validate this delivery note? This will update stock using FIFO.';
    dialogRef.componentInstance.confirmText = 'Validate';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deliveryNoteService.validate(id).subscribe({
          next: () => {
            this.snackBar.open('Delivery note validated, stock updated successfully', 'Close', { duration: 2000 });
            this.loadNotes();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error validating note', 'Close', { duration: 3000 })
        });
      }
    });
  }

  cancel(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Cancel Delivery Note';
    dialogRef.componentInstance.message = 'Are you sure you want to cancel this delivery note?';
    dialogRef.componentInstance.confirmText = 'Cancel Note';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deliveryNoteService.cancel(id).subscribe({
          next: () => {
            this.snackBar.open('Delivery note cancelled successfully', 'Close', { duration: 2000 });
            this.loadNotes();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error cancelling note', 'Close', { duration: 3000 })
        });
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Delete Delivery Note';
    dialogRef.componentInstance.message = 'Are you sure you want to delete this delivery note?';
    dialogRef.componentInstance.confirmText = 'Delete';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deliveryNoteService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Delivery note deleted successfully', 'Close', { duration: 2000 });
            this.loadNotes();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error deleting note', 'Close', { duration: 3000 })
        });
      }
    });
  }
}
