import { effect, Injectable, signal, WritableSignal } from '@angular/core';
export const storageKey = "theme";
@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  themeSignal: WritableSignal<string> = signal<string>("dark");

  constructor() {
    this.initializeThemeFromPreferences();

    effect(() => {
      this.updateRenderedTheme();
    });
  }

  toggleTheme(): void {
    this.themeSignal.update(() =>
      this.isDarkThemeActive() ? "light" : "dark"
    );
  }

  private initializeThemeFromPreferences(): void {
    this.initializeStylesheet();

    const storedTheme = localStorage.getItem(storageKey);

    if (storedTheme) {
      this.themeSignal.update(() => storedTheme);
    }
  }

  private initializeStylesheet(): void {
    document.body.setAttribute('id', this.themeSignal());
  }

  getToggleLabel(): string {
    return `Switch to ${this.isDarkThemeActive() ? "dark" : "light"} mode`;
  }

  isDarkThemeActive(): boolean {
    return this.themeSignal() === "dark";
  }

  private updateRenderedTheme(): void {
    document.body.setAttribute('id', this.themeSignal());
    localStorage.setItem(storageKey, this.themeSignal());
  }
}
