import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../types/theme.type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme$ = new BehaviorSubject<Theme>('dark');
  userService = inject(UserService);

  constructor() {
    this.loadUserTheme();
  }

  getCurrentTheme(): Theme {
    return this.theme$.getValue();
  }

  setTheme(theme: Theme) {
    this.theme$.next(theme);
  }

  toggleTheme() {
    const newTheme: Theme = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.userService.updateUserTheme(newTheme);
  }

  private loadUserTheme(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return
    }
    this.userService.getUserThemeFromDb(userId).subscribe((theme: Theme) => {
      if (theme) {
        this.setTheme(theme);
      }
    });
  }
}
