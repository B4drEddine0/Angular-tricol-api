# TRICOL Supply Chain Management - Frontend

Modern enterprise Angular 20 application for managing supply chain operations including suppliers, products, orders, delivery notes, and stock with FIFO inventory management.

## Features

- **Authentication**: Login/Register with JWT tokens
- **Dashboard**: Overview with key metrics and quick actions
- **Suppliers Management**: CRUD operations for suppliers
- **Products Management**: CRUD operations with stock levels
- **Orders Management**: Create, validate, and receive supplier orders
- **Delivery Notes**: Create and validate exit orders with FIFO stock consumption
- **Stock Management**: Real-time stock overview, alerts, and movements
- **User Management**: Admin panel for managing users, roles, and permissions

## Tech Stack

- Angular 20
- Angular Material (Professional UI components)
- RxJS
- TypeScript
- JWT Authentication

## Prerequisites

- Node.js 18+
- npm
- Backend API running on http://localhost:9091

## Installation

```bash
cd FifoFront
npm install
```

## Running the Application

```bash
npm start
```

The application will be available at `http://localhost:4200`

## Default Login

After registering a user, an admin needs to assign roles via the backend or database.

## Project Structure

```
src/app/
├── components/
│   └── layout/          # Main layout with sidebar
├── guards/              # Auth guard
├── interceptors/        # JWT interceptor
├── models/              # TypeScript interfaces
├── pages/
│   ├── auth/           # Login & Register
│   ├── dashboard/      # Dashboard overview
│   ├── suppliers/      # Suppliers CRUD
│   ├── products/       # Products CRUD
│   ├── orders/         # Orders management
│   ├── delivery-notes/ # Delivery notes
│   ├── stock/          # Stock overview
│   └── admin/          # User management
└── services/           # API services
```

## API Endpoints

All endpoints are documented in `API_ENDPOINTS_COMPLETE.md`

Base URL: `http://localhost:9091`

## Features by Role

- **ADMIN**: Full access to all features
- **RESPONSABLE_ACHATS**: Suppliers, Products, Orders
- **MAGASINIER**: Delivery notes, Stock management
- **CHEF_ATELIER**: Read-only + Create exit orders

## Build for Production

```bash
npm run build
```

Build artifacts will be in the `dist/` directory.
