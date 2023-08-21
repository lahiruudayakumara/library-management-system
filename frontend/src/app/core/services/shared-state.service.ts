import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private classChangeSubject = new BehaviorSubject<boolean>(false);
  classChange$ = this.classChangeSubject.asObservable();

  toggleClass(state: boolean): void {
    this.classChangeSubject.next(state);
  }
}
