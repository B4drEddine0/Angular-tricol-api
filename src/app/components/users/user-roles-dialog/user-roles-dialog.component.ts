import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { User } from '../../../models/auth.model';

const AVAILABLE_ROLES = ['ADMIN', 'RESPONSABLE_ACHATS', 'MAGASINIER', 'CHEF_ATELIER'];

@Component({
  selector: 'app-user-roles-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatCheckboxModule, MatListModule],
  templateUrl: './user-roles-dialog.component.html',
  styleUrls: ['./user-roles-dialog.component.css']
})
export class UserRolesDialogComponent {
  user!: User;
  userRoles: string[] = [];
  availableRoles = AVAILABLE_ROLES;
  selectedRoles: string[] = [];
  save = () => {};
}
