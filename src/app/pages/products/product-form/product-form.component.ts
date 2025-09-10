import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

// Imports do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  isEditMode = false;
  private productId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = +idParam;
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe(data => {
        this.productForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.productForm.valid) {
      const action = this.isEditMode && this.productId
        ? this.productService.updateProduct(this.productId, this.productForm.value)
        : this.productService.createProduct(this.productForm.value);

      action.subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => {
          if (err.status === 409 && err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
          }
        }
      });
    }
  }
}
