# 📚 TRICOL API - COMPLETE ENDPOINTS DOCUMENTATION

**Base URL:** `http://localhost:9091`

**Authentication:** All endpoints (except auth) require `Authorization: Bearer {token}` header

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Login
```
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "string",      // Required, valid email format
  "password": "string"    // Required, min 6 characters
}
```
**Response (200 OK):**
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### 2. Register
```
POST /api/auth/register
```
**Request Body:**
```json
{
  "username": "string",   // Required, min 3 characters
  "email": "string",      // Required, valid email format
  "password": "string"    // Required, min 6 characters
}
```
**Response (200 OK):** No content (user created without roles)

### 3. Refresh Token
```
POST /api/auth/refresh
```
**Request Body:**
```json
{
  "refreshToken": "string"  // Required
}
```
**Response (200 OK):**
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### 4. Logout
```
POST /api/auth/logout
```
**Headers:** `Authorization: Bearer {token}`
**Response (200 OK):** No content

---

## 👥 USER MANAGEMENT ENDPOINTS (Admin Only)

**Required Permission:** `MANAGE_USERS` or `MANAGE_PERMISSIONS`

### 1. Get All Users
```
GET /api/users
```
**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "roles": ["ADMIN", "MAGASINIER"],
    "enabled": true,
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

### 2. Get User By ID
```
GET /api/users/{userId}
```
**Response (200 OK):**
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "roles": ["ADMIN"],
  "enabled": true,
  "createdAt": "2024-01-15T10:30:00"
}
```

### 3. Assign Role to User
```
POST /api/users/{userId}/roles
```
**Request Body:**
```json
{
  "role": "ADMIN"  // Required: ADMIN | RESPONSABLE_ACHATS | MAGASINIER | CHEF_ATELIER
}
```
**Response (200 OK):** No content

### 4. Remove Role from User
```
DELETE /api/users/{userId}/roles/{role}
```
**Path Parameters:**
- `userId`: number
- `role`: ADMIN | RESPONSABLE_ACHATS | MAGASINIER | CHEF_ATELIER

**Response (200 OK):** No content

### 5. Update User Permission (Custom Override)
```
PUT /api/users/{userId}/permissions
```
**Request Body:**
```json
{
  "permissionName": "CREATE_EXIT_ORDER",  // Required
  "granted": false                         // Required: true to grant, false to revoke
}
```
**Response (200 OK):** No content

### 6. Get User Permissions
```
GET /api/users/{userId}/permissions
```
**Response (200 OK):**
```json
[
  {
    "permissionName": "READ_SUPPLIER",
    "granted": true,
    "source": "ROLE"      // ROLE = inherited from role, CUSTOM = admin override
  },
  {
    "permissionName": "CREATE_EXIT_ORDER",
    "granted": false,
    "source": "CUSTOM"
  }
]
```

### 7. Toggle User Status (Enable/Disable)
```
PATCH /api/users/{userId}/toggle-status
```
**Response (200 OK):** No content

---

## 🏢 SUPPLIERS (FOURNISSEURS) ENDPOINTS

**Base Path:** `/api/v1/fournisseurs`

### 1. Get All Suppliers
```
GET /api/v1/fournisseurs
```
**Required Permission:** `READ_SUPPLIER`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "raisonSociale": "Supplier ABC",
    "address": "123 Main Street",
    "city": "Casablanca",
    "ice": "001234567890123",
    "contactPerson": "John Doe",
    "email": "contact@supplier.com",
    "phone": "+212612345678"
  }
]
```

### 2. Get Supplier By ID
```
GET /api/v1/fournisseurs/{id}
```
**Required Permission:** `READ_SUPPLIER`

**Response (200 OK):** Same as single supplier object above

### 3. Create Supplier
```
POST /api/v1/fournisseurs
```
**Required Permission:** `CREATE_SUPPLIER`

**Request Body:**
```json
{
  "raisonSociale": "string",    // Required, min 3, max 150 chars
  "address": "string",          // Optional, min 3, max 255 chars
  "city": "string",             // Optional, min 3, max 100 chars
  "ice": "string",              // Optional, min 3, max 50 chars
  "contactPerson": "string",    // Optional, min 3, max 100 chars
  "email": "string",            // Optional, valid email, max 120 chars
  "phone": "string"             // Optional, min 8, max 50 chars
}
```

**Response (201 CREATED):** Returns created supplier object

### 4. Update Supplier
```
PUT /api/v1/fournisseurs/{id}
```
**Required Permission:** `UPDATE_SUPPLIER`

**Request Body:** Same as Create Supplier

**Response (200 OK):** Returns updated supplier object

### 5. Delete Supplier
```
DELETE /api/v1/fournisseurs/{id}
```
**Required Permission:** `DELETE_SUPPLIER`

**Response (204 NO CONTENT):** No content

---

## 📦 PRODUCTS (PRODUITS) ENDPOINTS

**Base Path:** `/api/v1/produits`

### 1. Get All Products
```
GET /api/v1/produits
```
**Required Permission:** `READ_PRODUCT`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "reference": "PROD-001",
    "name": "Cotton Fabric",
    "description": "High quality cotton fabric",
    "unitPrice": 25.50,
    "category": "Fabrics",
    "currentStock": 150.00,
    "reorderPoint": 50.00,
    "unitOfMeasure": "meters"
  }
]
```

### 2. Get Product By ID
```
GET /api/v1/produits/{id}
```
**Required Permission:** `READ_PRODUCT`

**Response (200 OK):** Same as single product object above

### 3. Create Product
```
POST /api/v1/produits
```
**Required Permission:** `CREATE_PRODUCT`

**Request Body:**
```json
{
  "reference": "string",        // Required, not blank
  "name": "string",             // Required, not blank
  "description": "string",      // Optional
  "unitPrice": 25.50,           // Required, must be positive number
  "category": "string",         // Required, not blank
  "reorderPoint": 50.00,        // Optional, must be >= 0
  "unitOfMeasure": "string"     // Required, not blank (e.g., "meters", "kg", "units")
}
```

**Response (201 CREATED):** Returns created product object

### 4. Update Product
```
PUT /api/v1/produits/{id}
```
**Required Permission:** `UPDATE_PRODUCT`

**Request Body:** Same as Create Product

**Response (200 OK):** Returns updated product object

### 5. Delete Product
```
DELETE /api/v1/produits/{id}
```
**Required Permission:** `DELETE_PRODUCT`

**Response (200 OK):**
```json
{
  "message": "Product deleted successfully",
  "id": "1"
}
```

### 6. Get Product Stock Info
```
GET /api/v1/produits/{id}/stock
```
**Required Permission:** `READ_STOCK`

**Response (200 OK):**
```json
{
  "productId": 1,
  "productReference": "PROD-001",
  "productName": "Cotton Fabric",
  "currentStock": 150.00,
  "reorderPoint": 50.00,
  "stockValue": 3825.00,
  "unitOfMeasure": "meters"
}
```

---

## 🛒 SUPPLIER ORDERS (COMMANDES FOURNISSEURS) ENDPOINTS

**Base Path:** `/api/v1/commandes`

### 1. Get All Orders (with filters)
```
GET /api/v1/commandes
GET /api/v1/commandes?status=EN_ATTENTE
GET /api/v1/commandes?startDate=2024-01-01&endDate=2024-12-31
```
**Required Permission:** `READ_SUPPLIER_ORDER`

**Query Parameters:**
- `status` (optional): EN_ATTENTE | VALIDEE | LIVREE | ANNULEE
- `startDate` (optional): ISO date format (YYYY-MM-DD)
- `endDate` (optional): ISO date format (YYYY-MM-DD)

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "orderNumber": "CMD-2024-001",
    "orderDate": "2024-01-15",
    "supplier": {
      "id": 1,
      "raisonSociale": "Supplier ABC"
    },
    "status": "EN_ATTENTE",
    "totalAmount": 5000.00,
    "notes": "Urgent order",
    "orderLines": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "reference": "PROD-001",
          "name": "Cotton Fabric"
        },
        "quantityOrdered": 100.00,
        "unitPurchasePrice": 25.00,
        "lineTotal": 2500.00
      }
    ]
  }
]
```

### 2. Get Order By ID
```
GET /api/v1/commandes/{id}
```
**Required Permission:** `READ_SUPPLIER_ORDER`

**Response (200 OK):** Same as single order object above

### 3. Get Orders By Supplier
```
GET /api/v1/commandes/fournisseur/{supplierId}
```
**Required Permission:** `READ_SUPPLIER_ORDER`

**Response (200 OK):** Array of orders for that supplier

### 4. Create Order
```
POST /api/v1/commandes
```
**Required Permission:** `CREATE_SUPPLIER_ORDER`

**Request Body:**
```json
{
  "supplierId": 1,              // Required, must exist
  "notes": "string",            // Optional
  "orderLines": [               // Required, at least one line
    {
      "productId": 1,           // Required, must exist
      "quantityOrdered": 100.00, // Required, must be > 0
      "unitPurchasePrice": 25.00 // Required, must be > 0
    }
  ]
}
```

**Response (201 CREATED):** Returns created order with status EN_ATTENTE

### 5. Update Order
```
PUT /api/v1/commandes/{id}
```
**Required Permission:** `UPDATE_SUPPLIER_ORDER`

**Request Body:** Same as Create Order

**Response (200 OK):** Returns updated order

**Note:** Can only update orders with status EN_ATTENTE

### 6. Delete Order
```
DELETE /api/v1/commandes/{id}
```
**Required Permission:** `DELETE_SUPPLIER_ORDER`

**Response (200 OK):**
```json
{
  "message": "Order deleted successfully",
  "orderId": "1"
}
```

### 7. Validate Order
```
PUT /api/v1/commandes/{id}/valider
```
**Required Permission:** `VALIDATE_SUPPLIER_ORDER`

**Response (200 OK):** Returns order with status VALIDEE

**Note:** Changes status from EN_ATTENTE to VALIDEE

### 8. Cancel Order
```
PUT /api/v1/commandes/{id}/annuler
```
**Required Permission:** `UPDATE_SUPPLIER_ORDER`

**Response (200 OK):** Returns order with status ANNULEE

### 9. Receive Order (Creates FIFO Stock Entries)
```
PUT /api/v1/commandes/{id}/reception
```
**Required Permission:** `RECEIVE_DELIVERY`

**Response (200 OK):** Returns order with status LIVREE

**Note:** 
- Changes status from VALIDEE to LIVREE
- Automatically creates stock batches (FIFO lots) for each order line
- Updates product stock quantities

---

## 📊 STOCK MANAGEMENT ENDPOINTS

**Base Path:** `/api/v1/stock`

### 1. Get Global Stock Overview
```
GET /api/v1/stock
```
**Required Permission:** `READ_STOCK`

**Response (200 OK):**
```json
[
  {
    "productId": 1,
    "productReference": "PROD-001",
    "productName": "Cotton Fabric",
    "currentStock": 150.00,
    "reorderPoint": 50.00,
    "stockValue": 3825.00,
    "unitOfMeasure": "meters"
  }
]
```

### 2. Get Product Stock Detail (with FIFO Batches)
```
GET /api/v1/stock/produit/{productId}
```
**Required Permission:** `READ_STOCK`

**Response (200 OK):**
```json
{
  "productId": 1,
  "productReference": "PROD-001",
  "productName": "Cotton Fabric",
  "currentStock": 150.00,
  "reorderPoint": 50.00,
  "totalStockValue": 3825.00,
  "unitOfMeasure": "meters",
  "batches": [
    {
      "id": 1,
      "batchNumber": "LOT-2024-001",
      "entryDate": "2024-01-15T10:30:00",
      "remainingQuantity": 80.00,
      "unitPurchasePrice": 25.00,
      "batchValue": 2000.00,
      "supplierOrderId": 1,
      "supplierOrderNumber": "CMD-2024-001"
    },
    {
      "id": 2,
      "batchNumber": "LOT-2024-002",
      "entryDate": "2024-02-10T14:20:00",
      "remainingQuantity": 70.00,
      "unitPurchasePrice": 26.00,
      "batchValue": 1820.00,
      "supplierOrderId": 2,
      "supplierOrderNumber": "CMD-2024-002"
    }
  ]
}
```

### 3. Get Stock Movements (with Advanced Filters)
```
GET /api/v1/stock/mouvements
GET /api/v1/stock/mouvements?dateDebut=2024-01-01&dateFin=2024-12-31
GET /api/v1/stock/mouvements?produitId=1&type=ENTREE
GET /api/v1/stock/mouvements?reference=CMD-2024-001
GET /api/v1/stock/mouvements?numeroLot=LOT-2024-001
GET /api/v1/stock/mouvements?page=0&size=20&sort=movementDate,desc
```
**Required Permission:** `READ_STOCK`

**Query Parameters:**
- `dateDebut` (optional): ISO date (YYYY-MM-DD)
- `dateFin` (optional): ISO date (YYYY-MM-DD)
- `produitId` (optional): number
- `reference` (optional): string (order or delivery note reference)
- `type` (optional): ENTREE | SORTIE
- `numeroLot` (optional): string
- `page` (optional): number, default 0
- `size` (optional): number, default 10
- `sort` (optional): string, format "field,direction" (e.g., "movementDate,desc")

**Response (200 OK):**
```json
{
  "content": [
    {
      "id": 1,
      "movementDate": "2024-01-15T10:30:00",
      "movementType": "ENTREE",
      "product": {
        "id": 1,
        "reference": "PROD-001",
        "name": "Cotton Fabric"
      },
      "quantity": 100.00,
      "unitPrice": 25.00,
      "batchNumber": "LOT-2024-001",
      "reference": "CMD-2024-001",
      "notes": "Reception from supplier order"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 50,
  "totalPages": 5,
  "last": false
}
```

### 4. Get Movements By Product
```
GET /api/v1/stock/mouvements/produit/{productId}
```
**Required Permission:** `READ_STOCK`

**Response (200 OK):** Array of movements for that product

### 5. Get Stock Alerts (Low Stock Products)
```
GET /api/v1/stock/alertes
```
**Required Permission:** `READ_STOCK`

**Response (200 OK):**
```json
[
  {
    "productId": 1,
    "productReference": "PROD-001",
    "productName": "Cotton Fabric",
    "currentStock": 45.00,
    "reorderPoint": 50.00,
    "shortage": 5.00,
    "unitOfMeasure": "meters"
  }
]
```

### 6. Get Stock Valuation (FIFO Method)
```
GET /api/v1/stock/valorisation
```
**Required Permission:** `READ_STOCK`

**Response (200 OK):**
```json
{
  "totalStockValue": 125000.00,
  "totalProducts": 45,
  "valuationDate": "2024-01-20T15:30:00",
  "valuationMethod": "FIFO"
}
```

---

## 📤 DELIVERY NOTES (BONS DE SORTIE) ENDPOINTS

**Base Path:** `/api/v1/bons-sortie`

### 1. Get All Delivery Notes
```
GET /api/v1/bons-sortie
```
**Required Permission:** `READ_DELIVERY_NOTE`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "noteNumber": "BS-2024-001",
    "exitDate": "2024-01-20",
    "workshop": "Atelier A",
    "exitReason": "PRODUCTION",
    "status": "VALIDE",
    "comments": "For order #123",
    "deliveryNoteLines": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "reference": "PROD-001",
          "name": "Cotton Fabric"
        },
        "quantity": 50.00
      }
    ]
  }
]
```

### 2. Get Delivery Note By ID
```
GET /api/v1/bons-sortie/{id}
```
**Required Permission:** `READ_DELIVERY_NOTE`

**Response (200 OK):** Same as single delivery note object above

### 3. Get Delivery Notes By Workshop
```
GET /api/v1/bons-sortie/atelier/{atelier}
```
**Required Permission:** `READ_DELIVERY_NOTE`

**Path Parameter:**
- `atelier`: string (workshop name)

**Response (200 OK):** Array of delivery notes for that workshop

### 4. Create Delivery Note (Draft)
```
POST /api/v1/bons-sortie
```
**Required Permission:** `CREATE_EXIT_ORDER`

**Request Body:**
```json
{
  "noteNumber": "BS-2024-001",      // Required, not blank
  "exitDate": "2024-01-20",         // Required, ISO date format
  "workshop": "Atelier A",          // Required, not blank
  "exitReason": "PRODUCTION",       // Required: PRODUCTION | MAINTENANCE | AUTRE
  "comments": "string",             // Optional
  "deliveryNoteLines": [            // Required, at least one line
    {
      "productId": 1,               // Required, must exist
      "quantity": 50.00             // Required, must be positive
    }
  ]
}
```

**Response (201 CREATED):** Returns created delivery note with status BROUILLON

**Note:** Status is automatically set to BROUILLON (draft)

### 5. Update Delivery Note (Draft Only)
```
PUT /api/v1/bons-sortie/{id}
```
**Required Permission:** `CREATE_EXIT_ORDER`

**Request Body:** Same as Create Delivery Note

**Response (200 OK):** Returns updated delivery note

**Note:** Can only update delivery notes with status BROUILLON

### 6. Delete Delivery Note (Draft Only)
```
DELETE /api/v1/bons-sortie/{id}
```
**Required Permission:** `CREATE_EXIT_ORDER`

**Response (200 OK):**
```json
{
  "message": "Delivery note deleted successfully",
  "id": "1"
}
```

**Note:** Can only delete delivery notes with status BROUILLON

### 7. Validate Delivery Note (Triggers FIFO Stock Exit)
```
PUT /api/v1/bons-sortie/{id}/valider
```
**Required Permission:** `VALIDATE_EXIT_ORDER`

**Response (200 OK):** Returns delivery note with status VALIDE

**Note:**
- Changes status from BROUILLON to VALIDE
- Automatically creates stock movements (SORTIE type)
- Consumes stock using FIFO method (oldest batches first)
- Updates product stock quantities
- Cannot be undone

### 8. Cancel Delivery Note (Draft Only)
```
PUT /api/v1/bons-sortie/{id}/annuler
```
**Required Permission:** `VALIDATE_EXIT_ORDER`

**Response (200 OK):** Returns delivery note with status ANNULE

**Note:** Can only cancel delivery notes with status BROUILLON

---

## 📋 ENUMS REFERENCE

### Order Status (OrderStatus)
```
EN_ATTENTE   - Pending/Waiting
VALIDEE      - Validated
LIVREE       - Delivered/Received
ANNULEE      - Cancelled
```

### Exit Order Status (ExitOrderStatus)
```
BROUILLON    - Draft
VALIDE       - Validated
ANNULE       - Cancelled
```

### Exit Reason (ExitReason)
```
PRODUCTION   - For production use
MAINTENANCE  - For maintenance
AUTRE        - Other reasons
```

### Movement Type (MovementType)
```
ENTREE       - Stock entry (from supplier order reception)
SORTIE       - Stock exit (from delivery note validation)
```

### Roles (RoleApp)
```
ADMIN
RESPONSABLE_ACHATS
MAGASINIER
CHEF_ATELIER
```

---

## 🔒 PERMISSIONS REFERENCE

### Supplier Permissions
- `CREATE_SUPPLIER` - Create new suppliers
- `READ_SUPPLIER` - View suppliers
- `UPDATE_SUPPLIER` - Update supplier information
- `DELETE_SUPPLIER` - Delete suppliers

### Product Permissions
- `CREATE_PRODUCT` - Create new products
- `READ_PRODUCT` - View products
- `UPDATE_PRODUCT` - Update product information
- `DELETE_PRODUCT` - Delete products

### Supplier Order Permissions
- `CREATE_SUPPLIER_ORDER` - Create new orders
- `READ_SUPPLIER_ORDER` - View orders
- `UPDATE_SUPPLIER_ORDER` - Update orders
- `DELETE_SUPPLIER_ORDER` - Delete orders
- `VALIDATE_SUPPLIER_ORDER` - Validate orders (change status to VALIDEE)
- `RECEIVE_DELIVERY` - Receive orders (change status to LIVREE, create stock)

### Delivery Note Permissions
- `CREATE_EXIT_ORDER` - Create/update/delete delivery notes (drafts)
- `READ_DELIVERY_NOTE` - View delivery notes
- `VALIDATE_EXIT_ORDER` - Validate/cancel delivery notes (triggers FIFO exit)

### Stock Permissions
- `READ_STOCK` - View stock, movements, alerts, valuation

### Admin Permissions
- `MANAGE_USERS` - Manage users and roles
- `MANAGE_PERMISSIONS` - Manage custom permissions
- `VIEW_AUDIT_LOGS` - View audit logs

---

## ⚠️ ERROR RESPONSES

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "status": 400,
  "errors": {
    "email": "must be a valid email address",
    "password": "size must be between 6 and 100"
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized - Invalid or expired token",
  "status": 401
}
```

### 403 Forbidden
```json
{
  "message": "Access denied - Insufficient permissions",
  "status": 403
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "status": 404
}
```

### 409 Conflict
```json
{
  "message": "Duplicate resource - Email already exists",
  "status": 409
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "status": 500
}
```

---

## 💡 IMPORTANT NOTES

1. **FIFO Logic:**
   - When receiving orders: Creates stock batches with entry date
   - When validating delivery notes: Consumes oldest batches first
   - Stock valuation uses FIFO method (oldest prices first)

2. **Status Workflows:**
   - **Supplier Order:** EN_ATTENTE → VALIDEE → LIVREE (or ANNULEE)
   - **Delivery Note:** BROUILLON → VALIDE (or ANNULE)

3. **Permissions:**
   - Users can have multiple roles
   - Permissions are cumulative from all roles
   - Admins can override individual permissions (grant/revoke)

4. **Validation:**
   - All required fields must be provided
   - Numeric values must be positive where specified
   - Dates must be in ISO format (YYYY-MM-DD)
   - IDs must reference existing entities

5. **Pagination:**
   - Default page size: 10
   - Page numbers start at 0
   - Sort format: "field,direction" (e.g., "name,asc")

---

**END OF API DOCUMENTATION** 🚀
