import { Component, inject, Renderer2 } from '@angular/core';
import { ThemeService } from '../../providers/services/theme.service';
import { Theme } from '../../types/theme.type';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {

  themeService = inject(ThemeService);
  renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  isToggleTheme() {
    this.themeService.toggleTheme();
    this.themeService.theme$.subscribe({
      next: (theme) => {
        this.changeDocumentTheme(theme)
      }
    })
  }

  changeDocumentTheme(theme: Theme) {
    const html = this.document.documentElement;
    if (theme === 'light') {
      this.renderer.removeClass(html, 'dark');
      this.renderer.addClass(html, 'light');
    } else {
      this.renderer.removeClass(html, 'light');
      this.renderer.addClass(html, 'dark');
    }
  }
}
