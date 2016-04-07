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

  public show(element: HTMLElement): Promise<HTMLElement> {
    return this.animate(element, 'show');
  }

  public hide(element: HTMLElement): Promise<HTMLElement> {
    return this.animate(element, 'hide');
  }

  public animate(element: HTMLElement, mode?: string): Promise<HTMLElement> {
    return new Promise<HTMLElement>((resolve, reject) => {
      if (!mode) {
        mode = 'default';
      }

      let animationEventName = this.whichAnimationEvent(element);

      this.resetElement(element);

      let handler;

      let el = element;
      let offset = this.getElementPosition(el);

      let initialProps = {
        top: el.style.top,
        left: el.style.left,
        position: el.style.position,
        display: el.style.display
      };

      el.setAttribute('data-reset-styles', JSON.stringify(initialProps));
      el.style.top = offset.top + 'px';
      el.style.left = offset.left + 150 + 'px';
      el.style.position = 'fixed';
      el.style.display = 'inline-block';
      // el.style.width = 'auto';

        this.applyAllProperties(element);
        this.applyCssClasses(element);

        el.addEventListener(animationEventName, handler = () => {
          el.removeEventListener(animationEventName, handler);
          this.resetElement(el);

          resolve(el);

          return handler;
        });
    });
  }

  public resetElement(element: HTMLElement): AnimationBuilder {
    let addOrRemove = 'remove';
    let initialProps = JSON.parse(element.getAttribute('data-reset-styles'));

    this.removeCssClasses(element);

    element.classList[addOrRemove]('animated-show');
    element.classList[addOrRemove]('animated-hide');

    if (initialProps) {
      element.style.top = initialProps.top;
      element.style.left = initialProps.left;
      element.style.position = initialProps.position;
      element.style.display = initialProps.display;

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

  public setDuration(duration: number): AnimationBuilder {
    this._duration = duration;
    return this;
  }

  public setDelay(delay: number): AnimationBuilder {
    this._delay = delay;
    return this;
  }

  public setIterationCount(iterationCount: number): AnimationBuilder {
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

  get direction(): string|number {
    return this._direction;
  }

  get delay(): string|number {
    return this._delay;
  }

  get iterationCount(): string|number {
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

  // private getElementPosition(obj) {
  //   let curleft = 0, curtop = 0;
  //   if (obj.offsetParent) {
  //     do {
  //       curleft += obj.offsetLeft;
  //       curtop += obj.offsetTop;
  //     } while (obj = obj.offsetParent);
  //   }
  //   return {
  //     left: curleft,
  //     top: curtop
  //   };
  // }

  // private getElementPosition(elt) {
  //   let rect = elt.getBoundingClientRect(), bodyElt = document.body;
  //
  //   return {
  //     top: rect.top + bodyElt.scrollTop,
  //     left: rect.left + bodyElt.scrollLeft
  //   };
  // }

  private getElementPosition(elem) {
    let box = { top: 0, left: 0 };

    if (typeof elem.getBoundingClientRect !== undefined) {
      box = elem.getBoundingClientRect();
    }
    let win = window;
    let docElem = document.documentElement;
    return {
      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
    };
  }

  // var show = function(el, opts) {
  //   opts = opts || {};
  //
  //   opts.animationName = opts.animationName || 'slideInDown';
  //   opts.duration = opts.duration || 350;
  //
  //   el.classList.remove('hidden');
  //   animate(el, opts);
  // };
  //
  //
  // var hide = function(el, opts) {
  //
  //   opts = opts || {};
  //
  //   opts.animationName = opts.animationName || 'slideOutUp';
  //   opts.duration = opts.duration || 300;
  //   opts.callbacks = opts.callbacks || [];
  //
  //   //if the element is already hidden
  //   if (el.classList.contains('hidden')) {
  //     //call the callbacks directly
  //     opts.callbacks.forEach(function(cb) {
  //       cb();
  //     });
  //     //and get out
  //     return;
  //   }
  //
  //   opts.callbacks.push(function() {
  //     el.classList.add('hidden');
  //   });
  //   animate(el, opts);
  // };
  //
  //
  // var animations = {
  //   animate: animate,
  //   // show and hide convenience functions
  //   show: show,
  //   hide: hide
  // };

}
