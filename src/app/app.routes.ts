import { Routes } from '@angular/router';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import {ProductFormComponent} from './pages/products/product-form/product-form.component';
import {RevenueFormComponent} from './pages/revenues/revenue-form/revenue-form.component';
import {RevenueListComponent} from './pages/revenues/revenue-list/revenue-list.component';
import {ExpenseListComponent} from './pages/expenses/expense-list/expense-list.component';
import {ExpenseFormComponent} from './pages/expenses/expense-form/expense-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [

  { path: '', redirectTo: '/painel', pathMatch: 'full' },
  { path: 'painel', component: DashboardComponent },

  // Rotas de Clientes
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/edit/:id', component: ClientFormComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },

  { path: 'revenues', component: RevenueListComponent },
  { path: 'revenues/new', component: RevenueFormComponent },
  { path: 'revenues/edit/:id', component: RevenueFormComponent },

  { path: 'expenses', component: ExpenseListComponent },
  { path: 'expenses/new', component: ExpenseFormComponent },
  { path: 'expenses/edit/:id', component: ExpenseFormComponent }
];
