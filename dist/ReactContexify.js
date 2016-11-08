(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactContexify"] = factory(require("react"));
	else
		root["ReactContexify"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ContextMenu = __webpack_require__(6);

	Object.defineProperty(exports, 'ContextMenu', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ContextMenu).default;
	  }
	});

	var _Item = __webpack_require__(7);

	Object.defineProperty(exports, 'Item', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Item).default;
	  }
	});

	var _Separator = __webpack_require__(8);

	Object.defineProperty(exports, 'Separator', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Separator).default;
	  }
	});

	var _ContextMenuProvider = __webpack_require__(3);

	Object.defineProperty(exports, 'ContextMenuProvider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ContextMenuProvider).default;
	  }
	});

	var _menuProvider = __webpack_require__(9);

	Object.defineProperty(exports, 'menuProvider', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_menuProvider).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	* css classes mapping
	* */
	exports.default = {
	    CONTAINER: 'react-contexify-container',
	    PROVIDER: 'react-contexify-provider',
	    MENU: 'react-contexify-menu',
	    SEPARATOR: 'react-contexify-menu__separator',
	    ITEM: 'react-contexify-menu__item',
	    ITEM_DISABLED: 'react-contexify-menu__item--disabled',
	    ITEM_DATA: 'react-contexify-menu__item__data',
	    ITEM_ICON: 'react-contexify-menu__item__icon'
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _eventManager = __webpack_require__(4);

	var _eventManager2 = _interopRequireDefault(_eventManager);

	var _cssClasses = __webpack_require__(2);

	var _cssClasses2 = _interopRequireDefault(_cssClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
	  renderTag: _react.PropTypes.node,
	  event: _react.PropTypes.string,
	  className: _react.PropTypes.string,
	  style: _react.PropTypes.object
	};

	var defaultProps = {
	  renderTag: 'div',
	  event: 'onContextMenu',
	  className: null,
	  style: null
	};

	var ContextMenuProvider = function (_Component) {
	  _inherits(ContextMenuProvider, _Component);

	  function ContextMenuProvider(props) {
	    _classCallCheck(this, ContextMenuProvider);

	    var _this = _possibleConstructorReturn(this, (ContextMenuProvider.__proto__ || Object.getPrototypeOf(ContextMenuProvider)).call(this, props));

	    _this.handleEvent = _this.handleEvent.bind(_this);
	    return _this;
	  }

	  _createClass(ContextMenuProvider, [{
	    key: 'handleEvent',
	    value: function handleEvent(e) {
	      e.preventDefault();
	      _eventManager2.default.emit('display::' + this.props.id, e.nativeEvent);
	    }
	  }, {
	    key: 'getChildren',
	    value: function getChildren() {
	      var _props = this.props,
	          id = _props.id,
	          renderTag = _props.renderTag,
	          event = _props.event,
	          children = _props.children,
	          className = _props.className,
	          style = _props.style,
	          rest = _objectWithoutProperties(_props, ['id', 'renderTag', 'event', 'children', 'className', 'style']);

	      return _react.Children.map(this.props.children, function (child) {
	        return (0, _react.cloneElement)(child, _extends({}, rest));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _Object$assign;

	      var _props2 = this.props,
	          renderTag = _props2.renderTag,
	          event = _props2.event,
	          className = _props2.className,
	          style = _props2.style;

	      var attributes = Object.assign({}, (_Object$assign = {}, _defineProperty(_Object$assign, event, this.handleEvent), _defineProperty(_Object$assign, 'className', className), _defineProperty(_Object$assign, 'style', style), _Object$assign));

	      return (0, _react.createElement)(renderTag, attributes, this.getChildren());
	    }
	  }]);

	  return ContextMenuProvider;
	}(_react.Component);

	ContextMenuProvider.propTypes = propTypes;
	ContextMenuProvider.defaultProps = defaultProps;

	exports.default = ContextMenuProvider;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */

	var eventManager = {
	    eventList: new Map(),

	    /**
	     * Bind event
	     *
	     * @param event
	     * @param callback
	     * @param context
	     * @returns {eventManager.on}
	     */
	    on: function on(event, callback) {
	        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	        this.eventList.has(event) || this.eventList.set(event, []);

	        this.eventList.get(event).push({
	            callback: callback,
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
	    off: function off() {
	        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	        if (event != null && callback == null) {
	            return this.eventList.delete(event);
	        } else if (event != null && callback != null) {
	            var listeners = this.eventList.get(event);

	            this.eventList.set(event, listeners.filter(function (el) {
	                return !(el.callback === callback || el.callback.toString() === callback.toString());
	            }));
	            listeners.length > 0 || this.eventList.delete(event);

	            return true;
	        } else if (event === null && callback === null) {
	            this.eventList.clear();
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
	    once: function once(event, callback, context) {
	        this.on(event, callback, context);
	        var listener = this.eventList.get(event);
	        var idx = listener.length - 1;
	        listener[idx].once = true;
	        return this;
	    },

	    /**
	     * @param event
	     * @param args
	     * @returns {boolean}
	     */
	    emit: function emit(event) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        if (!this.eventList.has(event)) {
	            console.warn("<" + event + "> Event is not registered. Did you forgot to bind the event ?");
	            return false;
	        }
	        var listeners = this.eventList.get(event);

	        this.eventList.set(event, listeners.filter(function (listener) {
	            var _listener$callback;

	            (_listener$callback = listener.callback).call.apply(_listener$callback, [listener.context].concat(args));
	            return !listener.once;
	        }));

	        return true;
	    }
	};

	exports.default = eventManager;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _cssClasses = __webpack_require__(2);

	var _cssClasses2 = _interopRequireDefault(_cssClasses);

	var _eventManager = __webpack_require__(4);

	var _eventManager2 = _interopRequireDefault(_eventManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	    id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
	    theme: _react.PropTypes.string,
	    animation: _react.PropTypes.string,
	    children: _react.PropTypes.node.isRequired
	};

	var defaultProps = {
	    theme: null,
	    animation: null
	};

	var ContextMenu = function (_Component) {
	    _inherits(ContextMenu, _Component);

	    function ContextMenu(props) {
	        _classCallCheck(this, ContextMenu);

	        var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

	        _this.state = {
	            x: 0,
	            y: 0,
	            visible: false,
	            target: null
	        };
	        // storing ref
	        _this.menu = null;
	        _this.setRef = _this.setRef.bind(_this);
	        _this.show = _this.show.bind(_this);
	        _this.hide = _this.hide.bind(_this);
	        return _this;
	    }

	    _createClass(ContextMenu, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            window.addEventListener('resize', this.hide);
	            _eventManager2.default.on('display::' + this.props.id, function (e) {
	                return _this2.show(e);
	            });
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return !(this.state.visible === false && nextState.visible === false);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('resize', this.hide);
	            _eventManager2.default.off('display::' + this.props.id);
	        }
	    }, {
	        key: 'setRef',
	        value: function setRef(ref) {
	            this.menu = ref;
	        }
	    }, {
	        key: 'setMenuPosition',
	        value: function setMenuPosition() {
	            var browserSize = {
	                width: window.innerWidth,
	                height: window.innerHeight
	            };

	            // Get size of context
	            var menuSize = {
	                width: this.menu.offsetWidth,
	                height: this.menu.offsetHeight
	            };

	            var _state = this.state,
	                x = _state.x,
	                y = _state.y;


	            if (x + menuSize.width > browserSize.width) {
	                x = x - (x + menuSize.width - browserSize.width);
	            }

	            if (y + menuSize.height > browserSize.height) {
	                y = y - (y + menuSize.height - browserSize.height);
	            }

	            this.setState({
	                x: x,
	                y: y
	            });
	        }
	    }, {
	        key: 'getMousePosition',
	        value: function getMousePosition(e) {
	            var pos = {
	                x: e.clientX,
	                y: e.clientY
	            };

	            if (e.type === 'touchend' && (pos.x == null || pos.y == null)) {
	                var touches = e.changedTouches;

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
	    }, {
	        key: 'getMenuItem',
	        value: function getMenuItem() {
	            var _this3 = this;

	            return _react2.default.Children.map(this.props.children, function (child) {
	                return _react2.default.cloneElement(child, { target: _this3.state.target });
	            });
	        }
	    }, {
	        key: 'getMenuStyle',
	        value: function getMenuStyle() {
	            return {
	                left: this.state.x,
	                top: this.state.y,
	                opacity: 1
	            };
	        }
	    }, {
	        key: 'getMenuClasses',
	        value: function getMenuClasses() {
	            var _classNames;

	            return (0, _classnames2.default)(_cssClasses2.default.MENU, (_classNames = {}, _defineProperty(_classNames, 'react-contexify-menu__theme--' + this.props.theme, this.props.theme !== null), _defineProperty(_classNames, '' + this.props.animation, this.props.animation !== null), _classNames));
	        }
	    }, {
	        key: 'show',
	        value: function show(e) {
	            var _getMousePosition = this.getMousePosition(e),
	                x = _getMousePosition.x,
	                y = _getMousePosition.y;

	            this.setState({
	                visible: true,
	                x: x,
	                y: y,
	                target: e.target
	            }, this.setMenuPosition);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.setState({ visible: false });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return this.state.visible ? _react2.default.createElement(
	                'aside',
	                {
	                    className: _cssClasses2.default.CONTAINER,
	                    onClick: this.hide,
	                    onContextMenu: this.hide
	                },
	                _react2.default.createElement(
	                    'div',
	                    {
	                        className: this.getMenuClasses(),
	                        style: this.getMenuStyle(),
	                        ref: this.setRef
	                    },
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        this.getMenuItem()
	                    )
	                )
	            ) : null;
	        }
	    }]);

	    return ContextMenu;
	}(_react.Component);

	ContextMenu.propTypes = propTypes;
	ContextMenu.defaultProps = defaultProps;

	exports.default = ContextMenu;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _cssClasses = __webpack_require__(2);

	var _cssClasses2 = _interopRequireDefault(_cssClasses);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	    label: _react.PropTypes.string.isRequired,
	    icon: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    onClick: _react.PropTypes.func,
	    data: _react.PropTypes.any,
	    target: _react.PropTypes.any
	};

	var defaultProps = {
	    disabled: false,
	    onClick: null
	};

	var Item = function (_React$Component) {
	    _inherits(Item, _React$Component);

	    function Item(props) {
	        _classCallCheck(this, Item);

	        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

	        _this.bindEvent();
	        return _this;
	    }

	    _createClass(Item, [{
	        key: 'bindEvent',
	        value: function bindEvent() {
	            var _this2 = this;

	            if (this.props.disabled !== true) {
	                if (null !== this.props.onClick) {
	                    this.handleClick = function () {
	                        return _this2.props.onClick(_this2, _this2.props.target);
	                    };
	                } else {
	                    // Maybe it's unnecessary to warn
	                    this.handleClick = function () {
	                        return console.warn('Did you forget to bind an event\n                on the "' + _this2.props.label + '" item ? ');
	                    };
	                }
	            } else {
	                this.handleClick = function (e) {
	                    return e.stopPropagation();
	                };
	            }
	        }
	    }, {
	        key: 'buildItem',
	        value: function buildItem() {
	            return _react2.default.createElement(
	                'div',
	                { className: _cssClasses2.default.ITEM_DATA },
	                this.hasIcon(),
	                this.props.label
	            );
	        }
	    }, {
	        key: 'hasIcon',
	        value: function hasIcon() {
	            return this.props.icon ? _react2.default.createElement('span', { className: _cssClasses2.default.ITEM_ICON + ' ' + this.props.icon }) : '';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var className = (0, _classnames2.default)(_cssClasses2.default.ITEM, _defineProperty({}, '' + _cssClasses2.default.ITEM_DISABLED, this.props.disabled));
	            return _react2.default.createElement(
	                'div',
	                { className: className, onClick: this.handleClick },
	                this.buildItem()
	            );
	        }
	    }]);

	    return Item;
	}(_react2.default.Component);

	Item.propTypes = propTypes;
	Item.defaultProps = defaultProps;

	exports.default = Item;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _cssClasses = __webpack_require__(2);

	var _cssClasses2 = _interopRequireDefault(_cssClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  return _react2.default.createElement('div', { className: _cssClasses2.default.SEPARATOR });
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (id) {
	  return function (TargetComponent) {
	    var renderTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
	    var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'onContextMenu';

	    return function () {
	      return _react2.default.createElement(
	        _ContextMenuProvider2.default,
	        { id: id, renderTag: renderTag, event: event },
	        (0, _react.createElement)(TargetComponent)
	      );
	    };
	  };
	};

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ContextMenuProvider = __webpack_require__(3);

	var _ContextMenuProvider2 = _interopRequireDefault(_ContextMenuProvider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }
/******/ ])
});
;