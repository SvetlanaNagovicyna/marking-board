import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../providers/services/loader.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  loaderService: LoaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.hideLoader();
  }
}
