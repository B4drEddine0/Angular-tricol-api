import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { User, Permission } from '../../../models/auth.model';

const ALL_PERMISSIONS = [
  'CREATE_SUPPLIER', 'READ_SUPPLIER', 'UPDATE_SUPPLIER', 'DELETE_SUPPLIER',
  'CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_PRODUCT', 'DELETE_PRODUCT',
  'CREATE_SUPPLIER_ORDER', 'READ_SUPPLIER_ORDER', 'UPDATE_SUPPLIER_ORDER', 'DELETE_SUPPLIER_ORDER', 'VALIDATE_SUPPLIER_ORDER',
  'CREATE_DELIVERY_NOTE', 'READ_DELIVERY_NOTE', 'RECEIVE_DELIVERY',
  'READ_STOCK', 'CREATE_EXIT_ORDER', 'VALIDATE_EXIT_ORDER',
  'MANAGE_USERS', 'MANAGE_PERMISSIONS', 'VIEW_AUDIT_LOGS'
];

@Component({
  selector: 'app-user-permissions-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCheckboxModule, MatListModule, MatChipsModule],
  templateUrl: './user-permissions-dialog.component.html',
  styleUrls: ['./user-permissions-dialog.component.css']
})
export class UserPermissionsDialogComponent implements OnInit {
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  
  user!: User;
  permissions: Permission[] = [];
  loading = true;

  ngOnInit() {
    this.userService.getPermissions(this.user.id).subscribe({
      next: (userPerms) => {
        this.permissions = ALL_PERMISSIONS.map(name => {
          const existing = userPerms.find(p => p.name === name);
          return existing || { name, granted: false, source: 'CUSTOM' as const };
        });
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error loading permissions', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  togglePermission(permissionName: string, granted: boolean) {
    this.userService.updatePermission(this.user.id, permissionName, granted).subscribe({
      next: () => {
        const perm = this.permissions.find(p => p.name === permissionName);
        if (perm) {
          perm.granted = granted;
          perm.source = 'CUSTOM';
        }
        this.snackBar.open('Permission updated', 'Close', { duration: 2000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error updating permission', 'Close', { duration: 3000 })
    });
  }
}
