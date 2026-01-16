import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{title}}</h2>
    <mat-dialog-content>
      <p>{{message}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">{{confirmText}}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content { min-width: 300px; padding: 20px 0; }
    p { margin: 0; color: #475569; }
  `]
})
export class ConfirmDialogComponent {
  title = 'Confirm';
  message = 'Are you sure?';
  confirmText = 'Confirm';
}
