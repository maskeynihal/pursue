import { add } from "./services/queue";
import Handler from "./classes/Handler";
import EventHandlerMapper from "./classes/EventHandlerMapper";

class Jobs<IHandler, IEventHandlerMapper> {
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

  public getHandlerFunctions(event: string) {
    return this._eventHandlerMapper.eventHandlerMapper[event];
  }

  public event(eventName: string, parameters: any) {
    const functions = this.getHandlerFunctions(eventName);

    if (!functions) {
      throw new Error("No listeners found for event: " + eventName);
    }

    return Promise.all(
      functions.map((handlerKey) => {
        return add({ scope: handlerKey as string, data: parameters });
      })
    );
  }

  public dispatch(handlerKey: string, parameters: any = {}) {
    const handler = this._handlers.handlers[handlerKey];

    if (!handler) {
      throw new Error("No handler found for event: " + handlerKey);
    }

    return handler(parameters);
  }
}

export default Jobs;
