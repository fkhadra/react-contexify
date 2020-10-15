import { EVENT } from '../constants';

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
      //eslint-disable-next-line @typescript-eslint/no-unused-expressions
      eventList.has(event)
        ? eventList.get(event)?.add(handler)
        : eventList.set(event, new Set([handler]));
      return this;
    },
    off<T = any>(event: E, handler?: Handler<T>) {
      handler ? eventList.get(event)!.delete(handler) : eventList.delete(event);
      return this;
    },
    emit<T = any>(event: E, args: T) {
      if (process.env.NODE !== 'production') {
        const currentEv = (event as unknown) as number;

        if (!eventList.has(event) && currentEv !== EVENT.HIDE_ALL) {
          console.error(
            `It seems that the menu you are trying to display is not renderer or you have a menu id mismatch.`,
            `You used the menu id: ${event}`
          );
        }
      }
      eventList.has(event) &&
        eventList.get(event)!.forEach((handler: Handler<T>) => {
          handler(args);
        });
      return this;
    },
  };
}

export const eventManager = createEventManager();
