import Queue from './Queue';
import Handler from './Handler';
import EventHandlerMapper from './EventHandlerMapper';

import type { HandlerFunction } from '../types/common';
class Jobs<
  IHandler extends {
    [key: string]: HandlerFunction;
  },
  IEventHandlerMapper extends { [key: string]: Array<keyof IHandler> }
> {
  private _handlers: Handler<IHandler>;
  private _eventHandlerMapper: EventHandlerMapper<IEventHandlerMapper>;

  public constructor(
    handlers: Handler<IHandler>,
    eventHandlerMapper: EventHandlerMapper<IEventHandlerMapper>
  ) {
    this._handlers = handlers;
    this._eventHandlerMapper = eventHandlerMapper;
  }

  get instance() {
    return this;
  }

  public get handlers() {
    return this._handlers.keys;
  }

  public get events() {
    return this._eventHandlerMapper.keys;
  }

  public getHandlerFunctions(event: keyof IEventHandlerMapper) {
    return this._eventHandlerMapper.eventHandlerMapper[event];
  }

  public async trigger(eventName: keyof IEventHandlerMapper, parameters: any) {
    const functions = this.getHandlerFunctions(eventName);

    if (!functions) {
      throw new Error(
        `No handler function found for event: '${String(eventName)}'`
      );
    }

    return await Promise.all(
      functions.map((handlerKey) => {
        return Queue.add({ scope: handlerKey as string, data: parameters });
      })
    );
  }

  public dispatch(handlerKey: keyof IHandler, parameters: any = {}) {
    const handler = this._handlers.handlers[handlerKey];

    if (!handler) {
      throw new Error(`No function found for handler: '${String(handlerKey)}`);
    }

    return handler(parameters);
  }
}

export default Jobs;
