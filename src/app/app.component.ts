import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent // 2. Adicione o LayoutComponent aos imports
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fluxo-bi-ui';
}
