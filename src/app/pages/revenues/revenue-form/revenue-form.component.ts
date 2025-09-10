// src/app/pages/revenues/revenue-form/revenue-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Serviços
import { RevenueService } from '../revenue.service';
import { ClientService } from '../../clients/client.service';
import { ProductService } from '../../products/product.service';

// Tipos
import { Client } from '../../clients/client';
import { Product } from '../../products/product';

// Imports do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-revenue-form',
  standalone: true,
  providers: [provideNativeDateAdapter()], // Necessário para o Datepicker
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './revenue-form.component.html',
  styleUrl: './revenue-form.component.css'
})
export class RevenueFormComponent implements OnInit {

  revenueForm: FormGroup;
  isEditMode = false;
  private revenueId: number | null = null;
  errorMessage: string | null = null;

  // Arrays para guardar os dados dos dropdowns
  clients: Client[] = [];
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private revenueService: RevenueService,
    private clientService: ClientService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.revenueForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      revenueDate: ['', Validators.required],
      clientId: ['', Validators.required],
      productId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClientsAndProducts(); // Carrega os dados para os dropdowns

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.revenueId = +idParam;
      this.isEditMode = true;
      this.revenueService.getRevenueById(this.revenueId).subscribe(data => {
        // O DTO de resposta tem objetos aninhados, então precisamos pegar os IDs
        const formData = {
          ...data,
          clientId: data.client.id,
          productId: data.product.id
        };
        this.revenueForm.patchValue(formData);
      });
    }
  }

  loadClientsAndProducts(): void {
    this.clientService.getClients().subscribe(data => this.clients = data);
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.revenueForm.valid) {
      const action = this.isEditMode && this.revenueId
        ? this.revenueService.updateRevenue(this.revenueId, this.revenueForm.value)
        : this.revenueService.createRevenue(this.revenueForm.value);

      action.subscribe({
        next: () => this.router.navigate(['/revenues']),
        error: (err) => {
          this.errorMessage = 'Ocorreu um erro ao salvar a receita. Tente novamente.';
          console.error(err);
        }
      });
    }
  }
}
