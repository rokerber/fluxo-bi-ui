// src/app/pages/clients/client-form/client-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientService } from '../client.service';
import { CommonModule } from '@angular/common';

// Imports do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-client-form',
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
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  isEditMode = false;
  private clientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      contactPerson: [''],
      email: ['', Validators.email],
      phone: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clientId = +idParam; // O '+' converte a string para número
      this.isEditMode = true;
      this.clientService.getClientById(this.clientId).subscribe(data => {
        this.clientForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      if (this.isEditMode && this.clientId) {
        this.clientService.updateClient(this.clientId, this.clientForm.value).subscribe({
          next: () => this.router.navigate(['/clients']),
          error: (err) => console.error('Erro ao atualizar cliente:', err)
        });
      } else {
        this.clientService.createClient(this.clientForm.value).subscribe({
          next: () => this.router.navigate(['/clients']),
          error: (err) => console.error('Erro ao criar cliente:', err)
        });
      }
    }
  }
}
