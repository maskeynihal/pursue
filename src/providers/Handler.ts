import type { StringMap, HandlerFunction } from '../types/common';

class Handler<
  T extends {
    [key: string]: HandlerFunction;
  }
> {
  private _handlers: T;

  constructor(handlers: T) {
    this._handlers = handlers;
  }

  get keys() {
    if (!this._handlers) {
      return {} as StringMap<T>;
    }

    return Object.keys(this._handlers).reduce(
      (acc, cv) => ({ ...acc, [cv]: cv }),
      {} as StringMap<T>
    );
  }

  get handlers() {
    return this._handlers;
  }
}

export default Handler;
