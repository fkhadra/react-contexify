
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */

const eventManager = {
  eventList: new Map(),

  on(event, callback) {
    this.eventList.has(event) || this.eventList.set(event, []);

    this.eventList.get(event).push({
      callback
    });

    return this;
  },

  off(event) {
    return this.eventList.delete(event);
  },

  emit(event, ...args) {
    if (!this.eventList.has(event)) {
      console.warn(`<${event}> Event is not registered. Did you forgot to bind the event ?`);
      return false;
    }
    this.eventList
      .get(event)
      .forEach(
        listener => listener.callback.call(this, ...args)
      );
    return true;
  }
};

export default eventManager;
