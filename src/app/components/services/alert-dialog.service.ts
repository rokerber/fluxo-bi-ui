// src/app/shared/services/alert.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogData } from '../alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  showSuccess(message: string, title: string = 'Sucesso'): void {
    this.showAlert({
      title,
      message,
      type: 'success'
    });
  }

  showError(message: string, title: string = 'Erro'): void {
    this.showAlert({
      title,
      message,
      type: 'error'
    });
  }

  showWarning(message: string, title: string = 'Atenção'): void {
    this.showAlert({
      title,
      message,
      type: 'warning'
    });
  }

  showInfo(message: string, title: string = 'Informação'): void {
    this.showAlert({
      title,
      message,
      type: 'info'
    });
  }

  private showAlert(data: AlertDialogData): void {
    this.dialog.open(AlertDialogComponent, {
      width: '400px',
      disableClose: false,
      data: data
    });
  }
}
