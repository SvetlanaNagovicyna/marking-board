import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/providers/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  loaderService: LoaderService = inject(LoaderService);

  ngOnInit() {
    this.loaderService.hideLoader();
  }
}
