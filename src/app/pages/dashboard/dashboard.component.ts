import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartConfiguration, ChartOptions } from 'chart.js'; // 1. Importe 'Chart' e 'registerables'
import { DashboardService, TimeSeriesData } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatCardModule, PageHeaderComponent, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading = true;

  public revenueChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public expenseChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public comparisonChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartType: 'line' = 'line';

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables); // 2. Adicione esta linha para registrar os componentes do Chart.js
  }

  ngOnInit(): void {
    this.isLoading = true;

    forkJoin({
      revenues: this.dashboardService.getRevenueHistory(),
      expenses: this.dashboardService.getExpenseHistory()
    }).subscribe(({ revenues, expenses }) => {

      const revenueLabels = revenues.map((d: TimeSeriesData) => new Date(d.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }));
      const revenueValues = revenues.map((d: TimeSeriesData) => d.value);
      this.revenueChartData = {
        labels: revenueLabels,
        datasets: [{ data: revenueValues, label: 'Receitas', backgroundColor: 'rgba(90, 164, 84, 0.2)', borderColor: '#5AA454', pointBackgroundColor: '#5AA454', fill: 'origin' }]
      };

      const expenseLabels = expenses.map((d: TimeSeriesData) => new Date(d.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }));
      const expenseValues = expenses.map((d: TimeSeriesData) => d.value);
      this.expenseChartData = {
        labels: expenseLabels,
        datasets: [{ data: expenseValues, label: 'Despesas', backgroundColor: 'rgba(161, 10, 40, 0.2)', borderColor: '#A10A28', pointBackgroundColor: '#A10A28', fill: 'origin' }]
      };

      const allLabelsSet = new Set([...revenueLabels, ...expenseLabels]);
      const allLabels = Array.from(allLabelsSet).sort((a, b) => {
        const [dayA, monthA] = a.split(' de ');
        const [dayB, monthB] = b.split(' de ');
        const dateA = new Date(`2025 ${monthA} ${dayA}`);
        const dateB = new Date(`2025 ${monthB} ${dayB}`);
        return dateA.getTime() - dateB.getTime();
      });

      const comparisonRevenueData = allLabels.map(label => {
        const index = revenueLabels.indexOf(label);
        return index !== -1 ? revenueValues[index] : null;
      });

      const comparisonExpenseData = allLabels.map(label => {
        const index = expenseLabels.indexOf(label);
        return index !== -1 ? expenseValues[index] : null;
      });

      this.comparisonChartData = {
        labels: allLabels,
        datasets: [
          { data: comparisonRevenueData, label: 'Receitas', borderColor: '#5AA454', pointBackgroundColor: '#5AA454', tension: 0.3 },
          { data: comparisonExpenseData, label: 'Despesas', borderColor: '#A10A28', pointBackgroundColor: '#A10A28', tension: 0.3 }
        ]
      };

      this.isLoading = false;
    });
  }
}
