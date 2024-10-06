import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../types/theme.type';
import { UserService } from './user.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme$ = new BehaviorSubject<Theme>('dark');
  userService = inject(UserService);
  rendererFactory = inject(RendererFactory2)
  private document = inject(DOCUMENT);

  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  getCurrentTheme(): Theme {
    return this.theme$.getValue();
  }

  setTheme(theme: Theme) {
    this.theme$.next(theme);
    this.changeDocumentTheme(theme);
  }

  toggleTheme() {
    const newTheme: Theme = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.userService.updateUserTheme(newTheme).subscribe();
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
