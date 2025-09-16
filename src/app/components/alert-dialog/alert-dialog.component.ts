// src/app/shared/components/alert-dialog/alert-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface AlertDialogData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="alert-dialog">
      <div class="dialog-header" [ngClass]="'header-' + data.type">
        <mat-icon class="dialog-icon">{{ getIcon() }}</mat-icon>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>

      <mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-raised-button [color]="getButtonColor()" (click)="close()">
          OK
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .alert-dialog {
      min-width: 350px;
      max-width: 500px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px 0;
      margin-bottom: 16px;
    }

    .dialog-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .header-success {
      color: #4caf50;
    }

    .header-error {
      color: #f44336;
    }

    .header-warning {
      color: #ff9800;
    }

    .header-info {
      color: #2196f3;
    }

    .dialog-content {
      padding: 0 24px;
      font-size: 16px;
      line-height: 1.5;
    }

    .dialog-actions {
      justify-content: flex-end;
      padding: 24px;
      margin: 0;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
  `]
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }

  getButtonColor(): string {
    switch (this.data.type) {
      case 'success': return 'primary';
      case 'error': return 'warn';
      case 'warning': return 'accent';
      case 'info': return 'primary';
      default: return 'primary';
    }
  }
}
