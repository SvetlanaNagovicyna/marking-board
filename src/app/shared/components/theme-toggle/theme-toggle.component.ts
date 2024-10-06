import { Component, inject } from '@angular/core';
import { ThemeService } from '../../providers/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);

  isToggleTheme() {
    this.themeService.toggleTheme();
  }
}
