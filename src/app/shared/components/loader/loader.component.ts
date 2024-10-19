import { Component, inject } from '@angular/core';
import { LoaderService } from '../../providers/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loaderService: LoaderService = inject(LoaderService);
}
