// import _ from 'lodash';

// /**
//  * Get listener functions for a given event key and put them in queue.
//  */
// export const event = async (
//   eventName: EventKey,
//   parameters: Record<string | number, any>
// ) => {
//   const listeners = getHandlerKey(eventName);

//   if (_.isEmpty(listeners)) {
//     throw new Error('No listeners found for event: ' + eventName);
//   }

//   const addInQueue = sendMessage;

//   return await Promise.all(
//     listeners.map((handlerKey) => {
//       return addInQueue(handlerKey, parameters);
//     })
//   );
// };

// /**
//  * Get handler keys for a given event key.
//  */
// const getHandlerKey = (eventName: EventKey) => eventListenersMapper[eventName];

// /**
//  * Get handler functions for a given handler key.
//  */
// const getHandlers = (handlerKey: HandlerKey) => handlers[handlerKey];

// /**
//  * Dispatch the handler. Run the handler function.
//  */
// export const dispatch = (
//   handlerKey: HandlerKey,
//   params: Record<string, any>
// ) => {
//   const handler = getHandlers(handlerKey);

//   if (!handler) {
//     throw new Error('No handler found for event: ' + handlerKey);
//   }

//   return handler(params);
// };
