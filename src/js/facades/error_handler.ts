import { WrappedError } from '@angular/core/src/facade/errors';
import { ErrorHandler, isDevMode } from '@angular/core';
import $ from 'jquery';

export class AppErrorHandler implements ErrorHandler {

  protected rethrowError: boolean;

  private _console: Console = console;

  private _modal: any;

  constructor(rethrowError = true) {
    this.rethrowError = rethrowError;
  }

  public handleError(error: any) {
    if (isDevMode()) {
      this.handleErrorDev(error);
      return;
    }

    this.handleErrorProd(error);
  }

  protected handleErrorDev(error: any) {
    let originalError = this._findOriginalError(error);
    let originalStack = this._findOriginalStack(error);
    let context = this._findContext(error);

    console.groupCollapsed('Whoops, something went wrong.');

    this._console.error(`EXCEPTION: ${this._extractMessage(error)}`);

    if (originalError) {
      this._console.error(`ORIGINAL EXCEPTION: ${this._extractMessage(originalError)}`);
    }

    if (originalStack) {
      this._console.error('ORIGINAL STACKTRACE:');
      this._console.error(originalStack);
    }

    if (context) {
      this._console.error('ERROR CONTEXT:');
      this._console.error(context);
    }

    if (this.rethrowError) {
      throw error;
    }

    console.groupEnd();
  }

  protected handleErrorProd(error: any) {
    if (error.message.indexOf('animation_aborted') !== -1) {
      // An animation was interrupted or replaced.
      // No need for reporting an error.
      return;
    }

    if (!this._modal) {
      this._modal = $('#exception-modal').modal({
        dismissible: false,
        opacity: .3,
        in_duration: 200,
        out_duration: 150
      });
    }

    this._modal.modal('open');

    console.groupCollapsed('Whoops, something went wrong.');
    console.warn('Please run the app in development mode to debug.');
    console.groupEnd();
  }

  private _extractMessage(error: any): string {
    return error instanceof Error ? error.message : error.toString();
  }

  private _findContext(error: any): any {
    if (error) {
      return error.context ? error.context :
        this._findContext((error as WrappedError).originalError);
    } else {
      return null;
    }
  }

  private _findOriginalError(error: any): any {
    let e = (error as WrappedError).originalError;
    while (e && (e as WrappedError).originalError) {
      e = (e as WrappedError).originalError;
    }

    return e;
  }

  private _findOriginalStack(error: any): string {
    if (!(error instanceof Error)) {
      return null;
    }

    let e: any = error;
    let stack: string = e.stack;
    while (e instanceof Error && (e as WrappedError).originalError) {
      e = (e as WrappedError).originalError;
      if (e instanceof Error && e.stack) {
        stack = e.stack;
      }
    }

    return stack;
  }

}

export default AppErrorHandler;
