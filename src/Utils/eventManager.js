/**
 * Created by Gugu on 18-05-16.
 */

const eventManager = {
    _eventList: new Map(),

    /**
     * Bind event
     *
     * @param event
     * @param callback
     * @param context
     * @returns {eventManager.on}
     */
    on(event, callback, context = null) {
        this._eventList.has(event) || this._eventList.set(event, []);

        this._eventList.get(event).push({
            callback,
            context: context || this
        });

        return this;
    },

    /**
     * Unbind events
     * Strict comparison voluntary omitted to check both null and undefined
     *
     * @param event
     * @param callback
     * @returns {boolean}
     */
    off(event = null, callback = null) {
        if (event != null && callback == null) {
            return this._eventList.delete(event);
        } else if (event != null && callback != null) {
            const listeners = this._eventList.get(event);

            this._eventList.set(event, listeners.filter(el =>
                !(el.callback === callback || el.callback.toString() === callback.toString())
            ));
            listeners.length > 0 || this._eventList.delete(event);

            return true;
        } else if (event === null && callback === null) {
            this._eventList.clear();
            return true;
        }
        return false;
    },
    /**
     * @param event
     * @param callback
     * @param context
     * @returns {eventManager.once}
     */
    once(event, callback, context) {
        this.on(event, callback, context);
        const listener = this._eventList.get(event);
        const idx = listener.length - 1;
        listener[idx]['once'] = true;
        return this;
    },
    /**
     * @param event
     * @param args
     * @returns {boolean}
     */
    emit(event, ...args) {
        if (!this._eventList.has(event)) {
            console.warn(`<${event}> Event is not registered. Did you forgot to bind the event ?`);
            return false;
        }
        const listeners = this._eventList.get(event);

        this._eventList.set(event, listeners.filter( listener => {
            listener.callback.call(listener.context, ...args);
            return !listener.once;
        }));

        return true;
    }
};

export default eventManager;
