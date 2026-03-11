import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  features = [
    {
      icon: 'inventory',
      title: 'FIFO Stock Valuation',
      description: 'Automated first-in-first-out inventory costing with full audit trail and movement history.'
    },
    {
      icon: 'local_shipping',
      title: 'Procurement & Orders',
      description: 'End-to-end purchase order lifecycle—creation, validation, supplier tracking, and delivery.'
    },
    {
      icon: 'assignment',
      title: 'Delivery Management',
      description: 'Partial and full delivery tracking with automatic stock updates and discrepancy alerts.'
    },
    {
      icon: 'lock',
      title: 'Access Control',
      description: 'Granular role-based permissions scoped per department and operation type.'
    },
    {
      icon: 'bar_chart',
      title: 'Operational Dashboards',
      description: 'Per-role dashboards with KPIs, low-stock alerts, and order status at a glance.'
    },
    {
      icon: 'people',
      title: 'Department Coordination',
      description: 'Unified workflows connecting procurement, warehouse, and production teams.'
    }
  ];

  modules = [
    { num: '01', title: 'Supplier Management', desc: 'Maintain supplier registry with contact details and order history.' },
    { num: '02', title: 'Product Catalog', desc: 'Central product database with categorization and stock thresholds.' },
    { num: '03', title: 'Purchase Orders', desc: 'Multi-line orders with approval workflows and status tracking.' },
    { num: '04', title: 'Delivery Notes', desc: 'Goods receipt processing with partial delivery support.' },
    { num: '05', title: 'Stock & Inventory', desc: 'Real-time stock levels with FIFO valuation and low-stock alerts.' },
    { num: '06', title: 'User Administration', desc: 'Role assignment, permission management, and activity oversight.' }
  ];

  stats = [
    { value: '4', suffix: '', label: 'Department Roles', desc: 'Dedicated dashboards per role' },
    { value: '6', suffix: '', label: 'Core Modules', desc: 'End-to-end supply chain coverage' },
    { value: '100', suffix: '%', label: 'FIFO Compliant', desc: 'Accurate inventory valuation' },
    { value: '24', suffix: '/7', label: 'Operational Uptime', desc: 'Always-on platform availability' }
  ];

  roles = [
    { icon: 'admin_panel_settings', name: 'Administrator', desc: 'Full platform control, user management, and system analytics.' },
    { icon: 'shopping_cart', name: 'Purchasing', desc: 'Create and manage purchase orders, track supplier deliveries.' },
    { icon: 'store', name: 'Warehouse', desc: 'Stock management, goods receipt, and delivery note processing.' },
    { icon: 'build', name: 'Workshop', desc: 'Material requests, stock availability checks, and consumption tracking.' }
  ];
}
