/* eslint-env jest */
import eventManager from './../util/eventManager';

beforeEach(() => eventManager.eventList.clear());

describe('Event Manager', () => {
  it('Should be able to register an event', () => {
    eventManager.on('foo', () => {});
    expect(eventManager.eventList.has('foo')).toBe(true);
  });

  it('Should be able to subscribe for the same event', () => {
    eventManager.on('foo', () => {});
    eventManager.on('foo', () => {});
    expect(eventManager.eventList.get('foo').size).toBe(2);
  });

  it('Should be able to dispatch event', done => {
    const mock = jest.fn();
    eventManager.on('foo', () => {
      mock();
      expect(mock).toHaveBeenCalled();
      done();
    });

    eventManager.emit('foo');
  });

  it('Should warn when we try to emit an unregistred event', () => {
    console.warn = jest.fn();
    eventManager.emit('foo');
    expect(console.warn).toHaveBeenCalled();
  });

  it('After event registration, it should return a function to unsubscribe', () => {
    const unsub = eventManager.on('foo', () => {});
    expect(typeof unsub).toBe('function');
  });

  it('Should be able to unsubscribe', () => {
    const unsub = eventManager.on('foo', () => {});
    expect(eventManager.eventList.get('foo').size).toBe(1);
    unsub();
    expect(eventManager.eventList.get('foo').size).toBe(0);
  });
});
