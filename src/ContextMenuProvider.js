/* eslint no-return-assign: ["error", "except-parens"] */

import React from 'react';
import eventManager from './Utils/eventManager';
import cssClasses from './cssClasses';

export default function (menuId) {
    return function (TargetComponent, event = 'contextmenu') {
        const eventList = {
            click: 'onClick',
            contextmenu: 'onContextMenu',
            touchend: 'onTouchEnd',
            dblclick: 'onDoubleClick'
        };

        if (!eventList[event]) {
            let validEvents = '';
            Object.keys(eventList).forEach(k => (validEvents += `'${k}' `));

            console.warn(`Event must be one of the following values ${validEvents}`);
            return false;
        }


        return class ContextMenuProvider extends React.Component {

            constructor(props) {
                super(props);
                this.handleEvent = (e) => {
                    e.preventDefault();
                    eventManager.emit(`display::${menuId}`, e.nativeEvent);
                };
            }

            render() {
                const attributes = {
                    [eventList[event]]: this.handleEvent,
                    className: cssClasses.PROVIDER
                };

                return React.createElement(
                    'div',
                    attributes,
                    React.createElement(TargetComponent, this.props)
                );
            }
        };
    };
}
