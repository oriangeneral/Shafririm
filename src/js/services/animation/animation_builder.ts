import { Injectable, ElementRef } from 'angular2/core';

export interface AnimationOptions {
  type: string;
  fillMode?: string;
  timingFunction?: string;
  playState?: string;
  direction?: string;
  duration?: string|number;
  delay?: string|number;
  iterationCount?: string|number;
}


export class AnimationBuilder {

  private _type: string = 'bounce';
  private _fillMode: string = 'none';
  private _timingFunction: string = 'ease';
  private _playState: string = 'running';
  private _direction: string = 'normal';
  private _duration: string|number = 1000;
  private _delay: string|number = 0;
  private _iterationCount: string|number = 1;
  private _mode = 'default';
  private _animationClasses = [];
  private _classHistory = [];

  private _listeners = [];

  public animateShow(element: HTMLElement): Promise<HTMLElement> {
    return this.animate(element, 'show');
  }

  public animateHide(element: HTMLElement): Promise<HTMLElement> {
    return this.animate(element, 'hide');
  }

  public hide(element: HTMLElement): Promise<HTMLElement> {
    return this.animateHide(element);
  }

  public show(element: HTMLElement): Promise<HTMLElement> {
    return this.animateShow(element);
  }

  public animate(element: HTMLElement, mode?: string): Promise<HTMLElement> {
    return new Promise<HTMLElement>((resolve, reject) => {
      if (!mode) {
        mode = 'default';
      }

      console.log('INITIAL REMOVE');
      this.removeListenerForElement(element, true, true);
      this.resetElement(element);

      // Required to get position of element
      element.style.display = 'initial';

      let initialProps: any = {
        position: element.style.position,
        display: element.style.display
      };

      initialProps.bottom = element.style.bottom;
      initialProps.height = element.style.height;
      initialProps.left = element.style.left;
      initialProps.right = element.style.right;
      initialProps.top = element.style.top;
      initialProps.width = element.style.width;

      // Pick up changes
      setTimeout(() => {
        let position = this.getElementPosition(element);

        if (position === null) {
          reject('This browser is not supported (Trying to use getBoundingClientRect on HTMLElement)');
        }

        element.setAttribute('data-reset-styles', JSON.stringify(initialProps));

        element.style.bottom = position.bottom + 'px';
        element.style.height = position.height + 'px';
        element.style.left = position.left + 'px';
        element.style.right = position.right + 'px';
        element.style.top = position.top + 'px';
        element.style.width = position.width + 'px';
        element.style.position = 'fixed';
        element.style.display = 'inline-block';

        let animationEventName = this.whichAnimationEvent(element);

        this.applyAllProperties(element);

        setTimeout(() => {


          this.applyCssClasses(element);

          let handler;
          element.addEventListener(animationEventName, handler = () => {
            element.removeEventListener(animationEventName, handler);
            this.removeListenerForElement(element, false);
            console.log('reset');
            this.resetElement(element);

            if (mode === 'hide') {
              element.setAttribute('hidden', '');
            }

            resolve(element);

            return handler;
          }); // listener

          this._listeners.push({
            element: element,
            eventName: animationEventName,
            listener: handler,
            reject: reject,
          });

        }); // timeout
      });
    }); // promise
  }

  public removeListenerForElement(element: HTMLElement, detach = true, reject = false) {
    let toRemove = [];
    for (let i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i].element !== element) {
        continue;
      }

      console.log('remove listener, detach:', detach);
      // console.log(element);

      let data = this._listeners[i];

      if (detach) {
        console.log('DETACH');
        data.element.removeEventListener(data.eventName, data.listener);
      } else {
        console.log('REFERENCE ONLY');
      }

      if (reject) {
        console.log('REJECT');
        data.reject('Animation aborted.');
      }

      toRemove.push(i);
    }

    toRemove.forEach((value) => {
      this._listeners.splice(value, 1);
    });
    console.log('----------------------------------------');
  }

  public resetElement(element: HTMLElement): AnimationBuilder {
    let initialProps = JSON.parse(element.getAttribute('data-reset-styles'));
    let addOrRemove = 'remove';

    element.removeAttribute('hidden');
    this.removeCssClasses(element);

    // let duration = this._duration;
    // this._duration = 0;
    // this.applyDuration(element);
    // this.setDuration(duration);

    element.classList[addOrRemove]('animated-show');
    element.classList[addOrRemove]('animated-hide');

    if (initialProps) {
      element.style.bottom = ''; // initialProps.bottom + 'px';
      element.style.height = ''; // initialProps.height + 'px';
      element.style.left = ''; // initialProps.left + 'px';
      element.style.right = ''; // initialProps.right + 'px';
      element.style.top = ''; // initialProps.top + 'px';
      element.style.width = ''; // initialProps.width + 'px';
      element.style.position = ''; // initialProps.position;
      element.style.display = ''; // initialProps.display;

      element.removeAttribute('data-reset-styles');
    }

    return this;
  }

  public checkValue(value: any) {
    return (value === 0 || value);
  }

  public setOptions(options: AnimationOptions): AnimationBuilder {
    let method;
    for (let option in options) {
      if (this.checkValue(options[option])) {
        method = 'set' + option.charAt(0).toUpperCase() + option.slice(1);

        if (typeof this[method] === 'function') {
          this[method](options[option]);
        }
      }
    }

    return this;
  }

  public setType(type: string): AnimationBuilder {
    if (this._classHistory.indexOf(type) !== -1) {
      this._classHistory.push(type);
    }
    this._type = type;
    return this;
  }

  public setFillMode(fillMode: string): AnimationBuilder {
    this._fillMode = fillMode;
    return this;
  }

  public setTimingFunction(timingFunction: string): AnimationBuilder {
    this._timingFunction = timingFunction;
    return this;
  }

  public setPlayState(playState: string): AnimationBuilder {
    this._playState = playState;
    return this;
  }

  public setDirection(direction: string): AnimationBuilder {
    this._direction = direction;
    return this;
  }

  public setDuration(duration: string | number): AnimationBuilder {
    this._duration = duration;
    return this;
  }

  public setDelay(delay: string | number): AnimationBuilder {
    this._delay = delay;
    return this;
  }

  public setIterationCount(iterationCount: string | number): AnimationBuilder {
    this._iterationCount = iterationCount;
    return this;
  }

  public applyAllProperties(element: HTMLElement): AnimationBuilder {
    this.applyFillMode(element);
    this.applyTimingFunction(element);
    this.applyPlayState(element);
    this.applyDirection(element);
    this.applyDuration(element);
    this.applyDelay(element);
    this.applyIterationCount(element);

    return this;
  }

  public applyCssClasses(element: HTMLElement, add?: boolean): AnimationBuilder {
    let addOrRemove = add !== false ? 'add' : 'remove';

    this._animationClasses.forEach((name) => {
      element.classList[addOrRemove](name);
    });

    element.classList[addOrRemove]('animated');

    if (addOrRemove === 'add') {
      if (!element.classList.contains(this._type)) {
        element.classList.add(this._type);
      }
    } else {
      this._classHistory.forEach((name) => {
        if (element.classList.contains(name)) {
          element.classList.remove(name);
        }
      });
    }

    element.classList[addOrRemove](this._type);

    return this;
  }

  public removeCssClasses(element: HTMLElement): AnimationBuilder {
    this.applyCssClasses(element, false);

    return this;
  }

  public applyFillMode(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-fill-mode',
      this._fillMode ? this._fillMode : '',
      true
      );

    return this;
  }

  public applyTimingFunction(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-timing-function',
      this._timingFunction ? this._timingFunction : '',
      true
      );

    return this;
  }

  public applyPlayState(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-play-state',
      this._playState ? this._playState : '',
      true
      );

    return this;
  }

  public applyDirection(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-direction',
      this._direction ? this._direction : '',
      true
      );

    return this;
  }

  public applyDuration(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-duration',
      this._duration ? this._duration + 'ms' : '',
      true
      );

    return this;
  }

  public applyDelay(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-delay',
      this._delay ? this._delay + 'ms' : '',
      true
      );

    return this;
  }

  public applyIterationCount(element: HTMLElement): AnimationBuilder {
    this.applyStyle(
      element,
      'animation-iteration-count',
      this._iterationCount ? this._iterationCount : '',
      true
      );

    return this;
  }

  public applyStyle(element: HTMLElement, property: string, value: any, shim?: boolean): AnimationBuilder {
    if (shim === true) {
      element.style['-webkit-' + property] = value;
    }
    element.style[property] = value;

    return this;
  }

  get type(): string {
    return this._type;
  }

  get fillMode(): string {
    return this._fillMode;
  }

  get timingFunction(): string {
    return this._timingFunction;
  }

  get playState(): string {
    return this._playState;
  }

  get direction(): string | number {
    return this._direction;
  }

  get delay(): string | number {
    return this._delay;
  }

  get iterationCount(): string | number {
    return this._iterationCount;
  }

  // https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
  private whichAnimationEvent(element: HTMLElement) {
    let t, el = document.createElement('animationDetectionElement');

    let animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (t in animations) {
      if (element.style[t] !== undefined) {
        return animations[t];
      }
    }
  }

  private getElementPosition(element) {
    if (typeof element.getBoundingClientRect !== 'function') {
      return null;
    }

    return element.getBoundingClientRect();
  }

}
