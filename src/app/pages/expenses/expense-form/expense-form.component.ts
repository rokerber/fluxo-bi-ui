import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense.service';

// Imports do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para o status "Pago"
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule // Importe aqui
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {

  expenseForm: FormGroup;
  isEditMode = false;
  private expenseId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      dueDate: ['', Validators.required],
      paymentDate: [null],
      paid: [false],
      isInstallment: [false],
      installments: [null]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.expenseId = +idParam;
      this.isEditMode = true;
      this.expenseService.getExpenseById(this.expenseId).subscribe(data => {
        this.expenseForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.expenseForm.valid) {
      const action = this.isEditMode && this.expenseId
        ? this.expenseService.updateExpense(this.expenseId, this.expenseForm.value)
        : this.expenseService.createExpense(this.expenseForm.value);

      action.subscribe({
        next: () => this.router.navigate(['/expenses']),
        error: (err) => {
          this.errorMessage = 'Ocorreu um erro ao salvar a despesa. Tente novamente.';
          console.error(err);
        }
      });
    }
  }
}
