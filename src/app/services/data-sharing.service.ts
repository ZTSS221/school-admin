import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private tabChangeEventSource = new BehaviorSubject<any>(null);
  tabChangeEvent$ = this.tabChangeEventSource.asObservable();

  sendTabChangeEvent(student: any) {
    this.tabChangeEventSource.next(student);
  }
}
