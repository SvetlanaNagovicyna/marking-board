import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/providers/services/loader.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  loaderService: LoaderService = inject(LoaderService);

  ngOnInit() {
    this.loaderService.hideLoader();
  }
}
