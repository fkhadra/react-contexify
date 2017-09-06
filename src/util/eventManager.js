
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */

const eventManager = {
  eventList: new Map(),
  token: 0,

  on(event, callback) {
    this.eventList.has(event) || this.eventList.set(event, []);
    this.token += 1;
    this.eventList.get(event).push({
      token: this.token,
      callback
    });

    return this.token;
  },

  off(event, token = null) {
    if (token === null) {
      return this.eventList.delete(event);
    }
    const events = this.eventList.get(event).filter(e => e.token !== token);
    this.eventList.set(event, events);
  },

  has(event) {
    return this.eventList.has(event);
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
