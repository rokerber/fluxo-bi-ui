import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';

// Imports do Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-expense-list',
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
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[] = [];
  displayedColumns: string[] = ['id', 'description', 'amount', 'dueDate', 'paid', 'actions'];
  isLoading = true;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
      this.isLoading = false;
    });
  }

  deleteExpense(id: number): void {
    // Lógica de exclusão virá aqui no futuro
    console.log('Deletar despesa com ID:', id);
  }
}
