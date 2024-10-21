import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../providers/services/loader.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderService: LoaderService = inject(LoaderService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  @Input() isGlobal: boolean = false;
  @Input() showLoader: boolean = true;

  ngOnInit(): void {
    if (!this.isGlobal) {
      return;
    }

    this.loaderService.loaderState$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((res: boolean): void => {
        this.showLoader = res;
      });
  }
}
