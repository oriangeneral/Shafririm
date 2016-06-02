import { ExceptionHandler } from '@angular/core/src/facade/exception_handler';

export interface ExceptionHandlerContract {
  call(exception: any, stackTrace?: any, reason?: string): void;
}

export class AppExceptionHandler implements ExceptionHandlerContract {

  public call(exception: any, stackTrace?: any, reason?: string): void {
    if (exception.message.indexOf('animation_aborted') !== -1) {
      // An animation was interrupted or replaced.
      // No need for reporting an error.
      return;
    }

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
