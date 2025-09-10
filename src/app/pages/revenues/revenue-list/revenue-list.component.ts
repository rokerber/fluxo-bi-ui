// src/app/pages/revenues/revenue-list/revenue-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RevenueService } from '../revenue.service';
import { Revenue } from '../revenue';

// Imports do Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-revenue-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './revenue-list.component.html',
  styleUrl: './revenue-list.component.css'
})
export class RevenueListComponent implements OnInit {

  revenues: Revenue[] = [];
  displayedColumns: string[] = ['id', 'description', 'amount', 'revenueDate', 'client', 'product', 'actions'];
  isLoading = true;

  constructor(private revenueService: RevenueService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.revenueService.getRevenues().subscribe(data => {
      this.revenues = data;
      this.isLoading = false;
    });
  }

  deleteRevenue(id: number): void {
    // A lógica de exclusão virá aqui no futuro
    console.log('Deletar receita com ID:', id);
  }
}
