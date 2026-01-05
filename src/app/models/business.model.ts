export interface Supplier {
  id?: number;
  raisonSociale: string;
  address?: string;
  city?: string;
  ice?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

export interface Product {
  id?: number;
  reference: string;
  name: string;
  description?: string;
  unitPrice: number;
  category: string;
  currentStock?: number;
  reorderPoint?: number;
  unitOfMeasure: string;
}

export interface OrderLine {
  id?: number;
  product?: Product;
  productId?: number;
  quantityOrdered: number;
  unitPurchasePrice: number;
  lineTotal?: number;
}

export interface SupplierOrder {
  id?: number;
  orderNumber?: string;
  orderDate?: string;
  supplier?: Supplier;
  supplierId?: number;
  supplierName?: string;
  status?: 'EN_ATTENTE' | 'VALIDEE' | 'LIVREE' | 'ANNULEE';
  totalAmount?: number;
  notes?: string;
  orderLines: OrderLine[];
}

export interface DeliveryNoteLine {
  id?: number;
  product?: Product;
  productId?: number;
  quantity: number;
}

export interface DeliveryNote {
  id?: number;
  noteNumber: string;
  exitDate: string;
  workshop: string;
  exitReason: 'PRODUCTION' | 'MAINTENANCE' | 'AUTRE';
  status?: 'BROUILLON' | 'VALIDE' | 'ANNULE';
  comments?: string;
  deliveryNoteLines: DeliveryNoteLine[];
}

export interface StockOverview {
  productId: number;
  reference: string;
  name: string;
  currentStock: number;
  reorderPoint: number;
  stockValue?: number;
  unitOfMeasure: string;
  isBelowReorderPoint?: boolean;
}

export interface StockBatch {
  id: number;
  batchNumber: string;
  entryDate: string;
  remainingQuantity: number;
  unitPurchasePrice: number;
  batchValue: number;
  supplierOrderId: number;
  supplierOrderNumber: string;
}

export interface StockDetail {
  productId: number;
  productReference: string;
  productName: string;
  currentStock: number;
  reorderPoint: number;
  totalStockValue: number;
  unitOfMeasure: string;
  batches: StockBatch[];
}

export interface StockMovement {
  id: number;
  movementDate: string;
  movementType: 'ENTREE' | 'SORTIE';
  product: Product;
  quantity: number;
  unitPrice: number;
  batchNumber: string;
  reference: string;
  notes?: string;
}

export interface StockAlert {
  productId: number;
  productName: string;
  currentStock: number;
  reorderPoint: number;
  deficit: number;
}
