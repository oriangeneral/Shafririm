import { ErrorHandler } from '@angular/core';
import $ from 'jquery';

export class AppErrorHandler implements ErrorHandler {

  public handleError(error) {
    if (error.message.indexOf('animation_aborted') !== -1) {
      // An animation was interrupted or replaced.
      // No need for reporting an error.
      return;
    }

    $('#exception-modal').openModal({
      dismissible: false,
      opacity: .3,
      in_duration: 200,
      out_duration: 150
    });

    console.groupCollapsed('Whoops, something went wrong.');
    console.warn('Please run the app in development mode to debug.');
    console.groupEnd();

    // console.error(exception);
    //
    // if (stackTrace !== undefined) {
    //   console.error(stackTrace);
    // }
    //
    // if (reason !== undefined) {
    //   console.log(reason);
    // }
    //
    // console.groupEnd();
  }

}
