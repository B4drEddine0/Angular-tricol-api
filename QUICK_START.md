# 🚀 Quick Start Guide

## Prerequisites
- Backend API running on `http://localhost:9091`
- Node.js 18+ installed

## Installation & Run

```bash
cd FifoFront
npm install
npm start
```

Application will be available at: `http://localhost:4200`

## First Time Setup

1. **Register a new user**
   - Navigate to `http://localhost:4200/auth/register`
   - Create an account with username, email, and password

2. **Assign roles (via backend/database)**
   - New users have no roles by default
   - Use backend API or database to assign roles:
     - ADMIN
     - RESPONSABLE_ACHATS
     - MAGASINIER
     - CHEF_ATELIER

3. **Login**
   - Navigate to `http://localhost:4200/auth/login`
   - Use your credentials

## Features Overview

### 📊 Dashboard
- View key metrics (products, orders, alerts, stock value)
- Quick action buttons

### 🏢 Suppliers
- Add/Edit/Delete suppliers
- View all supplier information

### 📦 Products
- Add/Edit/Delete products
- View stock levels with low stock indicators

### 🛒 Orders
- View all supplier orders
- Validate orders (EN_ATTENTE → VALIDEE)
- Receive orders (VALIDEE → LIVREE) - Updates stock with FIFO

### 📤 Delivery Notes
- Create delivery notes (BROUILLON)
- Validate delivery notes - Triggers FIFO stock exit
- Cancel delivery notes

### 📊 Stock
- View stock overview for all products
- View stock alerts (products below reorder point)
- Stock value calculation

### 👥 Admin - Users
- View all users
- Assign/Remove roles
- Enable/Disable users

## Build for Production

```bash
npm run build
```

Output: `dist/FifoFront/`

## Troubleshooting

**Issue**: Cannot login
- Ensure backend is running on port 9091
- Check browser console for errors

**Issue**: 401 Unauthorized
- Token may have expired, logout and login again

**Issue**: 403 Forbidden
- User doesn't have required permissions
- Admin needs to assign appropriate roles

## API Configuration

To change the backend URL, update the `baseUrl` in each service file:
- `src/app/services/*.service.ts`

Default: `http://localhost:9091`
