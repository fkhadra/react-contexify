import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cssClasses from './../cssClasses';
import classNames from 'classnames';

const propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    data: PropTypes.any,
    target: PropTypes.any
};

const defaultProps = {
    disabled: false,
    onClick: null
};

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.bindEvent();
    }

    bindEvent() {
        if (this.props.disabled !== true) {
            if (null !== this.props.onClick) {
                this.handleClick = () => this.props.onClick(this, this.props.target);
            } else {
                // Maybe it's unnecessary to warn
                this.handleClick = () => console.warn(`Did you forget to bind an event
                on the "${this.props.label}" item ? `);
            }
        } else {
            this.handleClick = (e) => e.stopPropagation();
        }
    }

    buildItem() {
        return (
            <div className={cssClasses.ITEM_DATA}>
                {this.hasIcon()}
                {this.props.label}
            </div>
        );
    }

    hasIcon() {
        return this.props.icon
            ? <span className={`${cssClasses.ITEM_ICON} ${this.props.icon}`}></span>
            : '';
    }

    render() {
        const className = classNames(cssClasses.ITEM, {
            [`${cssClasses.ITEM_DISABLED}`]: this.props.disabled
        });
        return (
            <div className={className} onClick={this.handleClick}>
                {this.buildItem()}
            </div>
        );
    }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
