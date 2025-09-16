import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    PageHeaderComponent
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'contactPerson', 'email', 'actions'];
  isLoading = true;

  constructor(private clientService: ClientService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.isLoading = false;
    });
  }
  deleteClient(id: number): void {
    const confirmation = confirm('Tem certeza que deseja excluir este cliente?');

    if (confirmation) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(client => client.id !== id);
          this.showSuccess('Cliente excluído com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir cliente:', err);

          // Verificar se é erro de integridade referencial
          if (err.status === 400 && err.error?.error === 'REFERENTIAL_INTEGRITY_VIOLATION') {
            this.showError(err.error.message);
          } else {
            this.showError('Erro ao excluir cliente. Tente novamente.');
          }
        }
      });
    }
  }
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
