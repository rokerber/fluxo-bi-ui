// src/app/pages/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product';
import { AlertService } from '../../../components/services/alert-dialog.service';


// Imports do Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.isLoading = false;
        this.alertService.showError('Erro ao carregar produtos. Tente novamente.');
      }
    });
  }

  deleteProduct(id: number): void {
    const confirmation = confirm('Tem certeza que deseja excluir este produto?');

    if (confirmation) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          this.alertService.showSuccess('Produto excluído com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);

          if (err.status === 400 && err.error?.error === 'REFERENTIAL_INTEGRITY_VIOLATION') {
            this.alertService.showError(err.error.message, 'Não é possível excluir');
          } else {
            this.alertService.showError('Erro ao excluir produto. Tente novamente.');
          }
        }
      });
    }
  }
}
