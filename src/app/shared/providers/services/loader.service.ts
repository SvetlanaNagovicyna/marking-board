import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests: number = 0;

  getLoading(): boolean {
    return this.activeRequests > 0;
  }

  incrementRequest(): void {
    this.activeRequests++;
  }

  decrementRequest(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
  }
}
