// src/app/pages/clients/client-list/client-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Imports do Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

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

  constructor(private clientService: ClientService) {}

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
          console.log('Cliente excluído com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir cliente:', err);
        }
      });
    }
  }
}
