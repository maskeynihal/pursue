import type { StringMap } from "../types/common";

class EventHandlerMapper<T> {
  _eventHandlerMapper: T;

  constructor(eventHandlerMapper: T) {
    this._eventHandlerMapper = eventHandlerMapper;
  }

  get keys() {
    if (!this._eventHandlerMapper) {
      return {} as StringMap<T>;
    }

    return Object.keys(this._eventHandlerMapper).reduce(
      (acc, cv) => ({ ...acc, [cv]: cv }),
      {} as StringMap<T>
    );
  }

  get eventHandlerMapper() {
    return this._eventHandlerMapper;
  }
}

export default EventHandlerMapper;
