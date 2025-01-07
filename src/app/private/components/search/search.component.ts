import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  isSearchVisible: boolean = false;

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
  }
}
