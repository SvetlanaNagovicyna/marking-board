import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public hideLoader(): void {
    this.loaderState$.next(false);
  }
}
