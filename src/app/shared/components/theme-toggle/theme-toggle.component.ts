import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  isToggle: boolean = false;

  ngOnInit() {
    const isToggleTheme = localStorage.getItem('isToggleTheme')
    if(isToggleTheme) {
      this.isToggle = JSON.parse(isToggleTheme);
      this.changeColorTheme();
    }
  }

  isToggleTheme() {
    this.isToggle = !this.isToggle;
    console.log(this.isToggle)
    localStorage.setItem('isToggleTheme', JSON.stringify(this.isToggle));
    this.changeColorTheme();
  }

  changeColorTheme() {
    const htmlElement = document.documentElement;

    if (this.isToggle) {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    }
  }
}
