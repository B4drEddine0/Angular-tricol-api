import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private authService = inject(AuthService);

  private rolePermissions: Record<string, string[]> = {
    'ADMIN': ['CREATE_SUPPLIER', 'READ_SUPPLIER', 'UPDATE_SUPPLIER', 'DELETE_SUPPLIER', 'CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_PRODUCT', 'DELETE_PRODUCT', 'CREATE_SUPPLIER_ORDER', 'READ_SUPPLIER_ORDER', 'UPDATE_SUPPLIER_ORDER', 'DELETE_SUPPLIER_ORDER', 'VALIDATE_SUPPLIER_ORDER', 'CREATE_DELIVERY_NOTE', 'READ_DELIVERY_NOTE', 'RECEIVE_DELIVERY', 'READ_STOCK', 'CREATE_EXIT_ORDER', 'VALIDATE_EXIT_ORDER', 'MANAGE_USERS', 'MANAGE_PERMISSIONS', 'VIEW_AUDIT_LOGS'],
    'RESPONSABLE_ACHATS': ['CREATE_SUPPLIER', 'READ_SUPPLIER', 'UPDATE_SUPPLIER', 'CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_PRODUCT', 'CREATE_SUPPLIER_ORDER', 'READ_SUPPLIER_ORDER', 'UPDATE_SUPPLIER_ORDER', 'VALIDATE_SUPPLIER_ORDER', 'READ_DELIVERY_NOTE', 'READ_STOCK'],
    'MAGASINIER': ['READ_SUPPLIER', 'READ_PRODUCT', 'READ_SUPPLIER_ORDER', 'CREATE_DELIVERY_NOTE', 'READ_DELIVERY_NOTE', 'RECEIVE_DELIVERY', 'READ_STOCK', 'CREATE_EXIT_ORDER', 'VALIDATE_EXIT_ORDER'],
    'CHEF_ATELIER': ['READ_SUPPLIER', 'READ_PRODUCT', 'READ_SUPPLIER_ORDER', 'READ_DELIVERY_NOTE', 'READ_STOCK', 'CREATE_EXIT_ORDER']
  };

  hasPermission(permission: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || !user.roles || user.roles.length === 0) return false;
    const role = user.roles[0];
    return this.rolePermissions[role]?.includes(permission) || false;
  }
}
