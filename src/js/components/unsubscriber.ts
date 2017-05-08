import { OnDestroy } from '@angular/core';

// import { Observable } from 'rxjs/Observable' => Observable undefined
import RxObservable from 'rxjs/Observable';
const Observable = RxObservable.Observable;

export class Unsubscriber implements OnDestroy {

  protected _subscriptions: Observable<any>[] = [];

  public constructor() {
    let destroy = this.ngOnDestroy;

    this.ngOnDestroy = function() {
      if (destroy) {
        destroy.bind(this)();
      }

      this.unsubscribe();
    };
  }

  protected unsubscribe() {
    for (let i = 0, len = this._subscriptions.length; i < len; i++) {
      this._subscriptions[i].unsubscribe();
    }

    this._subscriptions = [];
  }

  get subscriptions() {
    return this._subscriptions;
  }

}

export default Unsubscriber;
