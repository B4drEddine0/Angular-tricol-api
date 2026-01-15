import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/auth.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { UserRolesDialogComponent } from '../user-roles-dialog/user-roles-dialog.component';
import { UserPermissionsDialogComponent } from '../user-permissions-dialog/user-permissions-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  users: User[] = [];
  columns = ['username', 'email', 'roles', 'enabled', 'createdAt', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  manageRoles(user: User) {
    const dialogRef = this.dialog.open(UserRolesDialogComponent, { width: '400px' });
    dialogRef.componentInstance.user = user;
    dialogRef.componentInstance.userRoles = [...user.roles];
    dialogRef.componentInstance.selectedRoles = [...user.roles];
    
    dialogRef.componentInstance.save = () => {
      const selected = dialogRef.componentInstance.selectedRoles;
      const toAdd = selected.filter(r => !user.roles.includes(r));
      const toRemove = user.roles.filter(r => !selected.includes(r));
      
      const operations = [
        ...toAdd.map(role => this.userService.assignRole(user.id, role)),
        ...toRemove.map(role => this.userService.removeRole(user.id, role))
      ];
      
      if (operations.length === 0) {
        dialogRef.close();
        return;
      }
      
      forkJoin(operations).subscribe({
        next: () => {
          this.snackBar.open('Roles updated', 'Close', { duration: 2000 });
          this.loadUsers();
          dialogRef.close();
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Error updating roles', 'Close', { duration: 3000 });
        }
      });
    };
  }

  managePermissions(user: User) {
    const dialogRef = this.dialog.open(UserPermissionsDialogComponent, { width: '500px' });
    dialogRef.componentInstance.user = user;
  }

  removeRole(userId: number, role: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Remove Role';
    dialogRef.componentInstance.message = `Are you sure you want to remove role ${role}?`;
    dialogRef.componentInstance.confirmText = 'Remove';
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userService.removeRole(userId, role).subscribe({
          next: () => {
            this.snackBar.open('Role removed successfully', 'Close', { duration: 2000 });
            this.loadUsers();
          },
          error: (err) => this.snackBar.open(err.error?.message || 'Error removing role', 'Close', { duration: 3000 })
        });
      }
    });
  }

  toggleStatus(userId: number) {
    this.userService.toggleStatus(userId).subscribe({
      next: () => {
        this.snackBar.open('User status updated', 'Close', { duration: 2000 });
        this.loadUsers();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error updating status', 'Close', { duration: 3000 })
    });
  }
}
