import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SharedService {
  private messageSource = new BehaviorSubject<any>("default message");
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: any) {
    this.messageSource.next(message)
  }
}