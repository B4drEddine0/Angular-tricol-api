# 🎯 COMPLETE API ENDPOINTS - ANGULAR 20 TRICOL PROJECT

## CONTEXT

Building an Angular 20 frontend for a Spring Boot REST API managing supply chain and inventory for TRICOL company. Backend uses JWT authentication and role-based permissions.

**Base URL:** `http://localhost:9091`

---

## 📋 ALL API ENDPOINTS

### 🔐 Authentication Endpoints

- `POST /api/auth/login` - Body: `{username: string, password: string}` → Returns: `{accessToken, refreshToken, tokenType: "Bearer", expiresIn}`
- `POST /api/auth/register` - Body: `{username: string, email: string, password: string}`
- `POST /api/auth/refresh` - Body: `{refreshToken: string}`
- `POST /api/auth/logout` - Requires Bearer token

---

### 👥 User Management (MANAGE_USERS)

- `GET /api/users` - Get all users
- `GET /api/users/{userId}` - Get user by ID
- `POST /api/users/{userId}/roles` - Body: `{role: "ADMIN" | "RESPONSABLE_ACHATS" | "MAGASINIER" | "CHEF_ATELIER"}`
- `DELETE /api/users/{userId}/roles/{role}` - Remove role
- `PUT /api/users/{userId}/permissions` - Body: `{permissionName: string, granted: boolean}`
- `GET /api/users/{userId}/permissions` - Get user permissions
- `PATCH /api/users/{userId}/toggle-status` - Enable/disable user

---

### 🏢 Suppliers (READ_SUPPLIER, CREATE_SUPPLIER, UPDATE_SUPPLIER, DELETE_SUPPLIER)

- `GET /api/v1/fournisseurs` - Get all suppliers
- `GET /api/v1/fournisseurs/{id}` - Get supplier by ID
- `POST /api/v1/fournisseurs` - Create supplier
- `PUT /api/v1/fournisseurs/{id}` - Update supplier
- `DELETE /api/v1/fournisseurs/{id}` - Delete supplier

---

### 📦 Products (READ_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT)

- `GET /api/v1/produits` - Get all products
- `GET /api/v1/produits/{id}` - Get product by ID
- `POST /api/v1/produits` - Create product
- `PUT /api/v1/produits/{id}` - Update product
- `DELETE /api/v1/produits/{id}` - Delete product
- `GET /api/v1/produits/{id}/stock` - Get product stock info

---

### 🛒 Supplier Orders (READ_SUPPLIER_ORDER, CREATE_SUPPLIER_ORDER, UPDATE_SUPPLIER_ORDER, DELETE_SUPPLIER_ORDER, VALIDATE_SUPPLIER_ORDER, RECEIVE_DELIVERY)

- `GET /api/v1/commandes` - Get all orders (params: `status`, `startDate`, `endDate`)
- `GET /api/v1/commandes/{id}` - Get order by ID
- `GET /api/v1/commandes/fournisseur/{id}` - Get orders by supplier
- `POST /api/v1/commandes` - Create order
- `PUT /api/v1/commandes/{id}` - Update order
- `DELETE /api/v1/commandes/{id}` - Delete order
- `PUT /api/v1/commandes/{id}/valider` - Validate order
- `PUT /api/v1/commandes/{id}/annuler` - Cancel order
- `PUT /api/v1/commandes/{id}/reception` - Receive order

---

### 📋 Delivery Notes / Exit Orders (CREATE_EXIT_ORDER, READ_DELIVERY_NOTE, VALIDATE_EXIT_ORDER)

- `GET /api/v1/bons-sortie` - Get all delivery notes
- `GET /api/v1/bons-sortie/{id}` - Get delivery note by ID
- `GET /api/v1/bons-sortie/atelier/{atelier}` - Get by workshop
- `POST /api/v1/bons-sortie` - Create delivery note
- `PUT /api/v1/bons-sortie/{id}` - Update delivery note
- `DELETE /api/v1/bons-sortie/{id}` - Delete delivery note
- `PUT /api/v1/bons-sortie/{id}/valider` - Validate delivery note
- `PUT /api/v1/bons-sortie/{id}/annuler` - Cancel delivery note

---

### 📊 Stock Management (READ_STOCK)

- `GET /api/v1/stock` - Get global stock overview
- `GET /api/v1/stock/produit/{productId}` - Get product stock detail
- `GET /api/v1/stock/mouvements` - Search movements (params: `dateDebut`, `dateFin`, `produitId`, `reference`, `type`, `numeroLot`, `page`, `size`, `sort`)
- `GET /api/v1/stock/mouvements/produit/{productId}` - Get movements by product
- `GET /api/v1/stock/alertes` - Get stock alerts (low stock)
- `GET /api/v1/stock/valorisation` - Get stock valuation (total value)

---

## 📝 TypeScript Models

```typescript
// Auth
interface LoginRequest { username: string; password: string; }
interface AuthResponse { accessToken: string; refreshToken: string; tokenType: string; expiresIn: number; }

// User
interface UserResponse { id: number; username: string; email: string; roles: string[]; enabled: boolean; createdAt: string; }
interface PermissionResponse { permissionName: string; granted: boolean; source: "ROLE" | "CUSTOM"; }

// Supplier
interface SupplierRequest { name: string; contactPerson?: string; email?: string; phone?: string; address?: string; }

// Product
interface ProductRequest { reference: string; designation: string; unit: string; minStock: number; supplierId: number; }

// Supplier Order
interface SupplierOrderRequest {
  supplierId: number;
  orderDate: string;
  expectedDeliveryDate?: string;
  lines: { productId: number; quantity: number; unitPrice: number; }[];
}

// Delivery Note
interface DeliveryNoteRequest {
  exitDate: string;
  workshop: string;
  reason: "PRODUCTION" | "MAINTENANCE" | "TRANSFER" | "OTHER";
  lines: { productId: number; quantity: number; }[];
}

// Stock Movement Query
interface StockMovementParams {
  dateDebut?: string; // YYYY-MM-DD
  dateFin?: string;
  produitId?: number;
  reference?: string;
  type?: "ENTRY" | "EXIT";
  numeroLot?: string;
  page?: number;
  size?: number;
  sort?: string[];
}
```

---

## 🎨 Dashboard Pages to Build

1. **Dashboard Home** - Overview cards, alerts, stats
2. **Suppliers** - CRUD table with search
3. **Products** - CRUD table with stock levels
4. **Supplier Orders** - List with filters, create/edit forms
5. **Delivery Notes** - List by workshop, create/validate
6. **Stock Overview** - Global stock with alerts
7. **Stock Movements** - Searchable history
8. **User Management** - Admin only, role/permission editing

---

## 🔑 Permission-Based Navigation

```typescript
const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', permission: null },
  { path: '/suppliers', label: 'Suppliers', icon: 'business', permission: 'READ_SUPPLIER' },
  { path: '/products', label: 'Products', icon: 'inventory', permission: 'READ_PRODUCT' },
  { path: '/orders', label: 'Orders', icon: 'shopping_cart', permission: 'READ_SUPPLIER_ORDER' },
  { path: '/delivery-notes', label: 'Exit Orders', icon: 'local_shipping', permission: 'READ_DELIVERY_NOTE' },
  { path: '/stock', label: 'Stock', icon: 'warehouse', permission: 'READ_STOCK' },
  { path: '/admin/users', label: 'Users', icon: 'people', permission: 'MANAGE_USERS' }
];
```

---

## 🔐 Roles & Permissions

**ADMIN** - All permissions
**RESPONSABLE_ACHATS** - Suppliers, Products, Orders (create/read/update/validate)
**MAGASINIER** - Delivery notes, Stock, Exit orders (create/validate)
**CHEF_ATELIER** - Read-only + Create exit orders

Users can have multiple roles. Admins can override individual permissions.

---

## 🛠️ Angular Services Needed

1. **AuthService** - login, register, logout, token management
2. **UserService** - user CRUD, roles, permissions
3. **SupplierService** - supplier CRUD
4. **ProductService** - product CRUD
5. **OrderService** - order CRUD, validate, receive
6. **DeliveryNoteService** - delivery note CRUD, validate
7. **StockService** - stock overview, movements, alerts

---

## 🚀 Quick Start

1. Create services for each endpoint group
2. Create guards (auth, permission)
3. Create interceptor (JWT)
4. Build layout (sidebar, navbar)
5. Create CRUD components for each entity
6. Add permission checks to routes and UI elements

---

**END OF DOCUMENTATION** 🎯
