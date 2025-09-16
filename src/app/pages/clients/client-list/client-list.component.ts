import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertService } from '../../../components/services/alert-dialog.service';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { PageHeaderComponent } from '../../../components/page-header/page-header.component';

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

  constructor(
    private clientService: ClientService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.isLoading = false;
        this.alertService.showError('Erro ao carregar clientes. Tente novamente.');
      }
    });
  }

  deleteClient(id: number): void {
    const confirmation = confirm('Tem certeza que deseja excluir este cliente?');

    if (confirmation) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(client => client.id !== id);
          this.alertService.showSuccess('Cliente excluído com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir cliente:', err);

          if (err.status === 400 && err.error?.error === 'REFERENTIAL_INTEGRITY_VIOLATION') {
            this.alertService.showError(err.error.message, 'Não é possível excluir');
          } else {
            this.alertService.showError('Erro ao excluir cliente. Tente novamente.');
          }
        }
      });
    }
  }
}
