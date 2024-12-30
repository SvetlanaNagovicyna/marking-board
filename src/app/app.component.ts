import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  domSanitizer: DomSanitizer = inject(DomSanitizer);
  title: string = 'marking-board';

  constructor() {
    this.iconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/icons.svg")
    );
  }
}
