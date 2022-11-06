export type EventType = string | number | symbol;
export type Handler<T = any> = (args: T) => void;

export interface EventManager<E = EventType> {
  on<T = any>(event: E, handler: Handler<T>): EventManager<E>;
  off<T = any>(event: E, handler?: Handler<T>): EventManager<E>;
  emit<T = any>(event: E, args?: T): EventManager<E>;
}

function createEventManager<E = EventType>(): EventManager<E> {
  const eventList = new Map<E, Set<Handler>>();

  return {
    on<T = any>(event: E, handler: Handler<T>) {
      eventList.has(event)
        ? eventList.get(event)!.add(handler)
        : eventList.set(event, new Set([handler]));
      return this;
    },
    off<T = any>(event: E, handler: Handler<T>) {
      eventList.has(event) && eventList.get(event)!.delete(handler);
      return this;
    },
    emit<T = any>(event: E, args: T) {
      eventList.has(event) &&
        eventList.get(event)!.forEach((handler: Handler<T>) => {
          handler(args);
        });
      return this;
    },
  };
}

export const eventManager = createEventManager();
