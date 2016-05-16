import { ExceptionHandler } from '@angular/core/src/facade/exception_handler';

export interface ExceptionHandlerContract {
  call(exception: any, stackTrace?: any, reason?: string): void;
}

export class AppExceptionHandler implements ExceptionHandlerContract {

  public call(exception: any, stackTrace?: any, reason?: string): void {
    console.groupCollapsed('Whoops, something went wrong.');

    console.warn('Please run the app in development mode to debug.');

    console.error(exception);

    if (stackTrace !== undefined) {
      console.error(stackTrace);
    }

    if (reason !== undefined) {
      console.log(reason);
    }

    console.groupEnd();
  }

}
