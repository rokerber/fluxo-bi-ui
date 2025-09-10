// src/app/pages/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product';

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
  // A CORREÇÃO ESTÁ NESTA LINHA ABAIXO
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.isLoading = false;
    });
  }

  deleteProduct(id: number): void {
    const confirmation = confirm('Tem certeza que deseja excluir este produto?');

    if (confirmation) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
        }
      });
    }
  }
}
