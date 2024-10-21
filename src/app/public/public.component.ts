import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../shared/providers/services/loader.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit{
  loaderService: LoaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.hideLoader();
  }
}
