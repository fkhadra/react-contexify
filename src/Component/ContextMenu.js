import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import cssClasses from './../cssClasses';
import eventManager from '../Utils/eventManager';

const propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    theme: PropTypes.string,
    animation: PropTypes.string,
    children: PropTypes.node.isRequired
};

const defaultProps = {
    theme: null,
    animation: null
};

class ContextMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            visible: false,
            target: null
        };
        // storing ref
        this.menu = null;
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.hide);
        eventManager.on(`display::${this.props.id}`, e => this.show(e));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.visible === false && nextState.visible === false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.hide);
        eventManager.off(`display::${this.props.id}`);
    }

    setRef(ref) {
        this.menu = ref;
    }

    setMenuPosition() {
        const browserSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Get size of context
        const menuSize = {
            width: this.menu.offsetWidth,
            height: this.menu.offsetHeight
        };

        let { x, y } = this.state;

        if ((x + menuSize.width) > browserSize.width) {
            x = x - ((x + menuSize.width) - browserSize.width);
        }

        if ((y + menuSize.height) > browserSize.height) {
            y = y - ((y + menuSize.height) - browserSize.height);
        }

        this.setState({
            x,
            y
        });
    }

    getMousePosition(e) {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        if (e.type === 'touchend' && (pos.x == null || pos.y == null)) {
            const touches = e.changedTouches;

            if (touches != null && touches.length > 0) {
                pos.x = touches[0].clientX;
                pos.y = touches[0].clientY;
            }
        }

        if (pos.x == null || pos.x < 0) {
            pos.x = 0;
        }

        if (pos.y == null || pos.y < 0) {
            pos.y = 0;
        }

        return pos;
    }

    getMenuItem() {
        return React.Children.map(this.props.children, child =>
            React.cloneElement(child, { target: this.state.target })
        );
    }

    getMenuStyle() {
        return {
            left: this.state.x,
            top: this.state.y,
            opacity: 1
        };
    }

    getMenuClasses() {
        return classNames(
            cssClasses.MENU,
            {
                [`react-contexify-menu__theme--${this.props.theme}`]: this.props.theme !== null,
                [`${this.props.animation}`]: this.props.animation !== null
            }
        );
    }

    show(e) {
        const { x, y } = this.getMousePosition(e);
        this.setState({
            visible: true,
            x,
            y,
            target: e.target
        }, this.setMenuPosition);
    }

    hide(){
        this.setState({visible: false});
    }

    render() {
        return this.state.visible ?
            <aside
                className={cssClasses.CONTAINER}
                onClick={this.hide}
                onContextMenu={this.hide}
            >
                <div
                    className={this.getMenuClasses()}
                    style={this.getMenuStyle()}
                    ref={this.setRef}
                >
                    <div>
                        {this.getMenuItem()}
                    </div>
                </div>
            </aside>
            : null;
    }
}

ContextMenu.propTypes = propTypes;
ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
