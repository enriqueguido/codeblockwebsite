/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
if(function(t,e){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){"use strict";function n(t,e){var n=(e=e||G).createElement("script");n.text=t,e.head.appendChild(n).parentNode.removeChild(n)}function i(t){var e=!!t&&"length"in t&&t.length,n=lt.type(t);return"function"!==n&&!lt.isWindow(t)&&("array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function o(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()}function r(t,e,n){return lt.isFunction(e)?lt.grep(t,function(t,i){return!!e.call(t,i,t)!==n}):e.nodeType?lt.grep(t,function(t){return t===e!==n}):"string"!=typeof e?lt.grep(t,function(t){return tt.call(e,t)>-1!==n}):yt.test(e)?lt.filter(e,t,n):(e=lt.filter(e,t),lt.grep(t,function(t){return tt.call(e,t)>-1!==n&&1===t.nodeType}))}function s(t,e){for(;(t=t[e])&&1!==t.nodeType;);return t}function a(t){return t}function l(t){throw t}function c(t,e,n,i){var o;try{t&&lt.isFunction(o=t.promise)?o.call(t).done(e).fail(n):t&&lt.isFunction(o=t.then)?o.call(t,e,n):e.apply(void 0,[t].slice(i))}catch(t){n.apply(void 0,[t])}}function u(){G.removeEventListener("DOMContentLoaded",u),t.removeEventListener("load",u),lt.ready()}function d(){this.expando=lt.expando+d.uid++}function p(t,e,n){var i;if(void 0===n&&1===t.nodeType)if(i="data-"+e.replace(Dt,"-$&").toLowerCase(),"string"==typeof(n=t.getAttribute(i))){try{n=function(t){return"true"===t||"false"!==t&&("null"===t?null:t===+t+""?+t:Ot.test(t)?JSON.parse(t):t)}(n)}catch(t){}It.set(t,e,n)}else n=void 0;return n}function h(t,e,n,i){var o,r=1,s=20,a=i?function(){return i.cur()}:function(){return lt.css(t,e,"")},l=a(),c=n&&n[3]||(lt.cssNumber[e]?"":"px"),u=(lt.cssNumber[e]||"px"!==c&&+l)&&Pt.exec(lt.css(t,e));if(u&&u[3]!==c){c=c||u[3],n=n||[],u=+l||1;do{r=r||".5",u/=r,lt.style(t,e,u+c)}while(r!==(r=a()/l)&&1!==r&&--s)}return n&&(u=+u||+l||0,o=n[1]?u+(n[1]+1)*n[2]:+n[2],i&&(i.unit=c,i.start=u,i.end=o)),o}function f(t){var e,n=t.ownerDocument,i=t.nodeName,o=Mt[i];return o||(e=n.body.appendChild(n.createElement(i)),o=lt.css(e,"display"),e.parentNode.removeChild(e),"none"===o&&(o="block"),Mt[i]=o,o)}function m(t,e){for(var n,i,o=[],r=0,s=t.length;r<s;r++)(i=t[r]).style&&(n=i.style.display,e?("none"===n&&(o[r]=At.get(i,"display")||null,o[r]||(i.style.display="")),""===i.style.display&&Nt(i)&&(o[r]=f(i))):"none"!==n&&(o[r]="none",At.set(i,"display",n)));for(r=0;r<s;r++)null!=o[r]&&(t[r].style.display=o[r]);return t}function g(t,e){var n;return n=void 0!==t.getElementsByTagName?t.getElementsByTagName(e||"*"):void 0!==t.querySelectorAll?t.querySelectorAll(e||"*"):[],void 0===e||e&&o(t,e)?lt.merge([t],n):n}function v(t,e){for(var n=0,i=t.length;n<i;n++)At.set(t[n],"globalEval",!e||At.get(e[n],"globalEval"))}function y(t,e,n,i,o){for(var r,s,a,l,c,u,d=e.createDocumentFragment(),p=[],h=0,f=t.length;h<f;h++)if((r=t[h])||0===r)if("object"===lt.type(r))lt.merge(p,r.nodeType?[r]:r);else if(zt.test(r)){for(s=s||d.appendChild(e.createElement("div")),a=(Rt.exec(r)||["",""])[1].toLowerCase(),l=Ft[a]||Ft._default,s.innerHTML=l[1]+lt.htmlPrefilter(r)+l[2],u=l[0];u--;)s=s.lastChild;lt.merge(p,s.childNodes),(s=d.firstChild).textContent=""}else p.push(e.createTextNode(r));for(d.textContent="",h=0;r=p[h++];)if(i&&lt.inArray(r,i)>-1)o&&o.push(r);else if(c=lt.contains(r.ownerDocument,r),s=g(d.appendChild(r),"script"),c&&v(s),n)for(u=0;r=s[u++];)Wt.test(r.type||"")&&n.push(r);return d}function b(){return!0}function w(){return!1}function x(){try{return G.activeElement}catch(t){}}function T(t,e,n,i,o,r){var s,a;if("object"==typeof e){"string"!=typeof n&&(i=i||n,n=void 0);for(a in e)T(t,a,n,i,e[a],r);return t}if(null==i&&null==o?(o=n,i=n=void 0):null==o&&("string"==typeof n?(o=i,i=void 0):(o=i,i=n,n=void 0)),!1===o)o=w;else if(!o)return t;return 1===r&&(s=o,o=function(t){return lt().off(t),s.apply(this,arguments)},o.guid=s.guid||(s.guid=lt.guid++)),t.each(function(){lt.event.add(this,e,o,i,n)})}function S(t,e){return o(t,"table")&&o(11!==e.nodeType?e:e.firstChild,"tr")?lt(">tbody",t)[0]||t:t}function C(t){return t.type=(null!==t.getAttribute("type"))+"/"+t.type,t}function E(t){var e=Qt.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function _(t,e){var n,i,o,r,s,a,l,c;if(1===e.nodeType){if(At.hasData(t)&&(r=At.access(t),s=At.set(e,r),c=r.events)){delete s.handle,s.events={};for(o in c)for(n=0,i=c[o].length;n<i;n++)lt.event.add(e,o,c[o][n])}It.hasData(t)&&(a=It.access(t),l=lt.extend({},a),It.set(e,l))}}function k(t,e){var n=e.nodeName.toLowerCase();"input"===n&&jt.test(t.type)?e.checked=t.checked:"input"!==n&&"textarea"!==n||(e.defaultValue=t.defaultValue)}function A(t,e,i,o){e=Z.apply([],e);var r,s,a,l,c,u,d=0,p=t.length,h=p-1,f=e[0],m=lt.isFunction(f);if(m||p>1&&"string"==typeof f&&!st.checkClone&&Gt.test(f))return t.each(function(n){var r=t.eq(n);m&&(e[0]=f.call(this,n,r.html())),A(r,e,i,o)});if(p&&(r=y(e,t[0].ownerDocument,!1,t,o),s=r.firstChild,1===r.childNodes.length&&(r=s),s||o)){for(l=(a=lt.map(g(r,"script"),C)).length;d<p;d++)c=r,d!==h&&(c=lt.clone(c,!0,!0),l&&lt.merge(a,g(c,"script"))),i.call(t[d],c,d);if(l)for(u=a[a.length-1].ownerDocument,lt.map(a,E),d=0;d<l;d++)c=a[d],Wt.test(c.type||"")&&!At.access(c,"globalEval")&&lt.contains(u,c)&&(c.src?lt._evalUrl&&lt._evalUrl(c.src):n(c.textContent.replace(Kt,""),u))}return t}function I(t,e,n){for(var i,o=e?lt.filter(e,t):t,r=0;null!=(i=o[r]);r++)n||1!==i.nodeType||lt.cleanData(g(i)),i.parentNode&&(n&&lt.contains(i.ownerDocument,i)&&v(g(i,"script")),i.parentNode.removeChild(i));return t}function O(t,e,n){var i,o,r,s,a=t.style;return(n=n||te(t))&&(""!==(s=n.getPropertyValue(e)||n[e])||lt.contains(t.ownerDocument,t)||(s=lt.style(t,e)),!st.pixelMarginRight()&&Jt.test(s)&&Zt.test(e)&&(i=a.width,o=a.minWidth,r=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=o,a.maxWidth=r)),void 0!==s?s+"":s}function D(t,e){return{get:function(){return t()?void delete this.get:(this.get=e).apply(this,arguments)}}}function L(t){var e=lt.cssProps[t];return e||(e=lt.cssProps[t]=function(t){if(t in se)return t;for(var e=t[0].toUpperCase()+t.slice(1),n=re.length;n--;)if((t=re[n]+e)in se)return t}(t)||t),e}function P(t,e,n){var i=Pt.exec(e);return i?Math.max(0,i[2]-(n||0))+(i[3]||"px"):e}function $(t,e,n,i,o){var r,s=0;for(r=n===(i?"border":"content")?4:"width"===e?1:0;r<4;r+=2)"margin"===n&&(s+=lt.css(t,n+$t[r],!0,o)),i?("content"===n&&(s-=lt.css(t,"padding"+$t[r],!0,o)),"margin"!==n&&(s-=lt.css(t,"border"+$t[r]+"Width",!0,o))):(s+=lt.css(t,"padding"+$t[r],!0,o),"padding"!==n&&(s+=lt.css(t,"border"+$t[r]+"Width",!0,o)));return s}function N(t,e,n){var i,o=te(t),r=O(t,e,o),s="border-box"===lt.css(t,"boxSizing",!1,o);return Jt.test(r)?r:(i=s&&(st.boxSizingReliable()||r===t.style[e]),"auto"===r&&(r=t["offset"+e[0].toUpperCase()+e.slice(1)]),(r=parseFloat(r)||0)+$(t,e,n||(s?"border":"content"),i,o)+"px")}function H(t,e,n,i,o){return new H.prototype.init(t,e,n,i,o)}function M(){le&&(!1===G.hidden&&t.requestAnimationFrame?t.requestAnimationFrame(M):t.setTimeout(M,lt.fx.interval),lt.fx.tick())}function j(){return t.setTimeout(function(){ae=void 0}),ae=lt.now()}function R(t,e){var n,i=0,o={height:t};for(e=e?1:0;i<4;i+=2-e)n=$t[i],o["margin"+n]=o["padding"+n]=t;return e&&(o.opacity=o.width=t),o}function W(t,e,n){for(var i,o=(F.tweeners[e]||[]).concat(F.tweeners["*"]),r=0,s=o.length;r<s;r++)if(i=o[r].call(n,e,t))return i}function F(t,e,n){var i,o,r=0,s=F.prefilters.length,a=lt.Deferred().always(function(){delete l.elem}),l=function(){if(o)return!1;for(var e=ae||j(),n=Math.max(0,c.startTime+c.duration-e),i=1-(n/c.duration||0),r=0,s=c.tweens.length;r<s;r++)c.tweens[r].run(i);return a.notifyWith(t,[c,i,n]),i<1&&s?n:(s||a.notifyWith(t,[c,1,0]),a.resolveWith(t,[c]),!1)},c=a.promise({elem:t,props:lt.extend({},e),opts:lt.extend(!0,{specialEasing:{},easing:lt.easing._default},n),originalProperties:e,originalOptions:n,startTime:ae||j(),duration:n.duration,tweens:[],createTween:function(e,n){var i=lt.Tween(t,c.opts,e,n,c.opts.specialEasing[e]||c.opts.easing);return c.tweens.push(i),i},stop:function(e){var n=0,i=e?c.tweens.length:0;if(o)return this;for(o=!0;n<i;n++)c.tweens[n].run(1);return e?(a.notifyWith(t,[c,1,0]),a.resolveWith(t,[c,e])):a.rejectWith(t,[c,e]),this}}),u=c.props;for(function(t,e){var n,i,o,r,s;for(n in t)if(i=lt.camelCase(n),o=e[i],r=t[n],Array.isArray(r)&&(o=r[1],r=t[n]=r[0]),n!==i&&(t[i]=r,delete t[n]),(s=lt.cssHooks[i])&&"expand"in s){r=s.expand(r),delete t[i];for(n in r)n in t||(t[n]=r[n],e[n]=o)}else e[i]=o}(u,c.opts.specialEasing);r<s;r++)if(i=F.prefilters[r].call(c,t,u,c.opts))return lt.isFunction(i.stop)&&(lt._queueHooks(c.elem,c.opts.queue).stop=lt.proxy(i.stop,i)),i;return lt.map(u,W,c),lt.isFunction(c.opts.start)&&c.opts.start.call(t,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),lt.fx.timer(lt.extend(l,{elem:t,anim:c,queue:c.opts.queue})),c}function z(t){return(t.match(St)||[]).join(" ")}function q(t){return t.getAttribute&&t.getAttribute("class")||""}function B(t,e,n,i){var o;if(Array.isArray(e))lt.each(e,function(e,o){n||we.test(t)?i(t,o):B(t+"["+("object"==typeof o&&null!=o?e:"")+"]",o,n,i)});else if(n||"object"!==lt.type(e))i(t,e);else for(o in e)B(t+"["+o+"]",e[o],n,i)}function U(t){return function(e,n){"string"!=typeof e&&(n=e,e="*");var i,o=0,r=e.toLowerCase().match(St)||[];if(lt.isFunction(n))for(;i=r[o++];)"+"===i[0]?(i=i.slice(1)||"*",(t[i]=t[i]||[]).unshift(n)):(t[i]=t[i]||[]).push(n)}}function Y(t,e,n,i){function o(a){var l;return r[a]=!0,lt.each(t[a]||[],function(t,a){var c=a(e,n,i);return"string"!=typeof c||s||r[c]?s?!(l=c):void 0:(e.dataTypes.unshift(c),o(c),!1)}),l}var r={},s=t===De;return o(e.dataTypes[0])||!r["*"]&&o("*")}function V(t,e){var n,i,o=lt.ajaxSettings.flatOptions||{};for(n in e)void 0!==e[n]&&((o[n]?t:i||(i={}))[n]=e[n]);return i&&lt.extend(!0,t,i),t}var X=[],G=t.document,Q=Object.getPrototypeOf,K=X.slice,Z=X.concat,J=X.push,tt=X.indexOf,et={},nt=et.toString,it=et.hasOwnProperty,ot=it.toString,rt=ot.call(Object),st={},at="3.2.1",lt=function(t,e){return new lt.fn.init(t,e)},ct=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ut=/^-ms-/,dt=/-([a-z])/g,pt=function(t,e){return e.toUpperCase()};lt.fn=lt.prototype={jquery:at,constructor:lt,length:0,toArray:function(){return K.call(this)},get:function(t){return null==t?K.call(this):t<0?this[t+this.length]:this[t]},pushStack:function(t){var e=lt.merge(this.constructor(),t);return e.prevObject=this,e},each:function(t){return lt.each(this,t)},map:function(t){return this.pushStack(lt.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return this.pushStack(K.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,n=+t+(t<0?e:0);return this.pushStack(n>=0&&n<e?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:J,sort:X.sort,splice:X.splice},lt.extend=lt.fn.extend=function(){var t,e,n,i,o,r,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||lt.isFunction(s)||(s={}),a===l&&(s=this,a--);a<l;a++)if(null!=(t=arguments[a]))for(e in t)n=s[e],i=t[e],s!==i&&(c&&i&&(lt.isPlainObject(i)||(o=Array.isArray(i)))?(o?(o=!1,r=n&&Array.isArray(n)?n:[]):r=n&&lt.isPlainObject(n)?n:{},s[e]=lt.extend(c,r,i)):void 0!==i&&(s[e]=i));return s},lt.extend({expando:"jQuery"+(at+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===lt.type(t)},isWindow:function(t){return null!=t&&t===t.window},isNumeric:function(t){var e=lt.type(t);return("number"===e||"string"===e)&&!isNaN(t-parseFloat(t))},isPlainObject:function(t){var e,n;return!(!t||"[object Object]"!==nt.call(t)||(e=Q(t))&&("function"!=typeof(n=it.call(e,"constructor")&&e.constructor)||ot.call(n)!==rt))},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?et[nt.call(t)]||"object":typeof t},globalEval:function(t){n(t)},camelCase:function(t){return t.replace(ut,"ms-").replace(dt,pt)},each:function(t,e){var n,o=0;if(i(t))for(n=t.length;o<n&&!1!==e.call(t[o],o,t[o]);o++);else for(o in t)if(!1===e.call(t[o],o,t[o]))break;return t},trim:function(t){return null==t?"":(t+"").replace(ct,"")},makeArray:function(t,e){var n=e||[];return null!=t&&(i(Object(t))?lt.merge(n,"string"==typeof t?[t]:t):J.call(n,t)),n},inArray:function(t,e,n){return null==e?-1:tt.call(e,t,n)},merge:function(t,e){for(var n=+e.length,i=0,o=t.length;i<n;i++)t[o++]=e[i];return t.length=o,t},grep:function(t,e,n){for(var i=[],o=0,r=t.length,s=!n;o<r;o++)!e(t[o],o)!==s&&i.push(t[o]);return i},map:function(t,e,n){var o,r,s=0,a=[];if(i(t))for(o=t.length;s<o;s++)null!=(r=e(t[s],s,n))&&a.push(r);else for(s in t)null!=(r=e(t[s],s,n))&&a.push(r);return Z.apply([],a)},guid:1,proxy:function(t,e){var n,i,o;if("string"==typeof e&&(n=t[e],e=t,t=n),lt.isFunction(t))return i=K.call(arguments,2),o=function(){return t.apply(e||this,i.concat(K.call(arguments)))},o.guid=t.guid=t.guid||lt.guid++,o},now:Date.now,support:st}),"function"==typeof Symbol&&(lt.fn[Symbol.iterator]=X[Symbol.iterator]),lt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(t,e){et["[object "+e+"]"]=e.toLowerCase()});var ht=function(t){function e(t,e,n,i){var o,r,s,a,l,c,u,p=e&&e.ownerDocument,f=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==f&&9!==f&&11!==f)return n;if(!i&&((e?e.ownerDocument||e:W)!==L&&D(e),e=e||L,$)){if(11!==f&&(l=gt.exec(t)))if(o=l[1]){if(9===f){if(!(s=e.getElementById(o)))return n;if(s.id===o)return n.push(s),n}else if(p&&(s=p.getElementById(o))&&j(e,s)&&s.id===o)return n.push(s),n}else{if(l[2])return K.apply(n,e.getElementsByTagName(t)),n;if((o=l[3])&&x.getElementsByClassName&&e.getElementsByClassName)return K.apply(n,e.getElementsByClassName(o)),n}if(x.qsa&&!U[t+" "]&&(!N||!N.test(t))){if(1!==f)p=e,u=t;else if("object"!==e.nodeName.toLowerCase()){for((a=e.getAttribute("id"))?a=a.replace(wt,xt):e.setAttribute("id",a=R),r=(c=E(t)).length;r--;)c[r]="#"+a+" "+h(c[r]);u=c.join(","),p=vt.test(t)&&d(e.parentNode)||e}if(u)try{return K.apply(n,p.querySelectorAll(u)),n}catch(t){}finally{a===R&&e.removeAttribute("id")}}}return k(t.replace(st,"$1"),e,n,i)}function n(){function t(n,i){return e.push(n+" ")>T.cacheLength&&delete t[e.shift()],t[n+" "]=i}var e=[];return t}function i(t){return t[R]=!0,t}function o(t){var e=L.createElement("fieldset");try{return!!t(e)}catch(t){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function r(t,e){for(var n=t.split("|"),i=n.length;i--;)T.attrHandle[n[i]]=e}function s(t,e){var n=e&&t,i=n&&1===t.nodeType&&1===e.nodeType&&t.sourceIndex-e.sourceIndex;if(i)return i;if(n)for(;n=n.nextSibling;)if(n===e)return-1;return t?1:-1}function a(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function l(t){return function(e){var n=e.nodeName.toLowerCase();return("input"===n||"button"===n)&&e.type===t}}function c(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&St(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function u(t){return i(function(e){return e=+e,i(function(n,i){for(var o,r=t([],n.length,e),s=r.length;s--;)n[o=r[s]]&&(n[o]=!(i[o]=n[o]))})})}function d(t){return t&&void 0!==t.getElementsByTagName&&t}function p(){}function h(t){for(var e=0,n=t.length,i="";e<n;e++)i+=t[e].value;return i}function f(t,e,n){var i=e.dir,o=e.next,r=o||i,s=n&&"parentNode"===r,a=z++;return e.first?function(e,n,o){for(;e=e[i];)if(1===e.nodeType||s)return t(e,n,o);return!1}:function(e,n,l){var c,u,d,p=[F,a];if(l){for(;e=e[i];)if((1===e.nodeType||s)&&t(e,n,l))return!0}else for(;e=e[i];)if(1===e.nodeType||s)if(d=e[R]||(e[R]={}),u=d[e.uniqueID]||(d[e.uniqueID]={}),o&&o===e.nodeName.toLowerCase())e=e[i]||e;else{if((c=u[r])&&c[0]===F&&c[1]===a)return p[2]=c[2];if(u[r]=p,p[2]=t(e,n,l))return!0}return!1}}function m(t){return t.length>1?function(e,n,i){for(var o=t.length;o--;)if(!t[o](e,n,i))return!1;return!0}:t[0]}function g(t,e,n,i,o){for(var r,s=[],a=0,l=t.length,c=null!=e;a<l;a++)(r=t[a])&&(n&&!n(r,i,o)||(s.push(r),c&&e.push(a)));return s}function v(t,n,o,r,s,a){return r&&!r[R]&&(r=v(r)),s&&!s[R]&&(s=v(s,a)),i(function(i,a,l,c){var u,d,p,h=[],f=[],m=a.length,v=i||function(t,n,i){for(var o=0,r=n.length;o<r;o++)e(t,n[o],i);return i}(n||"*",l.nodeType?[l]:l,[]),y=!t||!i&&n?v:g(v,h,t,l,c),b=o?s||(i?t:m||r)?[]:a:y;if(o&&o(y,b,l,c),r)for(u=g(b,f),r(u,[],l,c),d=u.length;d--;)(p=u[d])&&(b[f[d]]=!(y[f[d]]=p));if(i){if(s||t){if(s){for(u=[],d=b.length;d--;)(p=b[d])&&u.push(y[d]=p);s(null,b=[],u,c)}for(d=b.length;d--;)(p=b[d])&&(u=s?J(i,p):h[d])>-1&&(i[u]=!(a[u]=p))}}else b=g(b===a?b.splice(m,b.length):b),s?s(null,a,b,c):K.apply(a,b)})}function y(t){for(var e,n,i,o=t.length,r=T.relative[t[0].type],s=r||T.relative[" "],a=r?1:0,l=f(function(t){return t===e},s,!0),c=f(function(t){return J(e,t)>-1},s,!0),u=[function(t,n,i){var o=!r&&(i||n!==A)||((e=n).nodeType?l(t,n,i):c(t,n,i));return e=null,o}];a<o;a++)if(n=T.relative[t[a].type])u=[f(m(u),n)];else{if((n=T.filter[t[a].type].apply(null,t[a].matches))[R]){for(i=++a;i<o&&!T.relative[t[i].type];i++);return v(a>1&&m(u),a>1&&h(t.slice(0,a-1).concat({value:" "===t[a-2].type?"*":""})).replace(st,"$1"),n,a<i&&y(t.slice(a,i)),i<o&&y(t=t.slice(i)),i<o&&h(t))}u.push(n)}return m(u)}function b(t,n){var o=n.length>0,r=t.length>0,s=function(i,s,a,l,c){var u,d,p,h=0,f="0",m=i&&[],v=[],y=A,b=i||r&&T.find.TAG("*",c),w=F+=null==y?1:Math.random()||.1,x=b.length;for(c&&(A=s===L||s||c);f!==x&&null!=(u=b[f]);f++){if(r&&u){for(d=0,s||u.ownerDocument===L||(D(u),a=!$);p=t[d++];)if(p(u,s||L,a)){l.push(u);break}c&&(F=w)}o&&((u=!p&&u)&&h--,i&&m.push(u))}if(h+=f,o&&f!==h){for(d=0;p=n[d++];)p(m,v,s,a);if(i){if(h>0)for(;f--;)m[f]||v[f]||(v[f]=G.call(l));v=g(v)}K.apply(l,v),c&&!i&&v.length>0&&h+n.length>1&&e.uniqueSort(l)}return c&&(F=w,A=y),m};return o?i(s):s}var w,x,T,S,C,E,_,k,A,I,O,D,L,P,$,N,H,M,j,R="sizzle"+1*new Date,W=t.document,F=0,z=0,q=n(),B=n(),U=n(),Y=function(t,e){return t===e&&(O=!0),0},V={}.hasOwnProperty,X=[],G=X.pop,Q=X.push,K=X.push,Z=X.slice,J=function(t,e){for(var n=0,i=t.length;n<i;n++)if(t[n]===e)return n;return-1},tt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",et="[\\x20\\t\\r\\n\\f]",nt="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",it="\\["+et+"*("+nt+")(?:"+et+"*([*^$|!~]?=)"+et+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+nt+"))|)"+et+"*\\]",ot=":("+nt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+it+")*)|.*)\\)|)",rt=new RegExp(et+"+","g"),st=new RegExp("^"+et+"+|((?:^|[^\\\\])(?:\\\\.)*)"+et+"+$","g"),at=new RegExp("^"+et+"*,"+et+"*"),lt=new RegExp("^"+et+"*([>+~]|"+et+")"+et+"*"),ct=new RegExp("="+et+"*([^\\]'\"]*?)"+et+"*\\]","g"),ut=new RegExp(ot),dt=new RegExp("^"+nt+"$"),pt={ID:new RegExp("^#("+nt+")"),CLASS:new RegExp("^\\.("+nt+")"),TAG:new RegExp("^("+nt+"|[*])"),ATTR:new RegExp("^"+it),PSEUDO:new RegExp("^"+ot),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+et+"*(even|odd|(([+-]|)(\\d*)n|)"+et+"*(?:([+-]|)"+et+"*(\\d+)|))"+et+"*\\)|)","i"),bool:new RegExp("^(?:"+tt+")$","i"),needsContext:new RegExp("^"+et+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+et+"*((?:-\\d)?\\d*)"+et+"*\\)|)(?=[^-]|$)","i")},ht=/^(?:input|select|textarea|button)$/i,ft=/^h\d$/i,mt=/^[^{]+\{\s*\[native \w/,gt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,vt=/[+~]/,yt=new RegExp("\\\\([\\da-f]{1,6}"+et+"?|("+et+")|.)","ig"),bt=function(t,e,n){var i="0x"+e-65536;return i!=i||n?e:i<0?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},wt=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,xt=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t},Tt=function(){D()},St=f(function(t){return!0===t.disabled&&("form"in t||"label"in t)},{dir:"parentNode",next:"legend"});try{K.apply(X=Z.call(W.childNodes),W.childNodes),X[W.childNodes.length].nodeType}catch(t){K={apply:X.length?function(t,e){Q.apply(t,Z.call(e))}:function(t,e){for(var n=t.length,i=0;t[n++]=e[i++];);t.length=n-1}}}x=e.support={},C=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return!!e&&"HTML"!==e.nodeName},D=e.setDocument=function(t){var e,n,i=t?t.ownerDocument||t:W;return i!==L&&9===i.nodeType&&i.documentElement?(L=i,P=L.documentElement,$=!C(L),W!==L&&(n=L.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Tt,!1):n.attachEvent&&n.attachEvent("onunload",Tt)),x.attributes=o(function(t){return t.className="i",!t.getAttribute("className")}),x.getElementsByTagName=o(function(t){return t.appendChild(L.createComment("")),!t.getElementsByTagName("*").length}),x.getElementsByClassName=mt.test(L.getElementsByClassName),x.getById=o(function(t){return P.appendChild(t).id=R,!L.getElementsByName||!L.getElementsByName(R).length}),x.getById?(T.filter.ID=function(t){var e=t.replace(yt,bt);return function(t){return t.getAttribute("id")===e}},T.find.ID=function(t,e){if(void 0!==e.getElementById&&$){var n=e.getElementById(t);return n?[n]:[]}}):(T.filter.ID=function(t){var e=t.replace(yt,bt);return function(t){var n=void 0!==t.getAttributeNode&&t.getAttributeNode("id");return n&&n.value===e}},T.find.ID=function(t,e){if(void 0!==e.getElementById&&$){var n,i,o,r=e.getElementById(t);if(r){if((n=r.getAttributeNode("id"))&&n.value===t)return[r];for(o=e.getElementsByName(t),i=0;r=o[i++];)if((n=r.getAttributeNode("id"))&&n.value===t)return[r]}return[]}}),T.find.TAG=x.getElementsByTagName?function(t,e){return void 0!==e.getElementsByTagName?e.getElementsByTagName(t):x.qsa?e.querySelectorAll(t):void 0}:function(t,e){var n,i=[],o=0,r=e.getElementsByTagName(t);if("*"===t){for(;n=r[o++];)1===n.nodeType&&i.push(n);return i}return r},T.find.CLASS=x.getElementsByClassName&&function(t,e){if(void 0!==e.getElementsByClassName&&$)return e.getElementsByClassName(t)},H=[],N=[],(x.qsa=mt.test(L.querySelectorAll))&&(o(function(t){P.appendChild(t).innerHTML="<a id='"+R+"'></a><select id='"+R+"-\r\\' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&N.push("[*^$]="+et+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||N.push("\\["+et+"*(?:value|"+tt+")"),t.querySelectorAll("[id~="+R+"-]").length||N.push("~="),t.querySelectorAll(":checked").length||N.push(":checked"),t.querySelectorAll("a#"+R+"+*").length||N.push(".#.+[+~]")}),o(function(t){t.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var e=L.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&N.push("name"+et+"*[*^$|!~]?="),2!==t.querySelectorAll(":enabled").length&&N.push(":enabled",":disabled"),P.appendChild(t).disabled=!0,2!==t.querySelectorAll(":disabled").length&&N.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),N.push(",.*:")})),(x.matchesSelector=mt.test(M=P.matches||P.webkitMatchesSelector||P.mozMatchesSelector||P.oMatchesSelector||P.msMatchesSelector))&&o(function(t){x.disconnectedMatch=M.call(t,"*"),M.call(t,"[s!='']:x"),H.push("!=",ot)}),N=N.length&&new RegExp(N.join("|")),H=H.length&&new RegExp(H.join("|")),e=mt.test(P.compareDocumentPosition),j=e||mt.test(P.contains)?function(t,e){var n=9===t.nodeType?t.documentElement:t,i=e&&e.parentNode;return t===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):t.compareDocumentPosition&&16&t.compareDocumentPosition(i)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},Y=e?function(t,e){if(t===e)return O=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;return n||(1&(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1)||!x.sortDetached&&e.compareDocumentPosition(t)===n?t===L||t.ownerDocument===W&&j(W,t)?-1:e===L||e.ownerDocument===W&&j(W,e)?1:I?J(I,t)-J(I,e):0:4&n?-1:1)}:function(t,e){if(t===e)return O=!0,0;var n,i=0,o=t.parentNode,r=e.parentNode,a=[t],l=[e];if(!o||!r)return t===L?-1:e===L?1:o?-1:r?1:I?J(I,t)-J(I,e):0;if(o===r)return s(t,e);for(n=t;n=n.parentNode;)a.unshift(n);for(n=e;n=n.parentNode;)l.unshift(n);for(;a[i]===l[i];)i++;return i?s(a[i],l[i]):a[i]===W?-1:l[i]===W?1:0},L):L},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==L&&D(t),n=n.replace(ct,"='$1']"),x.matchesSelector&&$&&!U[n+" "]&&(!H||!H.test(n))&&(!N||!N.test(n)))try{var i=M.call(t,n);if(i||x.disconnectedMatch||t.document&&11!==t.document.nodeType)return i}catch(t){}return e(n,L,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==L&&D(t),j(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==L&&D(t);var n=T.attrHandle[e.toLowerCase()],i=n&&V.call(T.attrHandle,e.toLowerCase())?n(t,e,!$):void 0;return void 0!==i?i:x.attributes||!$?t.getAttribute(e):(i=t.getAttributeNode(e))&&i.specified?i.value:null},e.escape=function(t){return(t+"").replace(wt,xt)},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,n=[],i=0,o=0;if(O=!x.detectDuplicates,I=!x.sortStable&&t.slice(0),t.sort(Y),O){for(;e=t[o++];)e===t[o]&&(i=n.push(o));for(;i--;)t.splice(n[i],1)}return I=null,t},S=e.getText=function(t){var e,n="",i=0,o=t.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)n+=S(t)}else if(3===o||4===o)return t.nodeValue}else for(;e=t[i++];)n+=S(e);return n},(T=e.selectors={cacheLength:50,createPseudo:i,match:pt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(yt,bt),t[3]=(t[3]||t[4]||t[5]||"").replace(yt,bt),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,n=!t[6]&&t[2];return pt.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&ut.test(n)&&(e=E(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),t[2]=n.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(yt,bt).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=q[t+" "];return e||(e=new RegExp("(^|"+et+")"+t+"("+et+"|$)"))&&q(t,function(t){return e.test("string"==typeof t.className&&t.className||void 0!==t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,n,i){return function(o){var r=e.attr(o,t);return null==r?"!="===n:!n||(r+="","="===n?r===i:"!="===n?r!==i:"^="===n?i&&0===r.indexOf(i):"*="===n?i&&r.indexOf(i)>-1:"$="===n?i&&r.slice(-i.length)===i:"~="===n?(" "+r.replace(rt," ")+" ").indexOf(i)>-1:"|="===n&&(r===i||r.slice(0,i.length+1)===i+"-"))}},CHILD:function(t,e,n,i,o){var r="nth"!==t.slice(0,3),s="last"!==t.slice(-4),a="of-type"===e;return 1===i&&0===o?function(t){return!!t.parentNode}:function(e,n,l){var c,u,d,p,h,f,m=r!==s?"nextSibling":"previousSibling",g=e.parentNode,v=a&&e.nodeName.toLowerCase(),y=!l&&!a,b=!1;if(g){if(r){for(;m;){for(p=e;p=p[m];)if(a?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;f=m="only"===t&&!f&&"nextSibling"}return!0}if(f=[s?g.firstChild:g.lastChild],s&&y){for(b=(h=(c=(u=(d=(p=g)[R]||(p[R]={}))[p.uniqueID]||(d[p.uniqueID]={}))[t]||[])[0]===F&&c[1])&&c[2],p=h&&g.childNodes[h];p=++h&&p&&p[m]||(b=h=0)||f.pop();)if(1===p.nodeType&&++b&&p===e){u[t]=[F,h,b];break}}else if(y&&(p=e,d=p[R]||(p[R]={}),u=d[p.uniqueID]||(d[p.uniqueID]={}),c=u[t]||[],h=c[0]===F&&c[1],b=h),!1===b)for(;(p=++h&&p&&p[m]||(b=h=0)||f.pop())&&((a?p.nodeName.toLowerCase()!==v:1!==p.nodeType)||!++b||(y&&(d=p[R]||(p[R]={}),u=d[p.uniqueID]||(d[p.uniqueID]={}),u[t]=[F,b]),p!==e)););return(b-=o)===i||b%i==0&&b/i>=0}}},PSEUDO:function(t,n){var o,r=T.pseudos[t]||T.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return r[R]?r(n):r.length>1?(o=[t,t,"",n],T.setFilters.hasOwnProperty(t.toLowerCase())?i(function(t,e){for(var i,o=r(t,n),s=o.length;s--;)i=J(t,o[s]),t[i]=!(e[i]=o[s])}):function(t){return r(t,0,o)}):r}},pseudos:{not:i(function(t){var e=[],n=[],o=_(t.replace(st,"$1"));return o[R]?i(function(t,e,n,i){for(var r,s=o(t,null,i,[]),a=t.length;a--;)(r=s[a])&&(t[a]=!(e[a]=r))}):function(t,i,r){return e[0]=t,o(e,null,r,n),e[0]=null,!n.pop()}}),has:i(function(t){return function(n){return e(t,n).length>0}}),contains:i(function(t){return t=t.replace(yt,bt),function(e){return(e.textContent||e.innerText||S(e)).indexOf(t)>-1}}),lang:i(function(t){return dt.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(yt,bt).toLowerCase(),function(e){var n;do{if(n=$?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(n=n.toLowerCase())===t||0===n.indexOf(t+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var n=t.location&&t.location.hash;return n&&n.slice(1)===e.id},root:function(t){return t===P},focus:function(t){return t===L.activeElement&&(!L.hasFocus||L.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:c(!1),disabled:c(!0),checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,!0===t.selected},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!T.pseudos.empty(t)},header:function(t){return ft.test(t.nodeName)},input:function(t){return ht.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:u(function(){return[0]}),last:u(function(t,e){return[e-1]}),eq:u(function(t,e,n){return[n<0?n+e:n]}),even:u(function(t,e){for(var n=0;n<e;n+=2)t.push(n);return t}),odd:u(function(t,e){for(var n=1;n<e;n+=2)t.push(n);return t}),lt:u(function(t,e,n){for(var i=n<0?n+e:n;--i>=0;)t.push(i);return t}),gt:u(function(t,e,n){for(var i=n<0?n+e:n;++i<e;)t.push(i);return t})}}).pseudos.nth=T.pseudos.eq;for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[w]=a(w);for(w in{submit:!0,reset:!0})T.pseudos[w]=l(w);return p.prototype=T.filters=T.pseudos,T.setFilters=new p,E=e.tokenize=function(t,n){var i,o,r,s,a,l,c,u=B[t+" "];if(u)return n?0:u.slice(0);for(a=t,l=[],c=T.preFilter;a;){i&&!(o=at.exec(a))||(o&&(a=a.slice(o[0].length)||a),l.push(r=[])),i=!1,(o=lt.exec(a))&&(i=o.shift(),r.push({value:i,type:o[0].replace(st," ")}),a=a.slice(i.length));for(s in T.filter)!(o=pt[s].exec(a))||c[s]&&!(o=c[s](o))||(i=o.shift(),r.push({value:i,type:s,matches:o}),a=a.slice(i.length));if(!i)break}return n?a.length:a?e.error(t):B(t,l).slice(0)},_=e.compile=function(t,e){var n,i=[],o=[],r=U[t+" "];if(!r){for(e||(e=E(t)),n=e.length;n--;)(r=y(e[n]))[R]?i.push(r):o.push(r);(r=U(t,b(o,i))).selector=t}return r},k=e.select=function(t,e,n,i){var o,r,s,a,l,c="function"==typeof t&&t,u=!i&&E(t=c.selector||t);if(n=n||[],1===u.length){if((r=u[0]=u[0].slice(0)).length>2&&"ID"===(s=r[0]).type&&9===e.nodeType&&$&&T.relative[r[1].type]){if(!(e=(T.find.ID(s.matches[0].replace(yt,bt),e)||[])[0]))return n;c&&(e=e.parentNode),t=t.slice(r.shift().value.length)}for(o=pt.needsContext.test(t)?0:r.length;o--&&(s=r[o],!T.relative[a=s.type]);)if((l=T.find[a])&&(i=l(s.matches[0].replace(yt,bt),vt.test(r[0].type)&&d(e.parentNode)||e))){if(r.splice(o,1),!(t=i.length&&h(r)))return K.apply(n,i),n;break}}return(c||_(t,u))(i,e,!$,n,!e||vt.test(t)&&d(e.parentNode)||e),n},x.sortStable=R.split("").sort(Y).join("")===R,x.detectDuplicates=!!O,D(),x.sortDetached=o(function(t){return 1&t.compareDocumentPosition(L.createElement("fieldset"))}),o(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||r("type|href|height|width",function(t,e,n){if(!n)return t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),x.attributes&&o(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||r("value",function(t,e,n){if(!n&&"input"===t.nodeName.toLowerCase())return t.defaultValue}),o(function(t){return null==t.getAttribute("disabled")})||r(tt,function(t,e,n){var i;if(!n)return!0===t[e]?e.toLowerCase():(i=t.getAttributeNode(e))&&i.specified?i.value:null}),e}(t);lt.find=ht,lt.expr=ht.selectors,lt.expr[":"]=lt.expr.pseudos,lt.uniqueSort=lt.unique=ht.uniqueSort,lt.text=ht.getText,lt.isXMLDoc=ht.isXML,lt.contains=ht.contains,lt.escapeSelector=ht.escape;var ft=function(t,e,n){for(var i=[],o=void 0!==n;(t=t[e])&&9!==t.nodeType;)if(1===t.nodeType){if(o&&lt(t).is(n))break;i.push(t)}return i},mt=function(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);return n},gt=lt.expr.match.needsContext,vt=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,yt=/^.[^:#\[\.,]*$/;lt.filter=function(t,e,n){var i=e[0];return n&&(t=":not("+t+")"),1===e.length&&1===i.nodeType?lt.find.matchesSelector(i,t)?[i]:[]:lt.find.matches(t,lt.grep(e,function(t){return 1===t.nodeType}))},lt.fn.extend({find:function(t){var e,n,i=this.length,o=this;if("string"!=typeof t)return this.pushStack(lt(t).filter(function(){for(e=0;e<i;e++)if(lt.contains(o[e],this))return!0}));for(n=this.pushStack([]),e=0;e<i;e++)lt.find(t,o[e],n);return i>1?lt.uniqueSort(n):n},filter:function(t){return this.pushStack(r(this,t||[],!1))},not:function(t){return this.pushStack(r(this,t||[],!0))},is:function(t){return!!r(this,"string"==typeof t&&gt.test(t)?lt(t):t||[],!1).length}});var bt,wt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(lt.fn.init=function(t,e,n){var i,o;if(!t)return this;if(n=n||bt,"string"==typeof t){if(!(i="<"===t[0]&&">"===t[t.length-1]&&t.length>=3?[null,t,null]:wt.exec(t))||!i[1]&&e)return!e||e.jquery?(e||n).find(t):this.constructor(e).find(t);if(i[1]){if(e=e instanceof lt?e[0]:e,lt.merge(this,lt.parseHTML(i[1],e&&e.nodeType?e.ownerDocument||e:G,!0)),vt.test(i[1])&&lt.isPlainObject(e))for(i in e)lt.isFunction(this[i])?this[i](e[i]):this.attr(i,e[i]);return this}return(o=G.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return t.nodeType?(this[0]=t,this.length=1,this):lt.isFunction(t)?void 0!==n.ready?n.ready(t):t(lt):lt.makeArray(t,this)}).prototype=lt.fn,bt=lt(G);var xt=/^(?:parents|prev(?:Until|All))/,Tt={children:!0,contents:!0,next:!0,prev:!0};lt.fn.extend({has:function(t){var e=lt(t,this),n=e.length;return this.filter(function(){for(var t=0;t<n;t++)if(lt.contains(this,e[t]))return!0})},closest:function(t,e){var n,i=0,o=this.length,r=[],s="string"!=typeof t&&lt(t);if(!gt.test(t))for(;i<o;i++)for(n=this[i];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&lt.find.matchesSelector(n,t))){r.push(n);break}return this.pushStack(r.length>1?lt.uniqueSort(r):r)},index:function(t){return t?"string"==typeof t?tt.call(lt(t),this[0]):tt.call(this,t.jquery?t[0]:t):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(lt.uniqueSort(lt.merge(this.get(),lt(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),lt.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return ft(t,"parentNode")},parentsUntil:function(t,e,n){return ft(t,"parentNode",n)},next:function(t){return s(t,"nextSibling")},prev:function(t){return s(t,"previousSibling")},nextAll:function(t){return ft(t,"nextSibling")},prevAll:function(t){return ft(t,"previousSibling")},nextUntil:function(t,e,n){return ft(t,"nextSibling",n)},prevUntil:function(t,e,n){return ft(t,"previousSibling",n)},siblings:function(t){return mt((t.parentNode||{}).firstChild,t)},children:function(t){return mt(t.firstChild)},contents:function(t){return o(t,"iframe")?t.contentDocument:(o(t,"template")&&(t=t.content||t),lt.merge([],t.childNodes))}},function(t,e){lt.fn[t]=function(n,i){var o=lt.map(this,e,n);return"Until"!==t.slice(-5)&&(i=n),i&&"string"==typeof i&&(o=lt.filter(i,o)),this.length>1&&(Tt[t]||lt.uniqueSort(o),xt.test(t)&&o.reverse()),this.pushStack(o)}});var St=/[^\x20\t\r\n\f]+/g;lt.Callbacks=function(t){t="string"==typeof t?function(t){var e={};return lt.each(t.match(St)||[],function(t,n){e[n]=!0}),e}(t):lt.extend({},t);var e,n,i,o,r=[],s=[],a=-1,l=function(){for(o=o||t.once,i=e=!0;s.length;a=-1)for(n=s.shift();++a<r.length;)!1===r[a].apply(n[0],n[1])&&t.stopOnFalse&&(a=r.length,n=!1);t.memory||(n=!1),e=!1,o&&(r=n?[]:"")},c={add:function(){return r&&(n&&!e&&(a=r.length-1,s.push(n)),function e(n){lt.each(n,function(n,i){lt.isFunction(i)?t.unique&&c.has(i)||r.push(i):i&&i.length&&"string"!==lt.type(i)&&e(i)})}(arguments),n&&!e&&l()),this},remove:function(){return lt.each(arguments,function(t,e){for(var n;(n=lt.inArray(e,r,n))>-1;)r.splice(n,1),n<=a&&a--}),this},has:function(t){return t?lt.inArray(t,r)>-1:r.length>0},empty:function(){return r&&(r=[]),this},disable:function(){return o=s=[],r=n="",this},disabled:function(){return!r},lock:function(){return o=s=[],n||e||(r=n=""),this},locked:function(){return!!o},fireWith:function(t,n){return o||(n=n||[],n=[t,n.slice?n.slice():n],s.push(n),e||l()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}};return c},lt.extend({Deferred:function(e){var n=[["notify","progress",lt.Callbacks("memory"),lt.Callbacks("memory"),2],["resolve","done",lt.Callbacks("once memory"),lt.Callbacks("once memory"),0,"resolved"],["reject","fail",lt.Callbacks("once memory"),lt.Callbacks("once memory"),1,"rejected"]],i="pending",o={state:function(){return i},always:function(){return r.done(arguments).fail(arguments),this},catch:function(t){return o.then(null,t)},pipe:function(){var t=arguments;return lt.Deferred(function(e){lt.each(n,function(n,i){var o=lt.isFunction(t[i[4]])&&t[i[4]];r[i[1]](function(){var t=o&&o.apply(this,arguments);t&&lt.isFunction(t.promise)?t.promise().progress(e.notify).done(e.resolve).fail(e.reject):e[i[0]+"With"](this,o?[t]:arguments)})}),t=null}).promise()},then:function(e,i,o){function r(e,n,i,o){return function(){var c=this,u=arguments,d=function(){var t,d;if(!(e<s)){if((t=i.apply(c,u))===n.promise())throw new TypeError("Thenable self-resolution");d=t&&("object"==typeof t||"function"==typeof t)&&t.then,lt.isFunction(d)?o?d.call(t,r(s,n,a,o),r(s,n,l,o)):(s++,d.call(t,r(s,n,a,o),r(s,n,l,o),r(s,n,a,n.notifyWith))):(i!==a&&(c=void 0,u=[t]),(o||n.resolveWith)(c,u))}},p=o?d:function(){try{d()}catch(t){lt.Deferred.exceptionHook&&lt.Deferred.exceptionHook(t,p.stackTrace),e+1>=s&&(i!==l&&(c=void 0,u=[t]),n.rejectWith(c,u))}};e?p():(lt.Deferred.getStackHook&&(p.stackTrace=lt.Deferred.getStackHook()),t.setTimeout(p))}}var s=0;return lt.Deferred(function(t){n[0][3].add(r(0,t,lt.isFunction(o)?o:a,t.notifyWith)),n[1][3].add(r(0,t,lt.isFunction(e)?e:a)),n[2][3].add(r(0,t,lt.isFunction(i)?i:l))}).promise()},promise:function(t){return null!=t?lt.extend(t,o):o}},r={};return lt.each(n,function(t,e){var s=e[2],a=e[5];o[e[1]]=s.add,a&&s.add(function(){i=a},n[3-t][2].disable,n[0][2].lock),s.add(e[3].fire),r[e[0]]=function(){return r[e[0]+"With"](this===r?void 0:this,arguments),this},r[e[0]+"With"]=s.fireWith}),o.promise(r),e&&e.call(r,r),r},when:function(t){var e=arguments.length,n=e,i=Array(n),o=K.call(arguments),r=lt.Deferred(),s=function(t){return function(n){i[t]=this,o[t]=arguments.length>1?K.call(arguments):n,--e||r.resolveWith(i,o)}};if(e<=1&&(c(t,r.done(s(n)).resolve,r.reject,!e),"pending"===r.state()||lt.isFunction(o[n]&&o[n].then)))return r.then();for(;n--;)c(o[n],s(n),r.reject);return r.promise()}});var Ct=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;lt.Deferred.exceptionHook=function(e,n){t.console&&t.console.warn&&e&&Ct.test(e.name)&&t.console.warn("jQuery.Deferred exception: "+e.message,e.stack,n)},lt.readyException=function(e){t.setTimeout(function(){throw e})};var Et=lt.Deferred();lt.fn.ready=function(t){return Et.then(t).catch(function(t){lt.readyException(t)}),this},lt.extend({isReady:!1,readyWait:1,ready:function(t){(!0===t?--lt.readyWait:lt.isReady)||(lt.isReady=!0,!0!==t&&--lt.readyWait>0||Et.resolveWith(G,[lt]))}}),lt.ready.then=Et.then,"complete"===G.readyState||"loading"!==G.readyState&&!G.documentElement.doScroll?t.setTimeout(lt.ready):(G.addEventListener("DOMContentLoaded",u),t.addEventListener("load",u));var _t=function(t,e,n,i,o,r,s){var a=0,l=t.length,c=null==n;if("object"===lt.type(n)){o=!0;for(a in n)_t(t,e,a,n[a],!0,r,s)}else if(void 0!==i&&(o=!0,lt.isFunction(i)||(s=!0),c&&(s?(e.call(t,i),e=null):(c=e,e=function(t,e,n){return c.call(lt(t),n)})),e))for(;a<l;a++)e(t[a],n,s?i:i.call(t[a],a,e(t[a],n)));return o?t:c?e.call(t):l?e(t[0],n):r},kt=function(t){return 1===t.nodeType||9===t.nodeType||!+t.nodeType};d.uid=1,d.prototype={cache:function(t){var e=t[this.expando];return e||(e={},kt(t)&&(t.nodeType?t[this.expando]=e:Object.defineProperty(t,this.expando,{value:e,configurable:!0}))),e},set:function(t,e,n){var i,o=this.cache(t);if("string"==typeof e)o[lt.camelCase(e)]=n;else for(i in e)o[lt.camelCase(i)]=e[i];return o},get:function(t,e){return void 0===e?this.cache(t):t[this.expando]&&t[this.expando][lt.camelCase(e)]},access:function(t,e,n){return void 0===e||e&&"string"==typeof e&&void 0===n?this.get(t,e):(this.set(t,e,n),void 0!==n?n:e)},remove:function(t,e){var n,i=t[this.expando];if(void 0!==i){if(void 0!==e){Array.isArray(e)?e=e.map(lt.camelCase):(e=lt.camelCase(e),e=e in i?[e]:e.match(St)||[]),n=e.length;for(;n--;)delete i[e[n]]}(void 0===e||lt.isEmptyObject(i))&&(t.nodeType?t[this.expando]=void 0:delete t[this.expando])}},hasData:function(t){var e=t[this.expando];return void 0!==e&&!lt.isEmptyObject(e)}};var At=new d,It=new d,Ot=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Dt=/[A-Z]/g;lt.extend({hasData:function(t){return It.hasData(t)||At.hasData(t)},data:function(t,e,n){return It.access(t,e,n)},removeData:function(t,e){It.remove(t,e)},_data:function(t,e,n){return At.access(t,e,n)},_removeData:function(t,e){At.remove(t,e)}}),lt.fn.extend({data:function(t,e){var n,i,o,r=this[0],s=r&&r.attributes;if(void 0===t){if(this.length&&(o=It.get(r),1===r.nodeType&&!At.get(r,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&0===(i=s[n].name).indexOf("data-")&&(i=lt.camelCase(i.slice(5)),p(r,i,o[i]));At.set(r,"hasDataAttrs",!0)}return o}return"object"==typeof t?this.each(function(){It.set(this,t)}):_t(this,function(e){var n;if(r&&void 0===e){if(void 0!==(n=It.get(r,t)))return n;if(void 0!==(n=p(r,t)))return n}else this.each(function(){It.set(this,t,e)})},null,e,arguments.length>1,null,!0)},removeData:function(t){return this.each(function(){It.remove(this,t)})}}),lt.extend({queue:function(t,e,n){var i;if(t)return e=(e||"fx")+"queue",i=At.get(t,e),n&&(!i||Array.isArray(n)?i=At.access(t,e,lt.makeArray(n)):i.push(n)),i||[]},dequeue:function(t,e){e=e||"fx";var n=lt.queue(t,e),i=n.length,o=n.shift(),r=lt._queueHooks(t,e);"inprogress"===o&&(o=n.shift(),i--),o&&("fx"===e&&n.unshift("inprogress"),delete r.stop,o.call(t,function(){lt.dequeue(t,e)},r)),!i&&r&&r.empty.fire()},_queueHooks:function(t,e){var n=e+"queueHooks";return At.get(t,n)||At.access(t,n,{empty:lt.Callbacks("once memory").add(function(){At.remove(t,[e+"queue",n])})})}}),lt.fn.extend({queue:function(t,e){var n=2;return"string"!=typeof t&&(e=t,t="fx",n--),arguments.length<n?lt.queue(this[0],t):void 0===e?this:this.each(function(){var n=lt.queue(this,t,e);lt._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&lt.dequeue(this,t)})},dequeue:function(t){return this.each(function(){lt.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var n,i=1,o=lt.Deferred(),r=this,s=this.length,a=function(){--i||o.resolveWith(r,[r])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";s--;)(n=At.get(r[s],t+"queueHooks"))&&n.empty&&(i++,n.empty.add(a));return a(),o.promise(e)}});var Lt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Pt=new RegExp("^(?:([+-])=|)("+Lt+")([a-z%]*)$","i"),$t=["Top","Right","Bottom","Left"],Nt=function(t,e){return"none"===(t=e||t).style.display||""===t.style.display&&lt.contains(t.ownerDocument,t)&&"none"===lt.css(t,"display")},Ht=function(t,e,n,i){var o,r,s={};for(r in e)s[r]=t.style[r],t.style[r]=e[r];o=n.apply(t,i||[]);for(r in e)t.style[r]=s[r];return o},Mt={};lt.fn.extend({show:function(){return m(this,!0)},hide:function(){return m(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){Nt(this)?lt(this).show():lt(this).hide()})}});var jt=/^(?:checkbox|radio)$/i,Rt=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,Wt=/^$|\/(?:java|ecma)script/i,Ft={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Ft.optgroup=Ft.option,Ft.tbody=Ft.tfoot=Ft.colgroup=Ft.caption=Ft.thead,Ft.th=Ft.td;var zt=/<|&#?\w+;/;!function(){var t=G.createDocumentFragment().appendChild(G.createElement("div")),e=G.createElement("input");e.setAttribute("type","radio"),e.setAttribute("checked","checked"),e.setAttribute("name","t"),t.appendChild(e),st.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",st.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var qt=G.documentElement,Bt=/^key/,Ut=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Yt=/^([^.]*)(?:\.(.+)|)/;lt.event={global:{},add:function(t,e,n,i,o){var r,s,a,l,c,u,d,p,h,f,m,g=At.get(t);if(g)for(n.handler&&(r=n,n=r.handler,o=r.selector),o&&lt.find.matchesSelector(qt,o),n.guid||(n.guid=lt.guid++),(l=g.events)||(l=g.events={}),(s=g.handle)||(s=g.handle=function(e){return void 0!==lt&&lt.event.triggered!==e.type?lt.event.dispatch.apply(t,arguments):void 0}),c=(e=(e||"").match(St)||[""]).length;c--;)a=Yt.exec(e[c])||[],h=m=a[1],f=(a[2]||"").split(".").sort(),h&&(d=lt.event.special[h]||{},h=(o?d.delegateType:d.bindType)||h,d=lt.event.special[h]||{},u=lt.extend({type:h,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&lt.expr.match.needsContext.test(o),namespace:f.join(".")},r),(p=l[h])||(p=l[h]=[],p.delegateCount=0,d.setup&&!1!==d.setup.call(t,i,f,s)||t.addEventListener&&t.addEventListener(h,s)),d.add&&(d.add.call(t,u),u.handler.guid||(u.handler.guid=n.guid)),o?p.splice(p.delegateCount++,0,u):p.push(u),lt.event.global[h]=!0)},remove:function(t,e,n,i,o){var r,s,a,l,c,u,d,p,h,f,m,g=At.hasData(t)&&At.get(t);if(g&&(l=g.events)){for(c=(e=(e||"").match(St)||[""]).length;c--;)if(a=Yt.exec(e[c])||[],h=m=a[1],f=(a[2]||"").split(".").sort(),h){for(d=lt.event.special[h]||{},p=l[h=(i?d.delegateType:d.bindType)||h]||[],a=a[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=r=p.length;r--;)u=p[r],!o&&m!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||i&&i!==u.selector&&("**"!==i||!u.selector)||(p.splice(r,1),u.selector&&p.delegateCount--,d.remove&&d.remove.call(t,u));s&&!p.length&&(d.teardown&&!1!==d.teardown.call(t,f,g.handle)||lt.removeEvent(t,h,g.handle),delete l[h])}else for(h in l)lt.event.remove(t,h+e[c],n,i,!0);lt.isEmptyObject(l)&&At.remove(t,"handle events")}},dispatch:function(t){var e,n,i,o,r,s,a=lt.event.fix(t),l=new Array(arguments.length),c=(At.get(this,"events")||{})[a.type]||[],u=lt.event.special[a.type]||{};for(l[0]=a,e=1;e<arguments.length;e++)l[e]=arguments[e];if(a.delegateTarget=this,!u.preDispatch||!1!==u.preDispatch.call(this,a)){for(s=lt.event.handlers.call(this,a,c),e=0;(o=s[e++])&&!a.isPropagationStopped();)for(a.currentTarget=o.elem,n=0;(r=o.handlers[n++])&&!a.isImmediatePropagationStopped();)a.rnamespace&&!a.rnamespace.test(r.namespace)||(a.handleObj=r,a.data=r.data,void 0!==(i=((lt.event.special[r.origType]||{}).handle||r.handler).apply(o.elem,l))&&!1===(a.result=i)&&(a.preventDefault(),a.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,a),a.result}},handlers:function(t,e){var n,i,o,r,s,a=[],l=e.delegateCount,c=t.target;if(l&&c.nodeType&&!("click"===t.type&&t.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==t.type||!0!==c.disabled)){for(r=[],s={},n=0;n<l;n++)i=e[n],o=i.selector+" ",void 0===s[o]&&(s[o]=i.needsContext?lt(o,this).index(c)>-1:lt.find(o,this,null,[c]).length),s[o]&&r.push(i);r.length&&a.push({elem:c,handlers:r})}return c=this,l<e.length&&a.push({elem:c,handlers:e.slice(l)}),a},addProp:function(t,e){Object.defineProperty(lt.Event.prototype,t,{enumerable:!0,configurable:!0,get:lt.isFunction(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(t){return t[lt.expando]?t:new lt.Event(t)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==x()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===x()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&o(this,"input"))return this.click(),!1},_default:function(t){return o(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}}},lt.removeEvent=function(t,e,n){t.removeEventListener&&t.removeEventListener(e,n)},lt.Event=function(t,e){return this instanceof lt.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&!1===t.returnValue?b:w,this.target=t.target&&3===t.target.nodeType?t.target.parentNode:t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget):this.type=t,e&&lt.extend(this,e),this.timeStamp=t&&t.timeStamp||lt.now(),void(this[lt.expando]=!0)):new lt.Event(t,e)},lt.Event.prototype={constructor:lt.Event,isDefaultPrevented:w,isPropagationStopped:w,isImmediatePropagationStopped:w,isSimulated:!1,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=b,t&&!this.isSimulated&&t.preventDefault()},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=b,t&&!this.isSimulated&&t.stopPropagation()},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=b,t&&!this.isSimulated&&t.stopImmediatePropagation(),this.stopPropagation()}},lt.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(t){var e=t.button;return null==t.which&&Bt.test(t.type)?null!=t.charCode?t.charCode:t.keyCode:!t.which&&void 0!==e&&Ut.test(t.type)?1&e?1:2&e?3:4&e?2:0:t.which}},lt.event.addProp),lt.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){lt.event.special[t]={delegateType:e,bindType:e,handle:function(t){var n,i=t.relatedTarget,o=t.handleObj;return i&&(i===this||lt.contains(this,i))||(t.type=o.origType,n=o.handler.apply(this,arguments),t.type=e),n}}}),lt.fn.extend({on:function(t,e,n,i){return T(this,t,e,n,i)},one:function(t,e,n,i){return T(this,t,e,n,i,1)},off:function(t,e,n){var i,o;if(t&&t.preventDefault&&t.handleObj)return i=t.handleObj,lt(t.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof t){for(o in t)this.off(o,e,t[o]);return this}return!1!==e&&"function"!=typeof e||(n=e,e=void 0),!1===n&&(n=w),this.each(function(){lt.event.remove(this,t,n,e)})}});var Vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Xt=/<script|<style|<link/i,Gt=/checked\s*(?:[^=]|=\s*.checked.)/i,Qt=/^true\/(.*)/,Kt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;lt.extend({htmlPrefilter:function(t){return t.replace(Vt,"<$1></$2>")},clone:function(t,e,n){var i,o,r,s,a=t.cloneNode(!0),l=lt.contains(t.ownerDocument,t);if(!(st.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||lt.isXMLDoc(t)))for(s=g(a),r=g(t),i=0,o=r.length;i<o;i++)k(r[i],s[i]);if(e)if(n)for(r=r||g(t),s=s||g(a),i=0,o=r.length;i<o;i++)_(r[i],s[i]);else _(t,a);return(s=g(a,"script")).length>0&&v(s,!l&&g(t,"script")),a},cleanData:function(t){for(var e,n,i,o=lt.event.special,r=0;void 0!==(n=t[r]);r++)if(kt(n)){if(e=n[At.expando]){if(e.events)for(i in e.events)o[i]?lt.event.remove(n,i):lt.removeEvent(n,i,e.handle);n[At.expando]=void 0}n[It.expando]&&(n[It.expando]=void 0)}}}),lt.fn.extend({detach:function(t){return I(this,t,!0)},remove:function(t){return I(this,t)},text:function(t){return _t(this,function(t){return void 0===t?lt.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=t)})},null,t,arguments.length)},append:function(){return A(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){S(this,t).appendChild(t)}})},prepend:function(){return A(this,arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=S(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return A(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return A(this,arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},empty:function(){for(var t,e=0;null!=(t=this[e]);e++)1===t.nodeType&&(lt.cleanData(g(t,!1)),t.textContent="");return this},clone:function(t,e){return t=null!=t&&t,e=null==e?t:e,this.map(function(){return lt.clone(this,t,e)})},html:function(t){return _t(this,function(t){var e=this[0]||{},n=0,i=this.length;if(void 0===t&&1===e.nodeType)return e.innerHTML;if("string"==typeof t&&!Xt.test(t)&&!Ft[(Rt.exec(t)||["",""])[1].toLowerCase()]){t=lt.htmlPrefilter(t);try{for(;n<i;n++)1===(e=this[n]||{}).nodeType&&(lt.cleanData(g(e,!1)),e.innerHTML=t);e=0}catch(t){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=[];return A(this,arguments,function(e){var n=this.parentNode;lt.inArray(this,t)<0&&(lt.cleanData(g(this)),n&&n.replaceChild(e,this))},t)}}),lt.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){lt.fn[t]=function(t){for(var n,i=[],o=lt(t),r=o.length-1,s=0;s<=r;s++)n=s===r?this:this.clone(!0),lt(o[s])[e](n),J.apply(i,n.get());return this.pushStack(i)}});var Zt=/^margin/,Jt=new RegExp("^("+Lt+")(?!px)[a-z%]+$","i"),te=function(e){var n=e.ownerDocument.defaultView;return n&&n.opener||(n=t),n.getComputedStyle(e)};!function(){function e(){if(a){a.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",a.innerHTML="",qt.appendChild(s);var e=t.getComputedStyle(a);n="1%"!==e.top,r="2px"===e.marginLeft,i="4px"===e.width,a.style.marginRight="50%",o="4px"===e.marginRight,qt.removeChild(s),a=null}}var n,i,o,r,s=G.createElement("div"),a=G.createElement("div");a.style&&(a.style.backgroundClip="content-box",a.cloneNode(!0).style.backgroundClip="",st.clearCloneStyle="content-box"===a.style.backgroundClip,s.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",s.appendChild(a),lt.extend(st,{pixelPosition:function(){return e(),n},boxSizingReliable:function(){return e(),i},pixelMarginRight:function(){return e(),o},reliableMarginLeft:function(){return e(),r}}))}();var ee=/^(none|table(?!-c[ea]).+)/,ne=/^--/,ie={position:"absolute",visibility:"hidden",display:"block"},oe={letterSpacing:"0",fontWeight:"400"},re=["Webkit","Moz","ms"],se=G.createElement("div").style;lt.extend({cssHooks:{opacity:{get:function(t,e){if(e){var n=O(t,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function(t,e,n,i){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var o,r,s,a=lt.camelCase(e),l=ne.test(e),c=t.style;return l||(e=L(a)),s=lt.cssHooks[e]||lt.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(o=s.get(t,!1,i))?o:c[e]:("string"===(r=typeof n)&&(o=Pt.exec(n))&&o[1]&&(n=h(t,e,o),r="number"),void(null!=n&&n==n&&("number"===r&&(n+=o&&o[3]||(lt.cssNumber[a]?"":"px")),st.clearCloneStyle||""!==n||0!==e.indexOf("background")||(c[e]="inherit"),s&&"set"in s&&void 0===(n=s.set(t,n,i))||(l?c.setProperty(e,n):c[e]=n))))}},css:function(t,e,n,i){var o,r,s,a=lt.camelCase(e);return ne.test(e)||(e=L(a)),(s=lt.cssHooks[e]||lt.cssHooks[a])&&"get"in s&&(o=s.get(t,!0,n)),void 0===o&&(o=O(t,e,i)),"normal"===o&&e in oe&&(o=oe[e]),""===n||n?(r=parseFloat(o),!0===n||isFinite(r)?r||0:o):o}}),lt.each(["height","width"],function(t,e){lt.cssHooks[e]={get:function(t,n,i){if(n)return!ee.test(lt.css(t,"display"))||t.getClientRects().length&&t.getBoundingClientRect().width?N(t,e,i):Ht(t,ie,function(){return N(t,e,i)})},set:function(t,n,i){var o,r=i&&te(t),s=i&&$(t,e,i,"border-box"===lt.css(t,"boxSizing",!1,r),r);return s&&(o=Pt.exec(n))&&"px"!==(o[3]||"px")&&(t.style[e]=n,n=lt.css(t,e)),P(0,n,s)}}}),lt.cssHooks.marginLeft=D(st.reliableMarginLeft,function(t,e){if(e)return(parseFloat(O(t,"marginLeft"))||t.getBoundingClientRect().left-Ht(t,{marginLeft:0},function(){return t.getBoundingClientRect().left}))+"px"}),lt.each({margin:"",padding:"",border:"Width"},function(t,e){lt.cssHooks[t+e]={expand:function(n){for(var i=0,o={},r="string"==typeof n?n.split(" "):[n];i<4;i++)o[t+$t[i]+e]=r[i]||r[i-2]||r[0];return o}},Zt.test(t)||(lt.cssHooks[t+e].set=P)}),lt.fn.extend({css:function(t,e){return _t(this,function(t,e,n){var i,o,r={},s=0;if(Array.isArray(e)){for(i=te(t),o=e.length;s<o;s++)r[e[s]]=lt.css(t,e[s],!1,i);return r}return void 0!==n?lt.style(t,e,n):lt.css(t,e)},t,e,arguments.length>1)}}),lt.Tween=H,(H.prototype={constructor:H,init:function(t,e,n,i,o,r){this.elem=t,this.prop=n,this.easing=o||lt.easing._default,this.options=e,this.start=this.now=this.cur(),this.end=i,this.unit=r||(lt.cssNumber[n]?"":"px")},cur:function(){var t=H.propHooks[this.prop];return t&&t.get?t.get(this):H.propHooks._default.get(this)},run:function(t){var e,n=H.propHooks[this.prop];return this.options.duration?this.pos=e=lt.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):this.pos=e=t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):H.propHooks._default.set(this),this}}).init.prototype=H.prototype,(H.propHooks={_default:{get:function(t){var e;return 1!==t.elem.nodeType||null!=t.elem[t.prop]&&null==t.elem.style[t.prop]?t.elem[t.prop]:(e=lt.css(t.elem,t.prop,""))&&"auto"!==e?e:0},set:function(t){lt.fx.step[t.prop]?lt.fx.step[t.prop](t):1!==t.elem.nodeType||null==t.elem.style[lt.cssProps[t.prop]]&&!lt.cssHooks[t.prop]?t.elem[t.prop]=t.now:lt.style(t.elem,t.prop,t.now+t.unit)}}}).scrollTop=H.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},lt.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2},_default:"swing"},lt.fx=H.prototype.init,lt.fx.step={};var ae,le,ce=/^(?:toggle|show|hide)$/,ue=/queueHooks$/;lt.Animation=lt.extend(F,{tweeners:{"*":[function(t,e){var n=this.createTween(t,e);return h(n.elem,t,Pt.exec(e),n),n}]},tweener:function(t,e){lt.isFunction(t)?(e=t,t=["*"]):t=t.match(St);for(var n,i=0,o=t.length;i<o;i++)n=t[i],F.tweeners[n]=F.tweeners[n]||[],F.tweeners[n].unshift(e)},prefilters:[function(t,e,n){var i,o,r,s,a,l,c,u,d="width"in e||"height"in e,p=this,h={},f=t.style,g=t.nodeType&&Nt(t),v=At.get(t,"fxshow");n.queue||(null==(s=lt._queueHooks(t,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,p.always(function(){p.always(function(){s.unqueued--,lt.queue(t,"fx").length||s.empty.fire()})}));for(i in e)if(o=e[i],ce.test(o)){if(delete e[i],r=r||"toggle"===o,o===(g?"hide":"show")){if("show"!==o||!v||void 0===v[i])continue;g=!0}h[i]=v&&v[i]||lt.style(t,i)}if((l=!lt.isEmptyObject(e))||!lt.isEmptyObject(h)){d&&1===t.nodeType&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],null==(c=v&&v.display)&&(c=At.get(t,"display")),"none"===(u=lt.css(t,"display"))&&(c?u=c:(m([t],!0),c=t.style.display||c,u=lt.css(t,"display"),m([t]))),("inline"===u||"inline-block"===u&&null!=c)&&"none"===lt.css(t,"float")&&(l||(p.done(function(){f.display=c}),null==c&&(u=f.display,c="none"===u?"":u)),f.display="inline-block")),n.overflow&&(f.overflow="hidden",p.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]})),l=!1;for(i in h)l||(v?"hidden"in v&&(g=v.hidden):v=At.access(t,"fxshow",{display:c}),r&&(v.hidden=!g),g&&m([t],!0),p.done(function(){g||m([t]),At.remove(t,"fxshow");for(i in h)lt.style(t,i,h[i])})),l=W(g?v[i]:0,i,p),i in v||(v[i]=l.start,g&&(l.end=l.start,l.start=0))}}],prefilter:function(t,e){e?F.prefilters.unshift(t):F.prefilters.push(t)}}),lt.speed=function(t,e,n){var i=t&&"object"==typeof t?lt.extend({},t):{complete:n||!n&&e||lt.isFunction(t)&&t,duration:t,easing:n&&e||e&&!lt.isFunction(e)&&e};return lt.fx.off?i.duration=0:"number"!=typeof i.duration&&(i.duration in lt.fx.speeds?i.duration=lt.fx.speeds[i.duration]:i.duration=lt.fx.speeds._default),null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){lt.isFunction(i.old)&&i.old.call(this),i.queue&&lt.dequeue(this,i.queue)},i},lt.fn.extend({fadeTo:function(t,e,n,i){return this.filter(Nt).css("opacity",0).show().end().animate({opacity:e},t,n,i)},animate:function(t,e,n,i){var o=lt.isEmptyObject(t),r=lt.speed(e,n,i),s=function(){var e=F(this,lt.extend({},t),r);(o||At.get(this,"finish"))&&e.stop(!0)};return s.finish=s,o||!1===r.queue?this.each(s):this.queue(r.queue,s)},stop:function(t,e,n){var i=function(t){var e=t.stop;delete t.stop,e(n)};return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&!1!==t&&this.queue(t||"fx",[]),this.each(function(){var e=!0,o=null!=t&&t+"queueHooks",r=lt.timers,s=At.get(this);if(o)s[o]&&s[o].stop&&i(s[o]);else for(o in s)s[o]&&s[o].stop&&ue.test(o)&&i(s[o]);for(o=r.length;o--;)r[o].elem!==this||null!=t&&r[o].queue!==t||(r[o].anim.stop(n),e=!1,r.splice(o,1));!e&&n||lt.dequeue(this,t)})},finish:function(t){return!1!==t&&(t=t||"fx"),this.each(function(){var e,n=At.get(this),i=n[t+"queue"],o=n[t+"queueHooks"],r=lt.timers,s=i?i.length:0;for(n.finish=!0,lt.queue(this,t,[]),o&&o.stop&&o.stop.call(this,!0),e=r.length;e--;)r[e].elem===this&&r[e].queue===t&&(r[e].anim.stop(!0),r.splice(e,1));for(e=0;e<s;e++)i[e]&&i[e].finish&&i[e].finish.call(this);delete n.finish})}}),lt.each(["toggle","show","hide"],function(t,e){var n=lt.fn[e];lt.fn[e]=function(t,i,o){return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate(R(e,!0),t,i,o)}}),lt.each({slideDown:R("show"),slideUp:R("hide"),slideToggle:R("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){lt.fn[t]=function(t,n,i){return this.animate(e,t,n,i)}}),lt.timers=[],lt.fx.tick=function(){var t,e=0,n=lt.timers;for(ae=lt.now();e<n.length;e++)(t=n[e])()||n[e]!==t||n.splice(e--,1);n.length||lt.fx.stop(),ae=void 0},lt.fx.timer=function(t){lt.timers.push(t),lt.fx.start()},lt.fx.interval=13,lt.fx.start=function(){le||(le=!0,M())},lt.fx.stop=function(){le=null},lt.fx.speeds={slow:600,fast:200,_default:400},lt.fn.delay=function(e,n){return e=lt.fx?lt.fx.speeds[e]||e:e,n=n||"fx",this.queue(n,function(n,i){var o=t.setTimeout(n,e);i.stop=function(){t.clearTimeout(o)}})},function(){var t=G.createElement("input"),e=G.createElement("select").appendChild(G.createElement("option"));t.type="checkbox",st.checkOn=""!==t.value,st.optSelected=e.selected,(t=G.createElement("input")).value="t",t.type="radio",st.radioValue="t"===t.value}();var de,pe=lt.expr.attrHandle;lt.fn.extend({attr:function(t,e){return _t(this,lt.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){lt.removeAttr(this,t)})}}),lt.extend({attr:function(t,e,n){var i,o,r=t.nodeType;if(3!==r&&8!==r&&2!==r)return void 0===t.getAttribute?lt.prop(t,e,n):(1===r&&lt.isXMLDoc(t)||(o=lt.attrHooks[e.toLowerCase()]||(lt.expr.match.bool.test(e)?de:void 0)),void 0!==n?null===n?void lt.removeAttr(t,e):o&&"set"in o&&void 0!==(i=o.set(t,n,e))?i:(t.setAttribute(e,n+""),n):o&&"get"in o&&null!==(i=o.get(t,e))?i:null==(i=lt.find.attr(t,e))?void 0:i)},attrHooks:{type:{set:function(t,e){if(!st.radioValue&&"radio"===e&&o(t,"input")){var n=t.value;return t.setAttribute("type",e),n&&(t.value=n),e}}}},removeAttr:function(t,e){var n,i=0,o=e&&e.match(St);if(o&&1===t.nodeType)for(;n=o[i++];)t.removeAttribute(n)}}),de={set:function(t,e,n){return!1===e?lt.removeAttr(t,n):t.setAttribute(n,n),n}},lt.each(lt.expr.match.bool.source.match(/\w+/g),function(t,e){var n=pe[e]||lt.find.attr;pe[e]=function(t,e,i){var o,r,s=e.toLowerCase();return i||(r=pe[s],pe[s]=o,o=null!=n(t,e,i)?s:null,pe[s]=r),o}});var he=/^(?:input|select|textarea|button)$/i,fe=/^(?:a|area)$/i;lt.fn.extend({prop:function(t,e){return _t(this,lt.prop,t,e,arguments.length>1)},removeProp:function(t){return this.each(function(){delete this[lt.propFix[t]||t]})}}),lt.extend({prop:function(t,e,n){var i,o,r=t.nodeType;if(3!==r&&8!==r&&2!==r)return 1===r&&lt.isXMLDoc(t)||(e=lt.propFix[e]||e,o=lt.propHooks[e]),void 0!==n?o&&"set"in o&&void 0!==(i=o.set(t,n,e))?i:t[e]=n:o&&"get"in o&&null!==(i=o.get(t,e))?i:t[e]},propHooks:{tabIndex:{get:function(t){var e=lt.find.attr(t,"tabindex");return e?parseInt(e,10):he.test(t.nodeName)||fe.test(t.nodeName)&&t.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),st.optSelected||(lt.propHooks.selected={get:function(t){var e=t.parentNode;return e&&e.parentNode&&e.parentNode.selectedIndex,null},set:function(t){var e=t.parentNode;e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex)}}),lt.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){lt.propFix[this.toLowerCase()]=this}),lt.fn.extend({addClass:function(t){var e,n,i,o,r,s,a,l=0;if(lt.isFunction(t))return this.each(function(e){lt(this).addClass(t.call(this,e,q(this)))});if("string"==typeof t&&t)for(e=t.match(St)||[];n=this[l++];)if(o=q(n),i=1===n.nodeType&&" "+z(o)+" "){for(s=0;r=e[s++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ");o!==(a=z(i))&&n.setAttribute("class",a)}return this},removeClass:function(t){var e,n,i,o,r,s,a,l=0;if(lt.isFunction(t))return this.each(function(e){lt(this).removeClass(t.call(this,e,q(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof t&&t)for(e=t.match(St)||[];n=this[l++];)if(o=q(n),i=1===n.nodeType&&" "+z(o)+" "){for(s=0;r=e[s++];)for(;i.indexOf(" "+r+" ")>-1;)i=i.replace(" "+r+" "," ");o!==(a=z(i))&&n.setAttribute("class",a)}return this},toggleClass:function(t,e){var n=typeof t;return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):lt.isFunction(t)?this.each(function(n){lt(this).toggleClass(t.call(this,n,q(this),e),e)}):this.each(function(){var e,i,o,r;if("string"===n)for(i=0,o=lt(this),r=t.match(St)||[];e=r[i++];)o.hasClass(e)?o.removeClass(e):o.addClass(e);else void 0!==t&&"boolean"!==n||((e=q(this))&&At.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===t?"":At.get(this,"__className__")||""))})},hasClass:function(t){var e,n,i=0;for(e=" "+t+" ";n=this[i++];)if(1===n.nodeType&&(" "+z(q(n))+" ").indexOf(e)>-1)return!0;return!1}});var me=/\r/g;lt.fn.extend({val:function(t){var e,n,i,o=this[0];return arguments.length?(i=lt.isFunction(t),this.each(function(n){var o;1===this.nodeType&&(null==(o=i?t.call(this,n,lt(this).val()):t)?o="":"number"==typeof o?o+="":Array.isArray(o)&&(o=lt.map(o,function(t){return null==t?"":t+""})),(e=lt.valHooks[this.type]||lt.valHooks[this.nodeName.toLowerCase()])&&"set"in e&&void 0!==e.set(this,o,"value")||(this.value=o))})):o?(e=lt.valHooks[o.type]||lt.valHooks[o.nodeName.toLowerCase()])&&"get"in e&&void 0!==(n=e.get(o,"value"))?n:"string"==typeof(n=o.value)?n.replace(me,""):null==n?"":n:void 0}}),lt.extend({valHooks:{option:{get:function(t){var e=lt.find.attr(t,"value");return null!=e?e:z(lt.text(t))}},select:{get:function(t){var e,n,i,r=t.options,s=t.selectedIndex,a="select-one"===t.type,l=a?null:[],c=a?s+1:r.length;for(i=s<0?c:a?s:0;i<c;i++)if(((n=r[i]).selected||i===s)&&!n.disabled&&(!n.parentNode.disabled||!o(n.parentNode,"optgroup"))){if(e=lt(n).val(),a)return e;l.push(e)}return l},set:function(t,e){for(var n,i,o=t.options,r=lt.makeArray(e),s=o.length;s--;)i=o[s],(i.selected=lt.inArray(lt.valHooks.option.get(i),r)>-1)&&(n=!0);return n||(t.selectedIndex=-1),r}}}}),lt.each(["radio","checkbox"],function(){lt.valHooks[this]={set:function(t,e){if(Array.isArray(e))return t.checked=lt.inArray(lt(t).val(),e)>-1}},st.checkOn||(lt.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var ge=/^(?:focusinfocus|focusoutblur)$/;lt.extend(lt.event,{trigger:function(e,n,i,o){var r,s,a,l,c,u,d,p=[i||G],h=it.call(e,"type")?e.type:e,f=it.call(e,"namespace")?e.namespace.split("."):[];if(s=a=i=i||G,3!==i.nodeType&&8!==i.nodeType&&!ge.test(h+lt.event.triggered)&&(h.indexOf(".")>-1&&(f=h.split("."),h=f.shift(),f.sort()),c=h.indexOf(":")<0&&"on"+h,e=e[lt.expando]?e:new lt.Event(h,"object"==typeof e&&e),e.isTrigger=o?2:3,e.namespace=f.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=i),n=null==n?[e]:lt.makeArray(n,[e]),d=lt.event.special[h]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!lt.isWindow(i)){for(l=d.delegateType||h,ge.test(l+h)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(i.ownerDocument||G)&&p.push(a.defaultView||a.parentWindow||t)}for(r=0;(s=p[r++])&&!e.isPropagationStopped();)e.type=r>1?l:d.bindType||h,(u=(At.get(s,"events")||{})[e.type]&&At.get(s,"handle"))&&u.apply(s,n),(u=c&&s[c])&&u.apply&&kt(s)&&(e.result=u.apply(s,n),!1===e.result&&e.preventDefault());return e.type=h,o||e.isDefaultPrevented()||d._default&&!1!==d._default.apply(p.pop(),n)||!kt(i)||c&&lt.isFunction(i[h])&&!lt.isWindow(i)&&((a=i[c])&&(i[c]=null),lt.event.triggered=h,i[h](),lt.event.triggered=void 0,a&&(i[c]=a)),e.result}},simulate:function(t,e,n){var i=lt.extend(new lt.Event,n,{type:t,isSimulated:!0});lt.event.trigger(i,null,e)}}),lt.fn.extend({trigger:function(t,e){return this.each(function(){lt.event.trigger(t,e,this)})},triggerHandler:function(t,e){var n=this[0];if(n)return lt.event.trigger(t,e,n,!0)}}),lt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(t,e){lt.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e)}}),lt.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)}}),st.focusin="onfocusin"in t,st.focusin||lt.each({focus:"focusin",blur:"focusout"},function(t,e){var n=function(t){lt.event.simulate(e,t.target,lt.event.fix(t))};lt.event.special[e]={setup:function(){var i=this.ownerDocument||this,o=At.access(i,e);o||i.addEventListener(t,n,!0),At.access(i,e,(o||0)+1)},teardown:function(){var i=this.ownerDocument||this,o=At.access(i,e)-1;o?At.access(i,e,o):(i.removeEventListener(t,n,!0),At.remove(i,e))}}});var ve=t.location,ye=lt.now(),be=/\?/;lt.parseXML=function(e){var n;if(!e||"string"!=typeof e)return null;try{n=(new t.DOMParser).parseFromString(e,"text/xml")}catch(t){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||lt.error("Invalid XML: "+e),n};var we=/\[\]$/,xe=/\r?\n/g,Te=/^(?:submit|button|image|reset|file)$/i,Se=/^(?:input|select|textarea|keygen)/i;lt.param=function(t,e){var n,i=[],o=function(t,e){var n=lt.isFunction(e)?e():e;i[i.length]=encodeURIComponent(t)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(t)||t.jquery&&!lt.isPlainObject(t))lt.each(t,function(){o(this.name,this.value)});else for(n in t)B(n,t[n],e,o);return i.join("&")},lt.fn.extend({serialize:function(){return lt.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=lt.prop(this,"elements");return t?lt.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!lt(this).is(":disabled")&&Se.test(this.nodeName)&&!Te.test(t)&&(this.checked||!jt.test(t))}).map(function(t,e){var n=lt(this).val();return null==n?null:Array.isArray(n)?lt.map(n,function(t){return{name:e.name,value:t.replace(xe,"\r\n")}}):{name:e.name,value:n.replace(xe,"\r\n")}}).get()}});var Ce=/%20/g,Ee=/#.*$/,_e=/([?&])_=[^&]*/,ke=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ae=/^(?:GET|HEAD)$/,Ie=/^\/\//,Oe={},De={},Le="*/".concat("*"),Pe=G.createElement("a");Pe.href=ve.href,lt.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ve.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ve.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Le,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":lt.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?V(V(t,lt.ajaxSettings),e):V(lt.ajaxSettings,t)},ajaxPrefilter:U(Oe),ajaxTransport:U(De),ajax:function(e,n){function i(e,n,i,a){var c,p,h,w,x,T=n;u||(u=!0,l&&t.clearTimeout(l),o=void 0,s=a||"",S.readyState=e>0?4:0,c=e>=200&&e<300||304===e,i&&(w=function(t,e,n){for(var i,o,r,s,a=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=t.mimeType||e.getResponseHeader("Content-Type"));if(i)for(o in a)if(a[o]&&a[o].test(i)){l.unshift(o);break}if(l[0]in n)r=l[0];else{for(o in n){if(!l[0]||t.converters[o+" "+l[0]]){r=o;break}s||(s=o)}r=r||s}if(r)return r!==l[0]&&l.unshift(r),n[r]}(f,S,i)),w=function(t,e,n,i){var o,r,s,a,l,c={},u=t.dataTypes.slice();if(u[1])for(s in t.converters)c[s.toLowerCase()]=t.converters[s];for(r=u.shift();r;)if(t.responseFields[r]&&(n[t.responseFields[r]]=e),!l&&i&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=r,r=u.shift())if("*"===r)r=l;else if("*"!==l&&l!==r){if(!(s=c[l+" "+r]||c["* "+r]))for(o in c)if((a=o.split(" "))[1]===r&&(s=c[l+" "+a[0]]||c["* "+a[0]])){!0===s?s=c[o]:!0!==c[o]&&(r=a[0],u.unshift(a[1]));break}if(!0!==s)if(s&&t.throws)e=s(e);else try{e=s(e)}catch(t){return{state:"parsererror",error:s?t:"No conversion from "+l+" to "+r}}}return{state:"success",data:e}}(f,w,S,c),c?(f.ifModified&&((x=S.getResponseHeader("Last-Modified"))&&(lt.lastModified[r]=x),(x=S.getResponseHeader("etag"))&&(lt.etag[r]=x)),204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=w.state,p=w.data,h=w.error,c=!h)):(h=T,!e&&T||(T="error",e<0&&(e=0))),S.status=e,S.statusText=(n||T)+"",c?v.resolveWith(m,[p,T,S]):v.rejectWith(m,[S,T,h]),S.statusCode(b),b=void 0,d&&g.trigger(c?"ajaxSuccess":"ajaxError",[S,f,c?p:h]),y.fireWith(m,[S,T]),d&&(g.trigger("ajaxComplete",[S,f]),--lt.active||lt.event.trigger("ajaxStop")))}"object"==typeof e&&(n=e,e=void 0),n=n||{};var o,r,s,a,l,c,u,d,p,h,f=lt.ajaxSetup({},n),m=f.context||f,g=f.context&&(m.nodeType||m.jquery)?lt(m):lt.event,v=lt.Deferred(),y=lt.Callbacks("once memory"),b=f.statusCode||{},w={},x={},T="canceled",S={readyState:0,getResponseHeader:function(t){var e;if(u){if(!a)for(a={};e=ke.exec(s);)a[e[1].toLowerCase()]=e[2];e=a[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return u?s:null},setRequestHeader:function(t,e){return null==u&&(t=x[t.toLowerCase()]=x[t.toLowerCase()]||t,w[t]=e),this},overrideMimeType:function(t){return null==u&&(f.mimeType=t),this},statusCode:function(t){var e;if(t)if(u)S.always(t[S.status]);else for(e in t)b[e]=[b[e],t[e]];return this},abort:function(t){var e=t||T;return o&&o.abort(e),i(0,e),this}};if(v.promise(S),f.url=((e||f.url||ve.href)+"").replace(Ie,ve.protocol+"//"),f.type=n.method||n.type||f.method||f.type,f.dataTypes=(f.dataType||"*").toLowerCase().match(St)||[""],null==f.crossDomain){c=G.createElement("a");try{c.href=f.url,c.href=c.href,f.crossDomain=Pe.protocol+"//"+Pe.host!=c.protocol+"//"+c.host}catch(t){f.crossDomain=!0}}if(f.data&&f.processData&&"string"!=typeof f.data&&(f.data=lt.param(f.data,f.traditional)),Y(Oe,f,n,S),u)return S;(d=lt.event&&f.global)&&0==lt.active++&&lt.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!Ae.test(f.type),r=f.url.replace(Ee,""),f.hasContent?f.data&&f.processData&&0===(f.contentType||"").indexOf("application/x-www-form-urlencoded")&&(f.data=f.data.replace(Ce,"+")):(h=f.url.slice(r.length),f.data&&(r+=(be.test(r)?"&":"?")+f.data,delete f.data),!1===f.cache&&(r=r.replace(_e,"$1"),h=(be.test(r)?"&":"?")+"_="+ye+++h),f.url=r+h),f.ifModified&&(lt.lastModified[r]&&S.setRequestHeader("If-Modified-Since",lt.lastModified[r]),lt.etag[r]&&S.setRequestHeader("If-None-Match",lt.etag[r])),(f.data&&f.hasContent&&!1!==f.contentType||n.contentType)&&S.setRequestHeader("Content-Type",f.contentType),S.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+Le+"; q=0.01":""):f.accepts["*"]);for(p in f.headers)S.setRequestHeader(p,f.headers[p]);if(f.beforeSend&&(!1===f.beforeSend.call(m,S,f)||u))return S.abort();if(T="abort",y.add(f.complete),S.done(f.success),S.fail(f.error),o=Y(De,f,n,S)){if(S.readyState=1,d&&g.trigger("ajaxSend",[S,f]),u)return S;f.async&&f.timeout>0&&(l=t.setTimeout(function(){S.abort("timeout")},f.timeout));try{u=!1,o.send(w,i)}catch(t){if(u)throw t;i(-1,t)}}else i(-1,"No Transport");return S},getJSON:function(t,e,n){return lt.get(t,e,n,"json")},getScript:function(t,e){return lt.get(t,void 0,e,"script")}}),lt.each(["get","post"],function(t,e){lt[e]=function(t,n,i,o){return lt.isFunction(n)&&(o=o||i,i=n,n=void 0),lt.ajax(lt.extend({url:t,type:e,dataType:o,data:n,success:i},lt.isPlainObject(t)&&t))}}),lt._evalUrl=function(t){return lt.ajax({url:t,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},lt.fn.extend({wrapAll:function(t){var e;return this[0]&&(lt.isFunction(t)&&(t=t.call(this[0])),e=lt(t,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstElementChild;)t=t.firstElementChild;return t}).append(this)),this},wrapInner:function(t){return lt.isFunction(t)?this.each(function(e){lt(this).wrapInner(t.call(this,e))}):this.each(function(){var e=lt(this),n=e.contents();n.length?n.wrapAll(t):e.append(t)})},wrap:function(t){var e=lt.isFunction(t);return this.each(function(n){lt(this).wrapAll(e?t.call(this,n):t)})},unwrap:function(t){return this.parent(t).not("body").each(function(){lt(this).replaceWith(this.childNodes)}),this}}),lt.expr.pseudos.hidden=function(t){return!lt.expr.pseudos.visible(t)},lt.expr.pseudos.visible=function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)},lt.ajaxSettings.xhr=function(){try{return new t.XMLHttpRequest}catch(t){}};var $e={0:200,1223:204},Ne=lt.ajaxSettings.xhr();st.cors=!!Ne&&"withCredentials"in Ne,st.ajax=Ne=!!Ne,lt.ajaxTransport(function(e){var n,i;if(st.cors||Ne&&!e.crossDomain)return{send:function(o,r){var s,a=e.xhr();if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)a[s]=e.xhrFields[s];e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||o["X-Requested-With"]||(o["X-Requested-With"]="XMLHttpRequest");for(s in o)a.setRequestHeader(s,o[s]);n=function(t){return function(){n&&(n=i=a.onload=a.onerror=a.onabort=a.onreadystatechange=null,"abort"===t?a.abort():"error"===t?"number"!=typeof a.status?r(0,"error"):r(a.status,a.statusText):r($e[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=n(),i=a.onerror=n("error"),void 0!==a.onabort?a.onabort=i:a.onreadystatechange=function(){4===a.readyState&&t.setTimeout(function(){n&&i()})},n=n("abort");try{a.send(e.hasContent&&e.data||null)}catch(t){if(n)throw t}},abort:function(){n&&n()}}}),lt.ajaxPrefilter(function(t){t.crossDomain&&(t.contents.script=!1)}),lt.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(t){return lt.globalEval(t),t}}}),lt.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET")}),lt.ajaxTransport("script",function(t){if(t.crossDomain){var e,n;return{send:function(i,o){e=lt("<script>").prop({charset:t.scriptCharset,src:t.url}).on("load error",n=function(t){e.remove(),n=null,t&&o("error"===t.type?404:200,t.type)}),G.head.appendChild(e[0])},abort:function(){n&&n()}}}});var He=[],Me=/(=)\?(?=&|$)|\?\?/;lt.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=He.pop()||lt.expando+"_"+ye++;return this[t]=!0,t}}),lt.ajaxPrefilter("json jsonp",function(e,n,i){var o,r,s,a=!1!==e.jsonp&&(Me.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Me.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return o=e.jsonpCallback=lt.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Me,"$1"+o):!1!==e.jsonp&&(e.url+=(be.test(e.url)?"&":"?")+e.jsonp+"="+o),e.converters["script json"]=function(){return s||lt.error(o+" was not called"),s[0]},e.dataTypes[0]="json",r=t[o],t[o]=function(){s=arguments},i.always(function(){void 0===r?lt(t).removeProp(o):t[o]=r,e[o]&&(e.jsonpCallback=n.jsonpCallback,He.push(o)),s&&lt.isFunction(r)&&r(s[0]),s=r=void 0}),"script"}),st.createHTMLDocument=function(){var t=G.implementation.createHTMLDocument("").body;return t.innerHTML="<form></form><form></form>",2===t.childNodes.length}(),lt.parseHTML=function(t,e,n){if("string"!=typeof t)return[];"boolean"==typeof e&&(n=e,e=!1);var i,o,r;return e||(st.createHTMLDocument?(e=G.implementation.createHTMLDocument(""),i=e.createElement("base"),i.href=G.location.href,e.head.appendChild(i)):e=G),o=vt.exec(t),r=!n&&[],o?[e.createElement(o[1])]:(o=y([t],e,r),r&&r.length&&lt(r).remove(),lt.merge([],o.childNodes))},lt.fn.load=function(t,e,n){var i,o,r,s=this,a=t.indexOf(" ");return a>-1&&(i=z(t.slice(a)),t=t.slice(0,a)),lt.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(o="POST"),s.length>0&&lt.ajax({url:t,type:o||"GET",dataType:"html",data:e}).done(function(t){r=arguments,s.html(i?lt("<div>").append(lt.parseHTML(t)).find(i):t)}).always(n&&function(t,e){s.each(function(){n.apply(this,r||[t.responseText,e,t])})}),this},lt.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){lt.fn[e]=function(t){return this.on(e,t)}}),lt.expr.pseudos.animated=function(t){return lt.grep(lt.timers,function(e){return t===e.elem}).length},lt.offset={setOffset:function(t,e,n){var i,o,r,s,a,l,c=lt.css(t,"position"),u=lt(t),d={};"static"===c&&(t.style.position="relative"),a=u.offset(),r=lt.css(t,"top"),l=lt.css(t,"left"),("absolute"===c||"fixed"===c)&&(r+l).indexOf("auto")>-1?(i=u.position(),s=i.top,o=i.left):(s=parseFloat(r)||0,o=parseFloat(l)||0),lt.isFunction(e)&&(e=e.call(t,n,lt.extend({},a))),null!=e.top&&(d.top=e.top-a.top+s),null!=e.left&&(d.left=e.left-a.left+o),"using"in e?e.using.call(t,d):u.css(d)}},lt.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){lt.offset.setOffset(this,t,e)});var e,n,i,o,r=this[0];return r?r.getClientRects().length?(i=r.getBoundingClientRect(),e=r.ownerDocument,n=e.documentElement,o=e.defaultView,{top:i.top+o.pageYOffset-n.clientTop,left:i.left+o.pageXOffset-n.clientLeft}):{top:0,left:0}:void 0},position:function(){if(this[0]){var t,e,n=this[0],i={top:0,left:0};return"fixed"===lt.css(n,"position")?e=n.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),o(t[0],"html")||(i=t.offset()),i={top:i.top+lt.css(t[0],"borderTopWidth",!0),left:i.left+lt.css(t[0],"borderLeftWidth",!0)}),{top:e.top-i.top-lt.css(n,"marginTop",!0),left:e.left-i.left-lt.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent;t&&"static"===lt.css(t,"position");)t=t.offsetParent;return t||qt})}}),lt.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var n="pageYOffset"===e;lt.fn[t]=function(i){return _t(this,function(t,i,o){var r;return lt.isWindow(t)?r=t:9===t.nodeType&&(r=t.defaultView),void 0===o?r?r[e]:t[i]:void(r?r.scrollTo(n?r.pageXOffset:o,n?o:r.pageYOffset):t[i]=o)},t,i,arguments.length)}}),lt.each(["top","left"],function(t,e){lt.cssHooks[e]=D(st.pixelPosition,function(t,n){if(n)return n=O(t,e),Jt.test(n)?lt(t).position()[e]+"px":n})}),lt.each({Height:"height",Width:"width"},function(t,e){lt.each({padding:"inner"+t,content:e,"":"outer"+t},function(n,i){lt.fn[i]=function(o,r){var s=arguments.length&&(n||"boolean"!=typeof o),a=n||(!0===o||!0===r?"margin":"border");return _t(this,function(e,n,o){var r;return lt.isWindow(e)?0===i.indexOf("outer")?e["inner"+t]:e.document.documentElement["client"+t]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+t],r["scroll"+t],e.body["offset"+t],r["offset"+t],r["client"+t])):void 0===o?lt.css(e,n,a):lt.style(e,n,o,a)},e,s?o:void 0,s)}})}),lt.fn.extend({bind:function(t,e,n){return this.on(t,null,e,n)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,n,i){return this.on(e,t,n,i)},undelegate:function(t,e,n){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)}}),lt.holdReady=function(t){t?lt.readyWait++:lt.ready(!0)},lt.isArray=Array.isArray,lt.parseJSON=JSON.parse,lt.nodeName=o,"function"==typeof define&&define.amd&&define("jquery",[],function(){return lt});var je=t.jQuery,Re=t.$;return lt.noConflict=function(e){return t.$===lt&&(t.$=Re),e&&t.jQuery===lt&&(t.jQuery=je),lt},e||(t.jQuery=t.$=lt),lt}),function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Popper=e()}(this,function(){"use strict";function t(t){return t&&"[object Function]"==={}.toString.call(t)}function e(t,e){if(1!==t.nodeType)return[];var n=window.getComputedStyle(t,null);return e?n[e]:n}function n(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function i(t){if(!t||-1!==["HTML","BODY","#document"].indexOf(t.nodeName))return window.document.body;var o=e(t),r=o.overflow,s=o.overflowX,a=o.overflowY;return/(auto|scroll)/.test(r+a+s)?t:i(n(t))}function o(t){var n=t&&t.offsetParent,i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TD","TABLE"].indexOf(n.nodeName)&&"static"===e(n,"position")?o(n):n:window.document.documentElement}function r(t){return null===t.parentNode?t:r(t.parentNode)}function s(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return window.document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,a=n?e:t,l=document.createRange();l.setStart(i,0),l.setEnd(a,0);var c=l.commonAncestorContainer;if(t!==c&&e!==c||i.contains(a))return function(t){var e=t.nodeName;return"BODY"!==e&&("HTML"===e||o(t.firstElementChild)===t)}(c)?c:o(c);var u=r(t);return u.host?s(u.host,e):s(t,r(e).host)}function a(t){var e="top"===(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"===n||"HTML"===n){var i=window.document.documentElement;return(window.document.scrollingElement||i)[e]}return t[e]}function l(t,e){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=a(e,"top"),o=a(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}function c(t,e){var n="x"===e?"Left":"Top",i="Left"==n?"Right":"Bottom";return+t["border"+n+"Width"].split("px")[0]+ +t["border"+i+"Width"].split("px")[0]}function u(t,e,n,i){return M(e["offset"+t],n["client"+t],n["offset"+t],U()?n["offset"+t]+i["margin"+("Height"===t?"Top":"Left")]+i["margin"+("Height"===t?"Bottom":"Right")]:0)}function d(){var t=window.document.body,e=window.document.documentElement,n=U()&&window.getComputedStyle(e);return{height:u("Height",t,e,n),width:u("Width",t,e,n)}}function p(t){return G({},t,{right:t.left+t.width,bottom:t.top+t.height})}function h(t){var n={};if(U())try{n=t.getBoundingClientRect();var i=a(t,"top"),o=a(t,"left");n.top+=i,n.left+=o,n.bottom+=i,n.right+=o}catch(t){}else n=t.getBoundingClientRect();var r={left:n.left,top:n.top,width:n.right-n.left,height:n.bottom-n.top},s="HTML"===t.nodeName?d():{},l=s.width||t.clientWidth||r.right-r.left,u=s.height||t.clientHeight||r.bottom-r.top,h=t.offsetWidth-l,f=t.offsetHeight-u;if(h||f){var m=e(t);h-=c(m,"x"),f-=c(m,"y"),r.width-=h,r.height-=f}return p(r)}function f(t,n){var o=U(),r="HTML"===n.nodeName,s=h(t),a=h(n),c=i(t),u=e(n),d=+u.borderTopWidth.split("px")[0],f=+u.borderLeftWidth.split("px")[0],m=p({top:s.top-a.top-d,left:s.left-a.left-f,width:s.width,height:s.height});if(m.marginTop=0,m.marginLeft=0,!o&&r){var g=+u.marginTop.split("px")[0],v=+u.marginLeft.split("px")[0];m.top-=d-g,m.bottom-=d-g,m.left-=f-v,m.right-=f-v,m.marginTop=g,m.marginLeft=v}return(o?n.contains(c):n===c&&"BODY"!==c.nodeName)&&(m=l(m,n)),m}function m(t){var e=window.document.documentElement,n=f(t,e),i=M(e.clientWidth,window.innerWidth||0),o=M(e.clientHeight,window.innerHeight||0),r=a(e),s=a(e,"left");return p({top:r-n.top+n.marginTop,left:s-n.left+n.marginLeft,width:i,height:o})}function g(t){var i=t.nodeName;return"BODY"!==i&&"HTML"!==i&&("fixed"===e(t,"position")||g(n(t)))}function v(t,e,o,r){var a={top:0,left:0},l=s(t,e);if("viewport"===r)a=m(l);else{var c;"scrollParent"===r?"BODY"===(c=i(n(t))).nodeName&&(c=window.document.documentElement):c="window"===r?window.document.documentElement:r;var u=f(c,l);if("HTML"!==c.nodeName||g(l))a=u;else{var p=d(),h=p.height,v=p.width;a.top+=u.top-u.marginTop,a.bottom=h+u.top,a.left+=u.left-u.marginLeft,a.right=v+u.left}}return a.left+=o,a.top+=o,a.right-=o,a.bottom-=o,a}function y(t,e,n,i,o){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var s=v(n,i,r,o),a={top:{width:s.width,height:e.top-s.top},right:{width:s.right-e.right,height:s.height},bottom:{width:s.width,height:s.bottom-e.bottom},left:{width:e.left-s.left,height:s.height}},l=Object.keys(a).map(function(t){return G({key:t},a[t],{area:function(t){return t.width*t.height}(a[t])})}).sort(function(t,e){return e.area-t.area}),c=l.filter(function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight}),u=0<c.length?c[0].key:l[0].key,d=t.split("-")[1];return u+(d?"-"+d:"")}function b(t,e,n){return f(n,s(e,n))}function w(t){var e=window.getComputedStyle(t),n=parseFloat(e.marginTop)+parseFloat(e.marginBottom),i=parseFloat(e.marginLeft)+parseFloat(e.marginRight);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function x(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function T(t,e,n){n=n.split("-")[0];var i=w(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),s=r?"top":"left",a=r?"left":"top",l=r?"height":"width",c=r?"width":"height";return o[s]=e[s]+e[l]/2-i[l]/2,o[a]=n===a?e[a]-i[c]:e[x(a)],o}function S(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function C(e,n,i){return(void 0===i?e:e.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var i=S(t,function(t){return t[e]===n});return t.indexOf(i)}(e,"name",i))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var i=e.function||e.fn;e.enabled&&t(i)&&(n.offsets.popper=p(n.offsets.popper),n.offsets.reference=p(n.offsets.reference),n=i(n,e))}),n}function E(t,e){return t.some(function(t){var n=t.name;return t.enabled&&n===e})}function _(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length-1;i++){var o=e[i],r=o?""+o+n:t;if(void 0!==window.document.body.style[r])return r}return null}function k(t,e,n,o){var r="BODY"===t.nodeName,s=r?window:t;s.addEventListener(e,n,{passive:!0}),r||k(i(s.parentNode),e,n,o),o.push(s)}function A(){this.state.eventsEnabled||(this.state=function(t,e,n,o){n.updateBound=o,window.addEventListener("resize",n.updateBound,{passive:!0});var r=i(t);return k(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}(this.reference,this.options,this.state,this.scheduleUpdate))}function I(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=function(t,e){return window.removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e}(this.reference,this.state))}function O(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function D(t,e){Object.keys(e).forEach(function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&O(e[n])&&(i="px"),t.style[n]=e[n]+i})}function L(t,e,n){var i=S(t,function(t){return t.name===e}),o=!!i&&t.some(function(t){return t.name===n&&t.enabled&&t.order<i.order});if(!o){var r="`"+e+"`";console.warn("`"+n+"` modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}function P(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=K.indexOf(t),i=K.slice(n+1).concat(K.slice(0,n));return e?i.reverse():i}function $(t,e,n,i){var o=[0,0],r=-1!==["right","left"].indexOf(i),s=t.split(/(\+|\-)/).map(function(t){return t.trim()}),a=s.indexOf(S(s,function(t){return-1!==t.search(/,|\s/)}));s[a]&&-1===s[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1===a?[s]:[s.slice(0,a).concat([s[a].split(l)[0]]),[s[a].split(l)[1]].concat(s.slice(a+1))];return(c=c.map(function(t,i){var o=(1===i?!r:r)?"height":"width",s=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,s=!0,t):s?(t[t.length-1]+=e,s=!1,t):t.concat(e)},[]).map(function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],s=o[2];if(!r)return t;if(0===s.indexOf("%")){var a;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return p(a)[e]/100*r}if("vh"===s||"vw"===s)return("vh"===s?M(document.documentElement.clientHeight,window.innerHeight||0):M(document.documentElement.clientWidth,window.innerWidth||0))/100*r;return r}(t,o,e,n)})})).forEach(function(t,e){t.forEach(function(n,i){O(n)&&(o[e]+=n*("-"===t[i-1]?-1:1))})}),o}for(var N=Math.min,H=Math.floor,M=Math.max,j=["native code","[object MutationObserverConstructor]"],R="undefined"!=typeof window,W=["Edge","Trident","Firefox"],F=0,z=0;z<W.length;z+=1)if(R&&0<=navigator.userAgent.indexOf(W[z])){F=1;break}var q,B=R&&function(t){return j.some(function(e){return-1<(t||"").toString().indexOf(e)})}(window.MutationObserver)?function(t){var e=!1,n=0,i=document.createElement("span");return new MutationObserver(function(){t(),e=!1}).observe(i,{attributes:!0}),function(){e||(e=!0,i.setAttribute("x-index",n),++n)}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},F))}},U=function(){return void 0==q&&(q=-1!==navigator.appVersion.indexOf("MSIE 10")),q},Y=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},V=function(){function t(t,e){for(var n,i=0;i<e.length;i++)n=e[i],n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),X=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},G=Object.assign||function(t){for(var e,n=1;n<arguments.length;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},Q=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],K=Q.slice(3),Z={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"},J=function(){function e(n,i){var o=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};Y(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(o.update)},this.update=B(this.update.bind(this)),this.options=G({},e.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=n.jquery?n[0]:n,this.popper=i.jquery?i[0]:i,this.options.modifiers={},Object.keys(G({},e.Defaults.modifiers,r.modifiers)).forEach(function(t){o.options.modifiers[t]=G({},e.Defaults.modifiers[t]||{},r.modifiers?r.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return G({name:t},o.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(e){e.enabled&&t(e.onLoad)&&e.onLoad(o.reference,o.popper,o.options,e,o.state)}),this.update();var s=this.options.eventsEnabled;s&&this.enableEventListeners(),this.state.eventsEnabled=s}return V(e,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var t={instance:this,styles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=b(this.state,this.popper,this.reference),t.placement=y(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.offsets.popper=T(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position="absolute",t=C(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,E(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[_("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return A.call(this)}},{key:"disableEventListeners",value:function(){return I.call(this)}}]),e}();return J.Utils=("undefined"==typeof window?global:window).PopperUtils,J.placements=Q,J.Defaults={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,s=o.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",u={start:X({},l,r[l]),end:X({},l,r[l]+r[c]-s[c])};t.offsets.popper=G({},s,u[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n,i=e.offset,o=t.placement,r=t.offsets,s=r.popper,a=r.reference,l=o.split("-")[0];return n=O(+i)?[+i,0]:$(i,s,a,l),"left"===l?(s.top+=n[0],s.left-=n[1]):"right"===l?(s.top+=n[0],s.left+=n[1]):"top"===l?(s.left+=n[0],s.top-=n[1]):"bottom"===l&&(s.left+=n[0],s.top+=n[1]),t.popper=s,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||o(t.instance.popper);t.instance.reference===n&&(n=o(n));var i=v(t.instance.popper,t.instance.reference,e.padding,n);e.boundaries=i;var r=e.priority,s=t.offsets.popper,a={primary:function(t){var n=s[t];return s[t]<i[t]&&!e.escapeWithReference&&(n=M(s[t],i[t])),X({},t,n)},secondary:function(t){var n="right"===t?"left":"top",o=s[n];return s[t]>i[t]&&!e.escapeWithReference&&(o=N(s[n],i[t]-("right"===t?s.width:s.height))),X({},n,o)}};return r.forEach(function(t){var e=-1===["left","top"].indexOf(t)?"secondary":"primary";s=G({},s,a[e](t))}),t.offsets.popper=s,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=H,s=-1!==["top","bottom"].indexOf(o),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<r(i[l])&&(t.offsets.popper[l]=r(i[l])-n[c]),n[l]>r(i[a])&&(t.offsets.popper[l]=r(i[a])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){if(!L(t.instance.modifiers,"arrow","keepTogether"))return t;var n=e.element;if("string"==typeof n){if(!(n=t.instance.popper.querySelector(n)))return t}else if(!t.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var i=t.placement.split("-")[0],o=t.offsets,r=o.popper,s=o.reference,a=-1!==["left","right"].indexOf(i),l=a?"height":"width",c=a?"top":"left",u=a?"left":"top",d=a?"bottom":"right",h=w(n)[l];s[d]-h<r[c]&&(t.offsets.popper[c]-=r[c]-(s[d]-h)),s[c]+h>r[d]&&(t.offsets.popper[c]+=s[c]+h-r[d]);var f=s[c]+s[l]/2-h/2-p(t.offsets.popper)[c];return f=M(N(r[l]-h,f),0),t.arrowElement=n,t.offsets.arrow={},t.offsets.arrow[c]=Math.round(f),t.offsets.arrow[u]="",t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(E(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=v(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement),i=t.placement.split("-")[0],o=x(i),r=t.placement.split("-")[1]||"",s=[];switch(e.behavior){case Z.FLIP:s=[i,o];break;case Z.CLOCKWISE:s=P(i);break;case Z.COUNTERCLOCKWISE:s=P(i,!0);break;default:s=e.behavior}return s.forEach(function(a,l){if(i!==a||s.length===l+1)return t;i=t.placement.split("-")[0],o=x(i);var c=t.offsets.popper,u=t.offsets.reference,d=H,p="left"===i&&d(c.right)>d(u.left)||"right"===i&&d(c.left)<d(u.right)||"top"===i&&d(c.bottom)>d(u.top)||"bottom"===i&&d(c.top)<d(u.bottom),h=d(c.left)<d(n.left),f=d(c.right)>d(n.right),m=d(c.top)<d(n.top),g=d(c.bottom)>d(n.bottom),v="left"===i&&h||"right"===i&&f||"top"===i&&m||"bottom"===i&&g,y=-1!==["top","bottom"].indexOf(i),b=!!e.flipVariations&&(y&&"start"===r&&h||y&&"end"===r&&f||!y&&"start"===r&&m||!y&&"end"===r&&g);(p||v||b)&&(t.flipped=!0,(p||v)&&(i=s[l+1]),b&&(r=function(t){return"end"===t?"start":"start"===t?"end":t}(r)),t.placement=i+(r?"-"+r:""),t.offsets.popper=G({},t.offsets.popper,T(t.instance.popper,t.offsets.reference,t.placement)),t=C(t.instance.modifiers,t,"flip"))}),t},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return o[s?"left":"top"]=r[e]-(a?o[s?"width":"height"]:0),t.placement=x(e),t.offsets.popper=p(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!L(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=S(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,r=t.offsets.popper,s=S(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==s&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a,l,c=void 0===s?e.gpuAcceleration:s,u=h(o(t.instance.popper)),d={position:r.position},p={left:H(r.left),top:H(r.top),bottom:H(r.bottom),right:H(r.right)},f="bottom"===n?"top":"bottom",m="right"===i?"left":"right",g=_("transform");if(l="bottom"==f?-u.height+p.bottom:p.top,a="right"==m?-u.width+p.right:p.left,c&&g)d[g]="translate3d("+a+"px, "+l+"px, 0)",d[f]=0,d[m]=0,d.willChange="transform";else{var v="bottom"==f?-1:1,y="right"==m?-1:1;d[f]=l*v,d[m]=a*y,d.willChange=f+", "+m}var b={"x-placement":t.placement};return t.attributes=G({},b,t.attributes),t.styles=G({},d,t.styles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){return D(t.instance.popper,t.styles),function(t,e){Object.keys(e).forEach(function(n){!1===e[n]?t.removeAttribute(n):t.setAttribute(n,e[n])})}(t.instance.popper,t.attributes),t.offsets.arrow&&D(t.arrowElement,t.offsets.arrow),t},onLoad:function(t,e,n,i,o){var r=b(0,e,t),s=y(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",s),D(e,{position:"absolute"}),n},gpuAcceleration:void 0}}},J}),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");!function(t){var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(),function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),i=function(t){function e(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(t){return(t[0]||t).nodeType}var i=!1,o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},r={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(e){var n=e.getAttribute("data-target");n&&"#"!==n||(n=e.getAttribute("href")||"");try{return t(n).length>0?n:null}catch(t){return null}},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(i.end)},supportsTransitionEnd:function(){return Boolean(i)},typeCheckConfig:function(t,i,o){for(var r in o)if(o.hasOwnProperty(r)){var s=o[r],a=i[r],l=a&&n(a)?"element":e(a);if(!new RegExp(s).test(l))throw new Error(t.toUpperCase()+': Option "'+r+'" provided type "'+l+'" but expected type "'+s+'".')}}};return i=function(){if(window.QUnit)return!1;var t=document.createElement("bootstrap");for(var e in o)if(void 0!==t.style[e])return{end:o[e]};return!1}(),t.fn.emulateTransitionEnd=function(e){var n=this,i=!1;return t(this).one(r.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||r.triggerTransitionEnd(n)},e),this},r.supportsTransitionEnd()&&(t.event.special[r.TRANSITION_END]={bindType:i.end,delegateType:i.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}),r}(jQuery),o=(function(e){var o="alert",r=e.fn[o],s={CLOSE:"close.bs.alert",CLOSED:"closed.bs.alert",CLICK_DATA_API:"click.bs.alert.data-api"},a={ALERT:"alert",FADE:"fade",SHOW:"show"},l=function(){function o(e){t(this,o),this._element=e}return o.prototype.close=function(t){t=t||this._element;var e=this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},o.prototype.dispose=function(){e.removeData(this._element,"bs.alert"),this._element=null},o.prototype._getRootElement=function(t){var n=i.getSelectorFromElement(t),o=!1;return n&&(o=e(n)[0]),o||(o=e(t).closest("."+a.ALERT)[0]),o},o.prototype._triggerCloseEvent=function(t){var n=e.Event(s.CLOSE);return e(t).trigger(n),n},o.prototype._removeElement=function(t){var n=this;e(t).removeClass(a.SHOW),i.supportsTransitionEnd()&&e(t).hasClass(a.FADE)?e(t).one(i.TRANSITION_END,function(e){return n._destroyElement(t,e)}).emulateTransitionEnd(150):this._destroyElement(t)},o.prototype._destroyElement=function(t){e(t).detach().trigger(s.CLOSED).remove()},o._jQueryInterface=function(t){return this.each(function(){var n=e(this),i=n.data("bs.alert");i||(i=new o(this),n.data("bs.alert",i)),"close"===t&&i[t](this)})},o._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},n(o,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}}]),o}();e(document).on(s.CLICK_DATA_API,'[data-dismiss="alert"]',l._handleDismiss(new l)),e.fn[o]=l._jQueryInterface,e.fn[o].Constructor=l,e.fn[o].noConflict=function(){return e.fn[o]=r,l._jQueryInterface}}(jQuery),function(e){var i="button",o=e.fn[i],r={ACTIVE:"active",BUTTON:"btn",FOCUS:"focus"},s={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:"input",ACTIVE:".active",BUTTON:".btn"},a={CLICK_DATA_API:"click.bs.button.data-api",FOCUS_BLUR_DATA_API:"focus.bs.button.data-api blur.bs.button.data-api"},l=function(){function i(e){t(this,i),this._element=e}return i.prototype.toggle=function(){var t=!0,n=!0,i=e(this._element).closest(s.DATA_TOGGLE)[0];if(i){var o=e(this._element).find(s.INPUT)[0];if(o){if("radio"===o.type)if(o.checked&&e(this._element).hasClass(r.ACTIVE))t=!1;else{var a=e(i).find(s.ACTIVE)[0];a&&e(a).removeClass(r.ACTIVE)}if(t){if(o.hasAttribute("disabled")||i.hasAttribute("disabled")||o.classList.contains("disabled")||i.classList.contains("disabled"))return;o.checked=!e(this._element).hasClass(r.ACTIVE),e(o).trigger("change")}o.focus(),n=!1}}n&&this._element.setAttribute("aria-pressed",!e(this._element).hasClass(r.ACTIVE)),t&&e(this._element).toggleClass(r.ACTIVE)},i.prototype.dispose=function(){e.removeData(this._element,"bs.button"),this._element=null},i._jQueryInterface=function(t){return this.each(function(){var n=e(this).data("bs.button");n||(n=new i(this),e(this).data("bs.button",n)),"toggle"===t&&n[t]()})},n(i,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}}]),i}();e(document).on(a.CLICK_DATA_API,s.DATA_TOGGLE_CARROT,function(t){t.preventDefault();var n=t.target;e(n).hasClass(r.BUTTON)||(n=e(n).closest(s.BUTTON)),l._jQueryInterface.call(e(n),"toggle")}).on(a.FOCUS_BLUR_DATA_API,s.DATA_TOGGLE_CARROT,function(t){var n=e(t.target).closest(s.BUTTON)[0];e(n).toggleClass(r.FOCUS,/^focus(in)?$/.test(t.type))}),e.fn[i]=l._jQueryInterface,e.fn[i].Constructor=l,e.fn[i].noConflict=function(){return e.fn[i]=o,l._jQueryInterface}}(jQuery),function(o){var r="carousel",s="bs.carousel",a="."+s,l=o.fn[r],c={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},u={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},d={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},p={SLIDE:"slide"+a,SLID:"slid"+a,KEYDOWN:"keydown"+a,MOUSEENTER:"mouseenter"+a,MOUSELEAVE:"mouseleave"+a,TOUCHEND:"touchend"+a,LOAD_DATA_API:"load.bs.carousel.data-api",CLICK_DATA_API:"click.bs.carousel.data-api"},h={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item"},f={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},m=function(){function l(e,n){t(this,l),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(n),this._element=o(e)[0],this._indicatorsElement=o(this._element).find(f.INDICATORS)[0],this._addEventListeners()}return l.prototype.next=function(){this._isSliding||this._slide(d.NEXT)},l.prototype.nextWhenVisible=function(){document.hidden||this.next()},l.prototype.prev=function(){this._isSliding||this._slide(d.PREV)},l.prototype.pause=function(t){t||(this._isPaused=!0),o(this._element).find(f.NEXT_PREV)[0]&&i.supportsTransitionEnd()&&(i.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},l.prototype.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},l.prototype.to=function(t){var e=this;this._activeElement=o(this._element).find(f.ACTIVE_ITEM)[0];var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)o(this._element).one(p.SLID,function(){return e.to(t)});else{if(n===t)return this.pause(),void this.cycle();var i=t>n?d.NEXT:d.PREV;this._slide(i,this._items[t])}},l.prototype.dispose=function(){o(this._element).off(a),o.removeData(this._element,s),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},l.prototype._getConfig=function(t){return t=o.extend({},c,t),i.typeCheckConfig(r,t,u),t},l.prototype._addEventListeners=function(){var t=this;this._config.keyboard&&o(this._element).on(p.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&(o(this._element).on(p.MOUSEENTER,function(e){return t.pause(e)}).on(p.MOUSELEAVE,function(e){return t.cycle(e)}),"ontouchstart"in document.documentElement&&o(this._element).on(p.TOUCHEND,function(){t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval)}))},l.prototype._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next();break;default:return}},l.prototype._getItemIndex=function(t){return this._items=o.makeArray(o(t).parent().find(f.ITEM)),this._items.indexOf(t)},l.prototype._getItemByDirection=function(t,e){var n=t===d.NEXT,i=t===d.PREV,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var s=(o+(t===d.PREV?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},l.prototype._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex(o(this._element).find(f.ACTIVE_ITEM)[0]),r=o.Event(p.SLIDE,{relatedTarget:t,direction:e,from:i,to:n});return o(this._element).trigger(r),r},l.prototype._setActiveIndicatorElement=function(t){if(this._indicatorsElement){o(this._indicatorsElement).find(f.ACTIVE).removeClass(h.ACTIVE);var e=this._indicatorsElement.children[this._getItemIndex(t)];e&&o(e).addClass(h.ACTIVE)}},l.prototype._slide=function(t,e){var n=this,r=o(this._element).find(f.ACTIVE_ITEM)[0],s=this._getItemIndex(r),a=e||r&&this._getItemByDirection(t,r),l=this._getItemIndex(a),c=Boolean(this._interval),u=void 0,m=void 0,g=void 0;if(t===d.NEXT?(u=h.LEFT,m=h.NEXT,g=d.LEFT):(u=h.RIGHT,m=h.PREV,g=d.RIGHT),a&&o(a).hasClass(h.ACTIVE))this._isSliding=!1;else if(!this._triggerSlideEvent(a,g).isDefaultPrevented()&&r&&a){this._isSliding=!0,c&&this.pause(),this._setActiveIndicatorElement(a);var v=o.Event(p.SLID,{relatedTarget:a,direction:g,from:s,to:l});i.supportsTransitionEnd()&&o(this._element).hasClass(h.SLIDE)?(o(a).addClass(m),i.reflow(a),o(r).addClass(u),o(a).addClass(u),o(r).one(i.TRANSITION_END,function(){o(a).removeClass(u+" "+m).addClass(h.ACTIVE),o(r).removeClass(h.ACTIVE+" "+m+" "+u),n._isSliding=!1,setTimeout(function(){return o(n._element).trigger(v)},0)}).emulateTransitionEnd(600)):(o(r).removeClass(h.ACTIVE),o(a).addClass(h.ACTIVE),this._isSliding=!1,o(this._element).trigger(v)),c&&this.cycle()}},l._jQueryInterface=function(t){return this.each(function(){var n=o(this).data(s),i=o.extend({},c,o(this).data());"object"===(void 0===t?"undefined":e(t))&&o.extend(i,t);var r="string"==typeof t?t:i.slide;if(n||(n=new l(this,i),o(this).data(s,n)),"number"==typeof t)n.to(t);else if("string"==typeof r){if(void 0===n[r])throw new Error('No method named "'+r+'"');n[r]()}else i.interval&&(n.pause(),n.cycle())})},l._dataApiClickHandler=function(t){var e=i.getSelectorFromElement(this);if(e){var n=o(e)[0];if(n&&o(n).hasClass(h.CAROUSEL)){var r=o.extend({},o(n).data(),o(this).data()),a=this.getAttribute("data-slide-to");a&&(r.interval=!1),l._jQueryInterface.call(o(n),r),a&&o(n).data(s).to(a),t.preventDefault()}}},n(l,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return c}}]),l}();o(document).on(p.CLICK_DATA_API,f.DATA_SLIDE,m._dataApiClickHandler),o(window).on(p.LOAD_DATA_API,function(){o(f.DATA_RIDE).each(function(){var t=o(this);m._jQueryInterface.call(t,t.data())})}),o.fn[r]=m._jQueryInterface,o.fn[r].Constructor=m,o.fn[r].noConflict=function(){return o.fn[r]=l,m._jQueryInterface}}(jQuery),function(o){var r="collapse",s="bs.collapse",a=o.fn[r],l={toggle:!0,parent:""},c={toggle:"boolean",parent:"string"},u={SHOW:"show.bs.collapse",SHOWN:"shown.bs.collapse",HIDE:"hide.bs.collapse",HIDDEN:"hidden.bs.collapse",CLICK_DATA_API:"click.bs.collapse.data-api"},d={SHOW:"show",COLLAPSE:"collapse",COLLAPSING:"collapsing",COLLAPSED:"collapsed"},p={WIDTH:"width",HEIGHT:"height"},h={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},f=function(){function a(e,n){t(this,a),this._isTransitioning=!1,this._element=e,this._config=this._getConfig(n),this._triggerArray=o.makeArray(o('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var r=o(h.DATA_TOGGLE),s=0;s<r.length;s++){var l=r[s],c=i.getSelectorFromElement(l);null!==c&&o(c).filter(e).length>0&&this._triggerArray.push(l)}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}return a.prototype.toggle=function(){o(this._element).hasClass(d.SHOW)?this.hide():this.show()},a.prototype.show=function(){var t=this;if(!this._isTransitioning&&!o(this._element).hasClass(d.SHOW)){var e=void 0,n=void 0;if(this._parent&&((e=o.makeArray(o(this._parent).children().children(h.ACTIVES))).length||(e=null)),!(e&&(n=o(e).data(s))&&n._isTransitioning)){var r=o.Event(u.SHOW);if(o(this._element).trigger(r),!r.isDefaultPrevented()){e&&(a._jQueryInterface.call(o(e),"hide"),n||o(e).data(s,null));var l=this._getDimension();o(this._element).removeClass(d.COLLAPSE).addClass(d.COLLAPSING),this._element.style[l]=0,this._triggerArray.length&&o(this._triggerArray).removeClass(d.COLLAPSED).attr("aria-expanded",!0),this.setTransitioning(!0);var c=function(){o(t._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).addClass(d.SHOW),t._element.style[l]="",t.setTransitioning(!1),o(t._element).trigger(u.SHOWN)};if(i.supportsTransitionEnd()){var p="scroll"+(l[0].toUpperCase()+l.slice(1));o(this._element).one(i.TRANSITION_END,c).emulateTransitionEnd(600),this._element.style[l]=this._element[p]+"px"}else c()}}}},a.prototype.hide=function(){var t=this;if(!this._isTransitioning&&o(this._element).hasClass(d.SHOW)){var e=o.Event(u.HIDE);if(o(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();if(this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",i.reflow(this._element),o(this._element).addClass(d.COLLAPSING).removeClass(d.COLLAPSE).removeClass(d.SHOW),this._triggerArray.length)for(var r=0;r<this._triggerArray.length;r++){var s=this._triggerArray[r],a=i.getSelectorFromElement(s);null!==a&&(o(a).hasClass(d.SHOW)||o(s).addClass(d.COLLAPSED).attr("aria-expanded",!1))}this.setTransitioning(!0);var l=function(){t.setTransitioning(!1),o(t._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).trigger(u.HIDDEN)};this._element.style[n]="",i.supportsTransitionEnd()?o(this._element).one(i.TRANSITION_END,l).emulateTransitionEnd(600):l()}}},a.prototype.setTransitioning=function(t){this._isTransitioning=t},a.prototype.dispose=function(){o.removeData(this._element,s),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},a.prototype._getConfig=function(t){return t=o.extend({},l,t),t.toggle=Boolean(t.toggle),i.typeCheckConfig(r,t,c),t},a.prototype._getDimension=function(){return o(this._element).hasClass(p.WIDTH)?p.WIDTH:p.HEIGHT},a.prototype._getParent=function(){var t=this,e=o(this._config.parent)[0],n='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return o(e).find(n).each(function(e,n){t._addAriaAndCollapsedClass(a._getTargetFromElement(n),[n])}),e},a.prototype._addAriaAndCollapsedClass=function(t,e){if(t){var n=o(t).hasClass(d.SHOW);e.length&&o(e).toggleClass(d.COLLAPSED,!n).attr("aria-expanded",n)}},a._getTargetFromElement=function(t){var e=i.getSelectorFromElement(t);return e?o(e)[0]:null},a._jQueryInterface=function(t){return this.each(function(){var n=o(this),i=n.data(s),r=o.extend({},l,n.data(),"object"===(void 0===t?"undefined":e(t))&&t);if(!i&&r.toggle&&/show|hide/.test(t)&&(r.toggle=!1),i||(i=new a(this,r),n.data(s,i)),"string"==typeof t){if(void 0===i[t])throw new Error('No method named "'+t+'"');i[t]()}})},n(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return l}}]),a}();o(document).on(u.CLICK_DATA_API,h.DATA_TOGGLE,function(t){/input|textarea/i.test(t.target.tagName)||t.preventDefault();var e=o(this),n=i.getSelectorFromElement(this);o(n).each(function(){var t=o(this),n=t.data(s)?"toggle":e.data();f._jQueryInterface.call(t,n)})}),o.fn[r]=f._jQueryInterface,o.fn[r].Constructor=f,o.fn[r].noConflict=function(){return o.fn[r]=a,f._jQueryInterface}}(jQuery),function(o){if("undefined"==typeof Popper)throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");var r="dropdown",s="bs.dropdown",a="."+s,l=o.fn[r],c=new RegExp("38|40|27"),u={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,CLICK:"click"+a,CLICK_DATA_API:"click.bs.dropdown.data-api",KEYDOWN_DATA_API:"keydown.bs.dropdown.data-api",KEYUP_DATA_API:"keyup.bs.dropdown.data-api"},d={DISABLED:"disabled",SHOW:"show",DROPUP:"dropup",MENURIGHT:"dropdown-menu-right",MENULEFT:"dropdown-menu-left"},p={DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:".dropdown form",MENU:".dropdown-menu",NAVBAR_NAV:".navbar-nav",VISIBLE_ITEMS:".dropdown-menu .dropdown-item:not(.disabled)"},h={TOP:"top-start",TOPEND:"top-end",BOTTOM:"bottom-start",BOTTOMEND:"bottom-end"},f={placement:h.BOTTOM,offset:0,flip:!0},m={placement:"string",offset:"(number|string)",flip:"boolean"},g=function(){function l(e,n){t(this,l),this._element=e,this._popper=null,this._config=this._getConfig(n),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}return l.prototype.toggle=function(){if(!this._element.disabled&&!o(this._element).hasClass(d.DISABLED)){var t=l._getParentFromElement(this._element),e=o(this._menu).hasClass(d.SHOW);if(l._clearMenus(),!e){var n={relatedTarget:this._element},i=o.Event(u.SHOW,n);if(o(t).trigger(i),!i.isDefaultPrevented()){var r=this._element;o(t).hasClass(d.DROPUP)&&(o(this._menu).hasClass(d.MENULEFT)||o(this._menu).hasClass(d.MENURIGHT))&&(r=t),this._popper=new Popper(r,this._menu,this._getPopperConfig()),"ontouchstart"in document.documentElement&&!o(t).closest(p.NAVBAR_NAV).length&&o("body").children().on("mouseover",null,o.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),o(this._menu).toggleClass(d.SHOW),o(t).toggleClass(d.SHOW).trigger(o.Event(u.SHOWN,n))}}}},l.prototype.dispose=function(){o.removeData(this._element,s),o(this._element).off(a),this._element=null,this._menu=null,null!==this._popper&&this._popper.destroy(),this._popper=null},l.prototype.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},l.prototype._addEventListeners=function(){var t=this;o(this._element).on(u.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},l.prototype._getConfig=function(t){var e=o(this._element).data();return void 0!==e.placement&&(e.placement=h[e.placement.toUpperCase()]),t=o.extend({},this.constructor.Default,o(this._element).data(),t),i.typeCheckConfig(r,t,this.constructor.DefaultType),t},l.prototype._getMenuElement=function(){if(!this._menu){var t=l._getParentFromElement(this._element);this._menu=o(t).find(p.MENU)[0]}return this._menu},l.prototype._getPlacement=function(){var t=o(this._element).parent(),e=this._config.placement;return t.hasClass(d.DROPUP)||this._config.placement===h.TOP?(e=h.TOP,o(this._menu).hasClass(d.MENURIGHT)&&(e=h.TOPEND)):o(this._menu).hasClass(d.MENURIGHT)&&(e=h.BOTTOMEND),e},l.prototype._detectNavbar=function(){return o(this._element).closest(".navbar").length>0},l.prototype._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:{offset:this._config.offset},flip:{enabled:this._config.flip}}};return this._inNavbar&&(t.modifiers.applyStyle={enabled:!this._inNavbar}),t},l._jQueryInterface=function(t){return this.each(function(){var n=o(this).data(s),i="object"===(void 0===t?"undefined":e(t))?t:null;if(n||(n=new l(this,i),o(this).data(s,n)),"string"==typeof t){if(void 0===n[t])throw new Error('No method named "'+t+'"');n[t]()}})},l._clearMenus=function(t){if(!t||3!==t.which&&("keyup"!==t.type||9===t.which))for(var e=o.makeArray(o(p.DATA_TOGGLE)),n=0;n<e.length;n++){var i=l._getParentFromElement(e[n]),r=o(e[n]).data(s),a={relatedTarget:e[n]};if(r){var c=r._menu;if(o(i).hasClass(d.SHOW)&&!(t&&("click"===t.type&&/input|textarea/i.test(t.target.tagName)||"keyup"===t.type&&9===t.which)&&o.contains(i,t.target))){var h=o.Event(u.HIDE,a);o(i).trigger(h),h.isDefaultPrevented()||("ontouchstart"in document.documentElement&&o("body").children().off("mouseover",null,o.noop),e[n].setAttribute("aria-expanded","false"),o(c).removeClass(d.SHOW),o(i).removeClass(d.SHOW).trigger(o.Event(u.HIDDEN,a)))}}}},l._getParentFromElement=function(t){var e=void 0,n=i.getSelectorFromElement(t);return n&&(e=o(n)[0]),e||t.parentNode},l._dataApiKeydownHandler=function(t){if(!(!c.test(t.which)||/button/i.test(t.target.tagName)&&32===t.which||/input|textarea/i.test(t.target.tagName)||(t.preventDefault(),t.stopPropagation(),this.disabled||o(this).hasClass(d.DISABLED)))){var e=l._getParentFromElement(this),n=o(e).hasClass(d.SHOW);if((n||27===t.which&&32===t.which)&&(!n||27!==t.which&&32!==t.which)){var i=o(e).find(p.VISIBLE_ITEMS).get();if(i.length){var r=i.indexOf(t.target);38===t.which&&r>0&&r--,40===t.which&&r<i.length-1&&r++,r<0&&(r=0),i[r].focus()}}else{if(27===t.which){var s=o(e).find(p.DATA_TOGGLE)[0];o(s).trigger("focus")}o(this).trigger("click")}}},n(l,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return f}},{key:"DefaultType",get:function(){return m}}]),l}();o(document).on(u.KEYDOWN_DATA_API,p.DATA_TOGGLE,g._dataApiKeydownHandler).on(u.KEYDOWN_DATA_API,p.MENU,g._dataApiKeydownHandler).on(u.CLICK_DATA_API+" "+u.KEYUP_DATA_API,g._clearMenus).on(u.CLICK_DATA_API,p.DATA_TOGGLE,function(t){t.preventDefault(),t.stopPropagation(),g._jQueryInterface.call(o(this),"toggle")}).on(u.CLICK_DATA_API,p.FORM_CHILD,function(t){t.stopPropagation()}),o.fn[r]=g._jQueryInterface,o.fn[r].Constructor=g,o.fn[r].noConflict=function(){return o.fn[r]=l,g._jQueryInterface}}(jQuery),function(o){var r="modal",s=o.fn[r],a={backdrop:!0,keyboard:!0,focus:!0,show:!0},l={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},c={HIDE:"hide.bs.modal",HIDDEN:"hidden.bs.modal",SHOW:"show.bs.modal",SHOWN:"shown.bs.modal",FOCUSIN:"focusin.bs.modal",RESIZE:"resize.bs.modal",CLICK_DISMISS:"click.dismiss.bs.modal",KEYDOWN_DISMISS:"keydown.dismiss.bs.modal",MOUSEUP_DISMISS:"mouseup.dismiss.bs.modal",MOUSEDOWN_DISMISS:"mousedown.dismiss.bs.modal",CLICK_DATA_API:"click.bs.modal.data-api"},u={SCROLLBAR_MEASURER:"modal-scrollbar-measure",BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",SHOW:"show"},d={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",NAVBAR_TOGGLER:".navbar-toggler"},p=function(){function s(e,n){t(this,s),this._config=this._getConfig(n),this._element=e,this._dialog=o(e).find(d.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return s.prototype.toggle=function(t){return this._isShown?this.hide():this.show(t)},s.prototype.show=function(t){var e=this;if(!this._isTransitioning){i.supportsTransitionEnd()&&o(this._element).hasClass(u.FADE)&&(this._isTransitioning=!0);var n=o.Event(c.SHOW,{relatedTarget:t});o(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),o(document.body).addClass(u.OPEN),this._setEscapeEvent(),this._setResizeEvent(),o(this._element).on(c.CLICK_DISMISS,d.DATA_DISMISS,function(t){return e.hide(t)}),o(this._dialog).on(c.MOUSEDOWN_DISMISS,function(){o(e._element).one(c.MOUSEUP_DISMISS,function(t){o(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return e._showElement(t)}))}},s.prototype.hide=function(t){var e=this;if(t&&t.preventDefault(),!this._isTransitioning&&this._isShown){var n=i.supportsTransitionEnd()&&o(this._element).hasClass(u.FADE);n&&(this._isTransitioning=!0);var r=o.Event(c.HIDE);o(this._element).trigger(r),this._isShown&&!r.isDefaultPrevented()&&(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),o(document).off(c.FOCUSIN),o(this._element).removeClass(u.SHOW),o(this._element).off(c.CLICK_DISMISS),o(this._dialog).off(c.MOUSEDOWN_DISMISS),n?o(this._element).one(i.TRANSITION_END,function(t){return e._hideModal(t)}).emulateTransitionEnd(300):this._hideModal())}},s.prototype.dispose=function(){o.removeData(this._element,"bs.modal"),o(window,document,this._element,this._backdrop).off(".bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},s.prototype.handleUpdate=function(){this._adjustDialog()},s.prototype._getConfig=function(t){return t=o.extend({},a,t),i.typeCheckConfig(r,t,l),t},s.prototype._showElement=function(t){var e=this,n=i.supportsTransitionEnd()&&o(this._element).hasClass(u.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,n&&i.reflow(this._element),o(this._element).addClass(u.SHOW),this._config.focus&&this._enforceFocus();var r=o.Event(c.SHOWN,{relatedTarget:t}),s=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,o(e._element).trigger(r)};n?o(this._dialog).one(i.TRANSITION_END,s).emulateTransitionEnd(300):s()},s.prototype._enforceFocus=function(){var t=this;o(document).off(c.FOCUSIN).on(c.FOCUSIN,function(e){document===e.target||t._element===e.target||o(t._element).has(e.target).length||t._element.focus()})},s.prototype._setEscapeEvent=function(){var t=this;this._isShown&&this._config.keyboard?o(this._element).on(c.KEYDOWN_DISMISS,function(e){27===e.which&&(e.preventDefault(),t.hide())}):this._isShown||o(this._element).off(c.KEYDOWN_DISMISS)},s.prototype._setResizeEvent=function(){var t=this;this._isShown?o(window).on(c.RESIZE,function(e){return t.handleUpdate(e)}):o(window).off(c.RESIZE)},s.prototype._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){o(document.body).removeClass(u.OPEN),t._resetAdjustments(),t._resetScrollbar(),o(t._element).trigger(c.HIDDEN)})},s.prototype._removeBackdrop=function(){this._backdrop&&(o(this._backdrop).remove(),this._backdrop=null)},s.prototype._showBackdrop=function(t){var e=this,n=o(this._element).hasClass(u.FADE)?u.FADE:"";if(this._isShown&&this._config.backdrop){var r=i.supportsTransitionEnd()&&n;if(this._backdrop=document.createElement("div"),this._backdrop.className=u.BACKDROP,n&&o(this._backdrop).addClass(n),o(this._backdrop).appendTo(document.body),o(this._element).on(c.CLICK_DISMISS,function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._element.focus():e.hide())}),r&&i.reflow(this._backdrop),o(this._backdrop).addClass(u.SHOW),!t)return;if(!r)return void t();o(this._backdrop).one(i.TRANSITION_END,t).emulateTransitionEnd(150)}else if(!this._isShown&&this._backdrop){o(this._backdrop).removeClass(u.SHOW);var s=function(){e._removeBackdrop(),t&&t()};i.supportsTransitionEnd()&&o(this._element).hasClass(u.FADE)?o(this._backdrop).one(i.TRANSITION_END,s).emulateTransitionEnd(150):s()}else t&&t()},s.prototype._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},s.prototype._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},s.prototype._checkScrollbar=function(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},s.prototype._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){o(d.FIXED_CONTENT).each(function(e,n){var i=o(n)[0].style.paddingRight,r=o(n).css("padding-right");o(n).data("padding-right",i).css("padding-right",parseFloat(r)+t._scrollbarWidth+"px")}),o(d.NAVBAR_TOGGLER).each(function(e,n){var i=o(n)[0].style.marginRight,r=o(n).css("margin-right");o(n).data("margin-right",i).css("margin-right",parseFloat(r)+t._scrollbarWidth+"px")});var e=document.body.style.paddingRight,n=o("body").css("padding-right");o("body").data("padding-right",e).css("padding-right",parseFloat(n)+this._scrollbarWidth+"px")}},s.prototype._resetScrollbar=function(){o(d.FIXED_CONTENT).each(function(t,e){var n=o(e).data("padding-right");void 0!==n&&o(e).css("padding-right",n).removeData("padding-right")}),o(d.NAVBAR_TOGGLER).each(function(t,e){var n=o(e).data("margin-right");void 0!==n&&o(e).css("margin-right",n).removeData("margin-right")});var t=o("body").data("padding-right");void 0!==t&&o("body").css("padding-right",t).removeData("padding-right")},s.prototype._getScrollbarWidth=function(){var t=document.createElement("div");t.className=u.SCROLLBAR_MEASURER,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},s._jQueryInterface=function(t,n){return this.each(function(){var i=o(this).data("bs.modal"),r=o.extend({},s.Default,o(this).data(),"object"===(void 0===t?"undefined":e(t))&&t);if(i||(i=new s(this,r),o(this).data("bs.modal",i)),"string"==typeof t){if(void 0===i[t])throw new Error('No method named "'+t+'"');i[t](n)}else r.show&&i.show(n)})},n(s,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return a}}]),s}();o(document).on(c.CLICK_DATA_API,d.DATA_TOGGLE,function(t){var e=this,n=void 0,r=i.getSelectorFromElement(this);r&&(n=o(r)[0]);var s=o(n).data("bs.modal")?"toggle":o.extend({},o(n).data(),o(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var a=o(n).one(c.SHOW,function(t){t.isDefaultPrevented()||a.one(c.HIDDEN,function(){o(e).is(":visible")&&e.focus()})});p._jQueryInterface.call(o(n),s,this)}),o.fn[r]=p._jQueryInterface,o.fn[r].Constructor=p,o.fn[r].noConflict=function(){return o.fn[r]=s,p._jQueryInterface}}(jQuery),function(o){var r="scrollspy",s=o.fn[r],a={offset:10,method:"auto",target:""},l={offset:"number",method:"string",target:"(string|element)"},c={ACTIVATE:"activate.bs.scrollspy",SCROLL:"scroll.bs.scrollspy",LOAD_DATA_API:"load.bs.scrollspy.data-api"},u={DROPDOWN_ITEM:"dropdown-item",DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active"},d={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},p={OFFSET:"offset",POSITION:"position"},h=function(){function s(e,n){var i=this;t(this,s),this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(n),this._selector=this._config.target+" "+d.NAV_LINKS+","+this._config.target+" "+d.LIST_ITEMS+","+this._config.target+" "+d.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,o(this._scrollElement).on(c.SCROLL,function(t){return i._process(t)}),this.refresh(),this._process()}return s.prototype.refresh=function(){var t=this,e=this._scrollElement!==this._scrollElement.window?p.POSITION:p.OFFSET,n="auto"===this._config.method?e:this._config.method,r=n===p.POSITION?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),o.makeArray(o(this._selector)).map(function(t){var e=void 0,s=i.getSelectorFromElement(t);if(s&&(e=o(s)[0]),e){var a=e.getBoundingClientRect();if(a.width||a.height)return[o(e)[n]().top+r,s]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},s.prototype.dispose=function(){o.removeData(this._element,"bs.scrollspy"),o(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},s.prototype._getConfig=function(t){if("string"!=typeof(t=o.extend({},a,t)).target){var e=o(t.target).attr("id");e||(e=i.getUID(r),o(t.target).attr("id",e)),t.target="#"+e}return i.typeCheckConfig(r,t,l),t},s.prototype._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},s.prototype._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},s.prototype._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},s.prototype._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;)this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&(void 0===this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}},s.prototype._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",");e=e.map(function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'});var n=o(e.join(","));n.hasClass(u.DROPDOWN_ITEM)?(n.closest(d.DROPDOWN).find(d.DROPDOWN_TOGGLE).addClass(u.ACTIVE),n.addClass(u.ACTIVE)):(n.addClass(u.ACTIVE),n.parents(d.NAV_LIST_GROUP).prev(d.NAV_LINKS+", "+d.LIST_ITEMS).addClass(u.ACTIVE)),o(this._scrollElement).trigger(c.ACTIVATE,{relatedTarget:t})},s.prototype._clear=function(){o(this._selector).filter(d.ACTIVE).removeClass(u.ACTIVE)},s._jQueryInterface=function(t){return this.each(function(){var n=o(this).data("bs.scrollspy"),i="object"===(void 0===t?"undefined":e(t))&&t;if(n||(n=new s(this,i),o(this).data("bs.scrollspy",n)),"string"==typeof t){if(void 0===n[t])throw new Error('No method named "'+t+'"');n[t]()}})},n(s,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return a}}]),s}();o(window).on(c.LOAD_DATA_API,function(){for(var t=o.makeArray(o(d.DATA_SPY)),e=t.length;e--;){var n=o(t[e]);h._jQueryInterface.call(n,n.data())}}),o.fn[r]=h._jQueryInterface,o.fn[r].Constructor=h,o.fn[r].noConflict=function(){return o.fn[r]=s,h._jQueryInterface}}(jQuery),function(e){var o=e.fn.tab,r={HIDE:"hide.bs.tab",HIDDEN:"hidden.bs.tab",SHOW:"show.bs.tab",SHOWN:"shown.bs.tab",CLICK_DATA_API:"click.bs.tab.data-api"},s={DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active",DISABLED:"disabled",FADE:"fade",SHOW:"show"},a={DROPDOWN:".dropdown",NAV_LIST_GROUP:".nav, .list-group",ACTIVE:".active",DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',DROPDOWN_TOGGLE:".dropdown-toggle",DROPDOWN_ACTIVE_CHILD:"> .dropdown-menu .active"},l=function(){function o(e){t(this,o),this._element=e}return o.prototype.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&e(this._element).hasClass(s.ACTIVE)||e(this._element).hasClass(s.DISABLED))){var n=void 0,o=void 0,l=e(this._element).closest(a.NAV_LIST_GROUP)[0],c=i.getSelectorFromElement(this._element);l&&(o=e.makeArray(e(l).find(a.ACTIVE)),o=o[o.length-1]);var u=e.Event(r.HIDE,{relatedTarget:this._element}),d=e.Event(r.SHOW,{relatedTarget:o});if(o&&e(o).trigger(u),e(this._element).trigger(d),!d.isDefaultPrevented()&&!u.isDefaultPrevented()){c&&(n=e(c)[0]),this._activate(this._element,l);var p=function(){var n=e.Event(r.HIDDEN,{relatedTarget:t._element}),i=e.Event(r.SHOWN,{relatedTarget:o});e(o).trigger(n),e(t._element).trigger(i)};n?this._activate(n,n.parentNode,p):p()}}},o.prototype.dispose=function(){e.removeData(this._element,"bs.tab"),this._element=null},o.prototype._activate=function(t,n,o){var r=this,l=e(n).find(a.ACTIVE)[0],c=o&&i.supportsTransitionEnd()&&l&&e(l).hasClass(s.FADE),u=function(){return r._transitionComplete(t,l,c,o)};l&&c?e(l).one(i.TRANSITION_END,u).emulateTransitionEnd(150):u(),l&&e(l).removeClass(s.SHOW)},o.prototype._transitionComplete=function(t,n,o,r){if(n){e(n).removeClass(s.ACTIVE);var l=e(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];l&&e(l).removeClass(s.ACTIVE),n.setAttribute("aria-expanded",!1)}if(e(t).addClass(s.ACTIVE),t.setAttribute("aria-expanded",!0),o?(i.reflow(t),e(t).addClass(s.SHOW)):e(t).removeClass(s.FADE),t.parentNode&&e(t.parentNode).hasClass(s.DROPDOWN_MENU)){var c=e(t).closest(a.DROPDOWN)[0];c&&e(c).find(a.DROPDOWN_TOGGLE).addClass(s.ACTIVE),t.setAttribute("aria-expanded",!0)}r&&r()},o._jQueryInterface=function(t){return this.each(function(){var n=e(this),i=n.data("bs.tab");if(i||(i=new o(this),n.data("bs.tab",i)),"string"==typeof t){if(void 0===i[t])throw new Error('No method named "'+t+'"');i[t]()}})},n(o,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}}]),o}();e(document).on(r.CLICK_DATA_API,a.DATA_TOGGLE,function(t){t.preventDefault(),l._jQueryInterface.call(e(this),"show")}),e.fn.tab=l._jQueryInterface,e.fn.tab.Constructor=l,e.fn.tab.noConflict=function(){return e.fn.tab=o,l._jQueryInterface}}(jQuery),function(o){if("undefined"==typeof Popper)throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");var r="tooltip",s=".bs.tooltip",a=o.fn[r],l=new RegExp("(^|\\s)bs-tooltip\\S+","g"),c={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)"},u={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},d={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip"},p={SHOW:"show",OUT:"out"},h={HIDE:"hide"+s,HIDDEN:"hidden"+s,SHOW:"show"+s,SHOWN:"shown"+s,INSERTED:"inserted"+s,CLICK:"click"+s,FOCUSIN:"focusin"+s,FOCUSOUT:"focusout"+s,MOUSEENTER:"mouseenter"+s,MOUSELEAVE:"mouseleave"+s},f={FADE:"fade",SHOW:"show"},m={TOOLTIP:".tooltip",TOOLTIP_INNER:".tooltip-inner",ARROW:".arrow"},g={HOVER:"hover",FOCUS:"focus",CLICK:"click",MANUAL:"manual"},v=function(){function a(e,n){t(this,a),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=e,this.config=this._getConfig(n),this.tip=null,this._setListeners()}return a.prototype.enable=function(){this._isEnabled=!0},a.prototype.disable=function(){this._isEnabled=!1},a.prototype.toggleEnabled=function(){this._isEnabled=!this._isEnabled},a.prototype.toggle=function(t){if(t){var e=this.constructor.DATA_KEY,n=o(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),o(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(o(this.getTipElement()).hasClass(f.SHOW))return void this._leave(null,this);this._enter(null,this)}},a.prototype.dispose=function(){clearTimeout(this._timeout),o.removeData(this.element,this.constructor.DATA_KEY),o(this.element).off(this.constructor.EVENT_KEY),o(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&o(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},a.prototype.show=function(){var t=this;if("none"===o(this.element).css("display"))throw new Error("Please use show on visible elements");var e=o.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){o(this.element).trigger(e);var n=o.contains(this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!n)return;var r=this.getTipElement(),s=i.getUID(this.constructor.NAME);r.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&o(r).addClass(f.FADE);var l="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,c=this._getAttachment(l);this.addAttachmentClass(c);var u=!1===this.config.container?document.body:o(this.config.container);o(r).data(this.constructor.DATA_KEY,this),o.contains(this.element.ownerDocument.documentElement,this.tip)||o(r).appendTo(u),o(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new Popper(this.element,r,{placement:c,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:m.ARROW}},onCreate:function(e){e.originalPlacement!==e.placement&&t._handlePopperPlacementChange(e)},onUpdate:function(e){t._handlePopperPlacementChange(e)}}),o(r).addClass(f.SHOW),"ontouchstart"in document.documentElement&&o("body").children().on("mouseover",null,o.noop);var d=function(){t.config.animation&&t._fixTransition();var e=t._hoverState;t._hoverState=null,o(t.element).trigger(t.constructor.Event.SHOWN),e===p.OUT&&t._leave(null,t)};i.supportsTransitionEnd()&&o(this.tip).hasClass(f.FADE)?o(this.tip).one(i.TRANSITION_END,d).emulateTransitionEnd(a._TRANSITION_DURATION):d()}},a.prototype.hide=function(t){var e=this,n=this.getTipElement(),r=o.Event(this.constructor.Event.HIDE),s=function(){e._hoverState!==p.SHOW&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),o(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};o(this.element).trigger(r),r.isDefaultPrevented()||(o(n).removeClass(f.SHOW),"ontouchstart"in document.documentElement&&o("body").children().off("mouseover",null,o.noop),this._activeTrigger[g.CLICK]=!1,this._activeTrigger[g.FOCUS]=!1,this._activeTrigger[g.HOVER]=!1,i.supportsTransitionEnd()&&o(this.tip).hasClass(f.FADE)?o(n).one(i.TRANSITION_END,s).emulateTransitionEnd(150):s(),this._hoverState="")},a.prototype.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},a.prototype.isWithContent=function(){return Boolean(this.getTitle())},a.prototype.addAttachmentClass=function(t){o(this.getTipElement()).addClass("bs-tooltip-"+t)},a.prototype.getTipElement=function(){return this.tip=this.tip||o(this.config.template)[0]},a.prototype.setContent=function(){var t=o(this.getTipElement());this.setElementContent(t.find(m.TOOLTIP_INNER),this.getTitle()),t.removeClass(f.FADE+" "+f.SHOW)},a.prototype.setElementContent=function(t,n){var i=this.config.html;"object"===(void 0===n?"undefined":e(n))&&(n.nodeType||n.jquery)?i?o(n).parent().is(t)||t.empty().append(n):t.text(o(n).text()):t[i?"html":"text"](n)},a.prototype.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},a.prototype._getAttachment=function(t){return u[t.toUpperCase()]},a.prototype._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach(function(e){if("click"===e)o(t.element).on(t.constructor.Event.CLICK,t.config.selector,function(e){return t.toggle(e)});else if(e!==g.MANUAL){var n=e===g.HOVER?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,i=e===g.HOVER?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;o(t.element).on(n,t.config.selector,function(e){return t._enter(e)}).on(i,t.config.selector,function(e){return t._leave(e)})}o(t.element).closest(".modal").on("hide.bs.modal",function(){return t.hide()})}),this.config.selector?this.config=o.extend({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},a.prototype._fixTitle=function(){var t=e(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},a.prototype._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||o(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),o(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?g.FOCUS:g.HOVER]=!0),o(e.getTipElement()).hasClass(f.SHOW)||e._hoverState===p.SHOW?e._hoverState=p.SHOW:(clearTimeout(e._timeout),e._hoverState=p.SHOW,e.config.delay&&e.config.delay.show?e._timeout=setTimeout(function(){e._hoverState===p.SHOW&&e.show()},e.config.delay.show):e.show())},a.prototype._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||o(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),o(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?g.FOCUS:g.HOVER]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=p.OUT,e.config.delay&&e.config.delay.hide?e._timeout=setTimeout(function(){e._hoverState===p.OUT&&e.hide()},e.config.delay.hide):e.hide())},a.prototype._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},a.prototype._getConfig=function(t){return(t=o.extend({},this.constructor.Default,o(this.element).data(),t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.title&&"number"==typeof t.title&&(t.title=t.title.toString()),t.content&&"number"==typeof t.content&&(t.content=t.content.toString()),i.typeCheckConfig(r,t,this.constructor.DefaultType),t},a.prototype._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},a.prototype._cleanTipClass=function(){var t=o(this.getTipElement()),e=t.attr("class").match(l);null!==e&&e.length>0&&t.removeClass(e.join(""))},a.prototype._handlePopperPlacementChange=function(t){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},a.prototype._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(o(t).removeClass(f.FADE),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},a._jQueryInterface=function(t){return this.each(function(){var n=o(this).data("bs.tooltip"),i="object"===(void 0===t?"undefined":e(t))&&t;if((n||!/dispose|hide/.test(t))&&(n||(n=new a(this,i),o(this).data("bs.tooltip",n)),"string"==typeof t)){if(void 0===n[t])throw new Error('No method named "'+t+'"');n[t]()}})},n(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return d}},{key:"NAME",get:function(){return r}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return h}},{key:"EVENT_KEY",get:function(){return s}},{key:"DefaultType",get:function(){return c}}]),a}();return o.fn[r]=v._jQueryInterface,o.fn[r].Constructor=v,o.fn[r].noConflict=function(){return o.fn[r]=a,v._jQueryInterface},v}(jQuery));!function(i){var r="popover",s=".bs.popover",a=i.fn[r],l=new RegExp("(^|\\s)bs-popover\\S+","g"),c=i.extend({},o.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),u=i.extend({},o.DefaultType,{content:"(string|element|function)"}),d={FADE:"fade",SHOW:"show"},p={TITLE:".popover-header",CONTENT:".popover-body"},h={HIDE:"hide"+s,HIDDEN:"hidden"+s,SHOW:"show"+s,SHOWN:"shown"+s,INSERTED:"inserted"+s,CLICK:"click"+s,FOCUSIN:"focusin"+s,FOCUSOUT:"focusout"+s,MOUSEENTER:"mouseenter"+s,MOUSELEAVE:"mouseleave"+s},f=function(o){function a(){return t(this,a),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,o.apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(a,o),a.prototype.isWithContent=function(){return this.getTitle()||this._getContent()},a.prototype.addAttachmentClass=function(t){i(this.getTipElement()).addClass("bs-popover-"+t)},a.prototype.getTipElement=function(){return this.tip=this.tip||i(this.config.template)[0]},a.prototype.setContent=function(){var t=i(this.getTipElement());this.setElementContent(t.find(p.TITLE),this.getTitle()),this.setElementContent(t.find(p.CONTENT),this._getContent()),t.removeClass(d.FADE+" "+d.SHOW)},a.prototype._getContent=function(){return this.element.getAttribute("data-content")||("function"==typeof this.config.content?this.config.content.call(this.element):this.config.content)},a.prototype._cleanTipClass=function(){var t=i(this.getTipElement()),e=t.attr("class").match(l);null!==e&&e.length>0&&t.removeClass(e.join(""))},a._jQueryInterface=function(t){return this.each(function(){var n=i(this).data("bs.popover"),o="object"===(void 0===t?"undefined":e(t))?t:null;if((n||!/destroy|hide/.test(t))&&(n||(n=new a(this,o),i(this).data("bs.popover",n)),"string"==typeof t)){if(void 0===n[t])throw new Error('No method named "'+t+'"');n[t]()}})},n(a,null,[{key:"VERSION",get:function(){return"4.0.0-beta"}},{key:"Default",get:function(){return c}},{key:"NAME",get:function(){return r}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return h}},{key:"EVENT_KEY",get:function(){return s}},{key:"DefaultType",get:function(){return u}}]),a}(o);i.fn[r]=f._jQueryInterface,i.fn[r].Constructor=f,i.fn[r].noConflict=function(){return i.fn[r]=a,f._jQueryInterface}}(jQuery)}(),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(n,i){var o,r=this;r.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:t(n),appendDots:t(n),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,n){return t('<button type="button" />').text(n+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},r.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},t.extend(r,r.initials),r.activeBreakpoint=null,r.animType=null,r.animProp=null,r.breakpoints=[],r.breakpointSettings=[],r.cssTransitions=!1,r.focussed=!1,r.interrupted=!1,r.hidden="hidden",r.paused=!0,r.positionProp=null,r.respondTo=null,r.rowCount=1,r.shouldClick=!0,r.$slider=t(n),r.$slidesCache=null,r.transformType=null,r.transitionType=null,r.visibilityChange="visibilitychange",r.windowWidth=0,r.windowTimer=null,o=t(n).data("slick")||{},r.options=t.extend({},r.defaults,i,o),r.currentSlide=r.options.initialSlide,r.originalSettings=r.options,void 0!==document.mozHidden?(r.hidden="mozHidden",r.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(r.hidden="webkitHidden",r.visibilityChange="webkitvisibilitychange"),r.autoPlay=t.proxy(r.autoPlay,r),r.autoPlayClear=t.proxy(r.autoPlayClear,r),r.autoPlayIterator=t.proxy(r.autoPlayIterator,r),r.changeSlide=t.proxy(r.changeSlide,r),r.clickHandler=t.proxy(r.clickHandler,r),r.selectHandler=t.proxy(r.selectHandler,r),r.setPosition=t.proxy(r.setPosition,r),r.swipeHandler=t.proxy(r.swipeHandler,r),r.dragHandler=t.proxy(r.dragHandler,r),r.keyHandler=t.proxy(r.keyHandler,r),r.instanceUid=e++,r.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,r.registerBreakpoints(),r.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,n,i){var o=this;if("boolean"==typeof n)i=n,n=null;else if(n<0||n>=o.slideCount)return!1;o.unload(),"number"==typeof n?0===n&&0===o.$slides.length?t(e).appendTo(o.$slideTrack):i?t(e).insertBefore(o.$slides.eq(n)):t(e).insertAfter(o.$slides.eq(n)):!0===i?t(e).prependTo(o.$slideTrack):t(e).appendTo(o.$slideTrack),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slides.each(function(e,n){t(n).attr("data-slick-index",e)}),o.$slidesCache=o.$slides,o.reinit()},e.prototype.animateHeight=function(){var t=this;if(1===t.options.slidesToShow&&!0===t.options.adaptiveHeight&&!1===t.options.vertical){var e=t.$slides.eq(t.currentSlide).outerHeight(!0);t.$list.animate({height:e},t.options.speed)}},e.prototype.animateSlide=function(e,n){var i={},o=this;o.animateHeight(),!0===o.options.rtl&&!1===o.options.vertical&&(e=-e),!1===o.transformsEnabled?!1===o.options.vertical?o.$slideTrack.animate({left:e},o.options.speed,o.options.easing,n):o.$slideTrack.animate({top:e},o.options.speed,o.options.easing,n):!1===o.cssTransitions?(!0===o.options.rtl&&(o.currentLeft=-o.currentLeft),t({animStart:o.currentLeft}).animate({animStart:e},{duration:o.options.speed,easing:o.options.easing,step:function(t){t=Math.ceil(t),!1===o.options.vertical?(i[o.animType]="translate("+t+"px, 0px)",o.$slideTrack.css(i)):(i[o.animType]="translate(0px,"+t+"px)",o.$slideTrack.css(i))},complete:function(){n&&n.call()}})):(o.applyTransition(),e=Math.ceil(e),!1===o.options.vertical?i[o.animType]="translate3d("+e+"px, 0px, 0px)":i[o.animType]="translate3d(0px,"+e+"px, 0px)",o.$slideTrack.css(i),n&&setTimeout(function(){o.disableTransition(),n.call()},o.options.speed))},e.prototype.getNavTarget=function(){var e=this.options.asNavFor;return e&&null!==e&&(e=t(e).not(this.$slider)),e},e.prototype.asNavFor=function(e){var n=this.getNavTarget();null!==n&&"object"==typeof n&&n.each(function(){var n=t(this).slick("getSlick");n.unslicked||n.slideHandler(e,!0)})},e.prototype.applyTransition=function(t){var e=this,n={};!1===e.options.fade?n[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:n[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(n):e.$slides.eq(t).css(n)},e.prototype.autoPlay=function(){var t=this;t.autoPlayClear(),t.slideCount>t.options.slidesToShow&&(t.autoPlayTimer=setInterval(t.autoPlayIterator,t.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){this.autoPlayTimer&&clearInterval(this.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var t=this,e=t.currentSlide+t.options.slidesToScroll;t.paused||t.interrupted||t.focussed||(!1===t.options.infinite&&(1===t.direction&&t.currentSlide+1===t.slideCount-1?t.direction=0:0===t.direction&&(e=t.currentSlide-t.options.slidesToScroll,t.currentSlide-1==0&&(t.direction=1))),t.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=t(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=t(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,n,i=this;if(!0===i.options.dots){for(i.$slider.addClass("slick-dotted"),n=t("<ul />").addClass(i.options.dotsClass),e=0;e<=i.getDotCount();e+=1)n.append(t("<li />").append(i.options.customPaging.call(this,i,e)));i.$dots=n.appendTo(i.options.appendDots),i.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,n){t(n).attr("data-slick-index",e).data("originalStyling",t(n).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?t('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),t("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var t,e,n,i,o,r,s,a=this;if(i=document.createDocumentFragment(),r=a.$slider.children(),a.options.rows>1){for(s=a.options.slidesPerRow*a.options.rows,o=Math.ceil(r.length/s),t=0;t<o;t++){var l=document.createElement("div");for(e=0;e<a.options.rows;e++){var c=document.createElement("div");for(n=0;n<a.options.slidesPerRow;n++){var u=t*s+(e*a.options.slidesPerRow+n);r.get(u)&&c.appendChild(r.get(u))}l.appendChild(c)}i.appendChild(l)}a.$slider.empty().append(i),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,n){var i,o,r,s=this,a=!1,l=s.$slider.width(),c=window.innerWidth||t(window).width();if("window"===s.respondTo?r=c:"slider"===s.respondTo?r=l:"min"===s.respondTo&&(r=Math.min(c,l)),s.options.responsive&&s.options.responsive.length&&null!==s.options.responsive){o=null;for(i in s.breakpoints)s.breakpoints.hasOwnProperty(i)&&(!1===s.originalSettings.mobileFirst?r<s.breakpoints[i]&&(o=s.breakpoints[i]):r>s.breakpoints[i]&&(o=s.breakpoints[i]));null!==o?null!==s.activeBreakpoint?(o!==s.activeBreakpoint||n)&&(s.activeBreakpoint=o,"unslick"===s.breakpointSettings[o]?s.unslick(o):(s.options=t.extend({},s.originalSettings,s.breakpointSettings[o]),!0===e&&(s.currentSlide=s.options.initialSlide),s.refresh(e)),a=o):(s.activeBreakpoint=o,"unslick"===s.breakpointSettings[o]?s.unslick(o):(s.options=t.extend({},s.originalSettings,s.breakpointSettings[o]),!0===e&&(s.currentSlide=s.options.initialSlide),s.refresh(e)),a=o):null!==s.activeBreakpoint&&(s.activeBreakpoint=null,s.options=s.originalSettings,!0===e&&(s.currentSlide=s.options.initialSlide),s.refresh(e),a=o),e||!1===a||s.$slider.trigger("breakpoint",[s,a])}},e.prototype.changeSlide=function(e,n){var i,o,r,s=this,a=t(e.currentTarget);switch(a.is("a")&&e.preventDefault(),a.is("li")||(a=a.closest("li")),r=s.slideCount%s.options.slidesToScroll!=0,i=r?0:(s.slideCount-s.currentSlide)%s.options.slidesToScroll,e.data.message){case"previous":o=0===i?s.options.slidesToScroll:s.options.slidesToShow-i,s.slideCount>s.options.slidesToShow&&s.slideHandler(s.currentSlide-o,!1,n);break;case"next":o=0===i?s.options.slidesToScroll:i,s.slideCount>s.options.slidesToShow&&s.slideHandler(s.currentSlide+o,!1,n);break;case"index":var l=0===e.data.index?0:e.data.index||a.index()*s.options.slidesToScroll;s.slideHandler(s.checkNavigable(l),!1,n),a.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(t){var e,n;if(e=this.getNavigableIndexes(),n=0,t>e[e.length-1])t=e[e.length-1];else for(var i in e){if(t<e[i]){t=n;break}n=e[i]}return t},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(t("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",t.proxy(e.interrupt,e,!0)).off("mouseleave.slick",t.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),t(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&t(e.$slideTrack).children().off("click.slick",e.selectHandler),t(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),t(window).off("resize.slick.slick-"+e.instanceUid,e.resize),t("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),t(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",t.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",t.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var t,e=this;e.options.rows>1&&((t=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(t))},e.prototype.clickHandler=function(t){!1===this.shouldClick&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault())},e.prototype.destroy=function(e){var n=this;n.autoPlayClear(),n.touchObject={},n.cleanUpEvents(),t(".slick-cloned",n.$slider).detach(),n.$dots&&n.$dots.remove(),n.$prevArrow&&n.$prevArrow.length&&(n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),n.htmlExpr.test(n.options.prevArrow)&&n.$prevArrow.remove()),n.$nextArrow&&n.$nextArrow.length&&(n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),n.htmlExpr.test(n.options.nextArrow)&&n.$nextArrow.remove()),n.$slides&&(n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){t(this).attr("style",t(this).data("originalStyling"))}),n.$slideTrack.children(this.options.slide).detach(),n.$slideTrack.detach(),n.$list.detach(),n.$slider.append(n.$slides)),n.cleanUpRows(),n.$slider.removeClass("slick-slider"),n.$slider.removeClass("slick-initialized"),n.$slider.removeClass("slick-dotted"),n.unslicked=!0,e||n.$slider.trigger("destroy",[n])},e.prototype.disableTransition=function(t){var e=this,n={};n[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(n):e.$slides.eq(t).css(n)},e.prototype.fadeSlide=function(t,e){var n=this;!1===n.cssTransitions?(n.$slides.eq(t).css({zIndex:n.options.zIndex}),n.$slides.eq(t).animate({opacity:1},n.options.speed,n.options.easing,e)):(n.applyTransition(t),n.$slides.eq(t).css({opacity:1,zIndex:n.options.zIndex}),e&&setTimeout(function(){n.disableTransition(t),e.call()},n.options.speed))},e.prototype.fadeSlideOut=function(t){var e=this;!1===e.cssTransitions?e.$slides.eq(t).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(t),e.$slides.eq(t).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(t){var e=this;null!==t&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(t).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(n){n.stopImmediatePropagation();var i=t(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=i.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var t=this,e=0,n=0,i=0;if(!0===t.options.infinite)if(t.slideCount<=t.options.slidesToShow)++i;else for(;e<t.slideCount;)++i,e=n+t.options.slidesToScroll,n+=t.options.slidesToScroll<=t.options.slidesToShow?t.options.slidesToScroll:t.options.slidesToShow;else if(!0===t.options.centerMode)i=t.slideCount;else if(t.options.asNavFor)for(;e<t.slideCount;)++i,e=n+t.options.slidesToScroll,n+=t.options.slidesToScroll<=t.options.slidesToShow?t.options.slidesToScroll:t.options.slidesToShow;else i=1+Math.ceil((t.slideCount-t.options.slidesToShow)/t.options.slidesToScroll);return i-1},e.prototype.getLeft=function(t){var e,n,i,o,r=this,s=0;return r.slideOffset=0,n=r.$slides.first().outerHeight(!0),!0===r.options.infinite?(r.slideCount>r.options.slidesToShow&&(r.slideOffset=r.slideWidth*r.options.slidesToShow*-1,o=-1,!0===r.options.vertical&&!0===r.options.centerMode&&(2===r.options.slidesToShow?o=-1.5:1===r.options.slidesToShow&&(o=-2)),s=n*r.options.slidesToShow*o),r.slideCount%r.options.slidesToScroll!=0&&t+r.options.slidesToScroll>r.slideCount&&r.slideCount>r.options.slidesToShow&&(t>r.slideCount?(r.slideOffset=(r.options.slidesToShow-(t-r.slideCount))*r.slideWidth*-1,s=(r.options.slidesToShow-(t-r.slideCount))*n*-1):(r.slideOffset=r.slideCount%r.options.slidesToScroll*r.slideWidth*-1,s=r.slideCount%r.options.slidesToScroll*n*-1))):t+r.options.slidesToShow>r.slideCount&&(r.slideOffset=(t+r.options.slidesToShow-r.slideCount)*r.slideWidth,s=(t+r.options.slidesToShow-r.slideCount)*n),r.slideCount<=r.options.slidesToShow&&(r.slideOffset=0,s=0),!0===r.options.centerMode&&r.slideCount<=r.options.slidesToShow?r.slideOffset=r.slideWidth*Math.floor(r.options.slidesToShow)/2-r.slideWidth*r.slideCount/2:!0===r.options.centerMode&&!0===r.options.infinite?r.slideOffset+=r.slideWidth*Math.floor(r.options.slidesToShow/2)-r.slideWidth:!0===r.options.centerMode&&(r.slideOffset=0,r.slideOffset+=r.slideWidth*Math.floor(r.options.slidesToShow/2)),e=!1===r.options.vertical?t*r.slideWidth*-1+r.slideOffset:t*n*-1+s,!0===r.options.variableWidth&&(i=r.slideCount<=r.options.slidesToShow||!1===r.options.infinite?r.$slideTrack.children(".slick-slide").eq(t):r.$slideTrack.children(".slick-slide").eq(t+r.options.slidesToShow),e=!0===r.options.rtl?i[0]?-1*(r.$slideTrack.width()-i[0].offsetLeft-i.width()):0:i[0]?-1*i[0].offsetLeft:0,!0===r.options.centerMode&&(i=r.slideCount<=r.options.slidesToShow||!1===r.options.infinite?r.$slideTrack.children(".slick-slide").eq(t):r.$slideTrack.children(".slick-slide").eq(t+r.options.slidesToShow+1),e=!0===r.options.rtl?i[0]?-1*(r.$slideTrack.width()-i[0].offsetLeft-i.width()):0:i[0]?-1*i[0].offsetLeft:0,e+=(r.$list.width()-i.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(t){return this.options[t]},e.prototype.getNavigableIndexes=function(){var t,e=this,n=0,i=0,o=[];for(!1===e.options.infinite?t=e.slideCount:(n=-1*e.options.slidesToScroll,i=-1*e.options.slidesToScroll,t=2*e.slideCount);n<t;)o.push(n),n=i+e.options.slidesToScroll,i+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return o},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,n,i=this;return n=!0===i.options.centerMode?i.slideWidth*Math.floor(i.options.slidesToShow/2):0,!0===i.options.swipeToSlide?(i.$slideTrack.find(".slick-slide").each(function(o,r){if(r.offsetLeft-n+t(r).outerWidth()/2>-1*i.swipeLeft)return e=r,!1}),Math.abs(t(e).attr("data-slick-index")-i.currentSlide)||1):i.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(t,e){this.changeSlide({data:{message:"index",index:parseInt(t)}},e)},e.prototype.init=function(e){var n=this;t(n.$slider).hasClass("slick-initialized")||(t(n.$slider).addClass("slick-initialized"),n.buildRows(),n.buildOut(),n.setProps(),n.startLoad(),n.loadSlider(),n.initializeEvents(),n.updateArrows(),n.updateDots(),n.checkResponsive(!0),n.focusHandler()),e&&n.$slider.trigger("init",[n]),!0===n.options.accessibility&&n.initADA(),n.options.autoplay&&(n.paused=!1,n.autoPlay())},e.prototype.initADA=function(){var e=this,n=Math.ceil(e.slideCount/e.options.slidesToShow),i=e.getNavigableIndexes().filter(function(t){return t>=0&&t<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(n){var o=i.indexOf(n);t(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+n,tabindex:-1}),-1!==o&&t(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+o})}),e.$dots.attr("role","tablist").find("li").each(function(o){var r=i[o];t(this).attr({role:"presentation"}),t(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+o,"aria-controls":"slick-slide"+e.instanceUid+r,"aria-label":o+1+" of "+n,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var o=e.currentSlide,r=o+e.options.slidesToShow;o<r;o++)e.$slides.eq(o).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var t=this;!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},t.changeSlide),t.$nextArrow.off("click.slick").on("click.slick",{message:"next"},t.changeSlide),!0===t.options.accessibility&&(t.$prevArrow.on("keydown.slick",t.keyHandler),t.$nextArrow.on("keydown.slick",t.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(t("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&t("li",e.$dots).on("mouseenter.slick",t.proxy(e.interrupt,e,!0)).on("mouseleave.slick",t.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",t.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",t.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),t(document).on(e.visibilityChange,t.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&t(e.$slideTrack).children().on("click.slick",e.selectHandler),t(window).on("orientationchange.slick.slick-"+e.instanceUid,t.proxy(e.orientationChange,e)),t(window).on("resize.slick.slick-"+e.instanceUid,t.proxy(e.resize,e)),t("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),t(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),t(e.setPosition)},e.prototype.initUI=function(){var t=this;!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.show(),t.$nextArrow.show()),!0===t.options.dots&&t.slideCount>t.options.slidesToShow&&t.$dots.show()},e.prototype.keyHandler=function(t){var e=this;t.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===t.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===t.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){t("img[data-lazy]",e).each(function(){var e=t(this),n=t(this).attr("data-lazy"),i=t(this).attr("data-srcset"),o=t(this).attr("data-sizes")||r.$slider.attr("data-sizes"),s=document.createElement("img");s.onload=function(){e.animate({opacity:0},100,function(){i&&(e.attr("srcset",i),o&&e.attr("sizes",o)),e.attr("src",n).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,n])})},s.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,n])},s.src=n})}var n,i,o,r=this;if(!0===r.options.centerMode?!0===r.options.infinite?o=(i=r.currentSlide+(r.options.slidesToShow/2+1))+r.options.slidesToShow+2:(i=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),o=r.options.slidesToShow/2+1+2+r.currentSlide):(i=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,o=Math.ceil(i+r.options.slidesToShow),!0===r.options.fade&&(i>0&&i--,o<=r.slideCount&&o++)),n=r.$slider.find(".slick-slide").slice(i,o),"anticipated"===r.options.lazyLoad)for(var s=i-1,a=o,l=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)s<0&&(s=r.slideCount-1),n=(n=n.add(l.eq(s))).add(l.eq(a)),s--,a++;e(n),r.slideCount<=r.options.slidesToShow?e(r.$slider.find(".slick-slide")):r.currentSlide>=r.slideCount-r.options.slidesToShow?e(r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow)):0===r.currentSlide&&e(r.$slider.find(".slick-cloned").slice(-1*r.options.slidesToShow))},e.prototype.loadSlider=function(){var t=this;t.setPosition(),t.$slideTrack.css({opacity:1}),t.$slider.removeClass("slick-loading"),t.initUI(),"progressive"===t.options.lazyLoad&&t.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){this.checkResponsive(),this.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){this.autoPlayClear(),this.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var t=this;t.autoPlay(),t.options.autoplay=!0,t.paused=!1,t.focussed=!1,t.interrupted=!1},e.prototype.postSlide=function(e){var n=this;n.unslicked||(n.$slider.trigger("afterChange",[n,e]),n.animating=!1,n.slideCount>n.options.slidesToShow&&n.setPosition(),n.swipeLeft=null,n.options.autoplay&&n.autoPlay(),!0===n.options.accessibility&&(n.initADA(),n.options.focusOnChange&&t(n.$slides.get(n.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(t){t.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var n,i,o,r,s,a=this,l=t("img[data-lazy]",a.$slider);l.length?(n=l.first(),i=n.attr("data-lazy"),o=n.attr("data-srcset"),r=n.attr("data-sizes")||a.$slider.attr("data-sizes"),(s=document.createElement("img")).onload=function(){o&&(n.attr("srcset",o),r&&n.attr("sizes",r)),n.attr("src",i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===a.options.adaptiveHeight&&a.setPosition(),a.$slider.trigger("lazyLoaded",[a,n,i]),a.progressiveLazyLoad()},s.onerror=function(){e<3?setTimeout(function(){a.progressiveLazyLoad(e+1)},500):(n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),a.$slider.trigger("lazyLoadError",[a,n,i]),a.progressiveLazyLoad())},s.src=i):a.$slider.trigger("allImagesLoaded",[a])},e.prototype.refresh=function(e){var n,i,o=this;i=o.slideCount-o.options.slidesToShow,!o.options.infinite&&o.currentSlide>i&&(o.currentSlide=i),o.slideCount<=o.options.slidesToShow&&(o.currentSlide=0),n=o.currentSlide,o.destroy(!0),t.extend(o,o.initials,{currentSlide:n}),o.init(),e||o.changeSlide({data:{message:"index",index:n}},!1)},e.prototype.registerBreakpoints=function(){var e,n,i,o=this,r=o.options.responsive||null;if("array"===t.type(r)&&r.length){o.respondTo=o.options.respondTo||"window";for(e in r)if(i=o.breakpoints.length-1,r.hasOwnProperty(e)){for(n=r[e].breakpoint;i>=0;)o.breakpoints[i]&&o.breakpoints[i]===n&&o.breakpoints.splice(i,1),i--;o.breakpoints.push(n),o.breakpointSettings[n]=r[e].settings}o.breakpoints.sort(function(t,e){return o.options.mobileFirst?t-e:e-t})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&t(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;t(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=t(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(t,e,n){var i=this;if(t="boolean"==typeof t?!0===(e=t)?0:i.slideCount-1:!0===e?--t:t,i.slideCount<1||t<0||t>i.slideCount-1)return!1;i.unload(),!0===n?i.$slideTrack.children().remove():i.$slideTrack.children(this.options.slide).eq(t).remove(),i.$slides=i.$slideTrack.children(this.options.slide),i.$slideTrack.children(this.options.slide).detach(),i.$slideTrack.append(i.$slides),i.$slidesCache=i.$slides,i.reinit()},e.prototype.setCSS=function(t){var e,n,i=this,o={};!0===i.options.rtl&&(t=-t),e="left"==i.positionProp?Math.ceil(t)+"px":"0px",n="top"==i.positionProp?Math.ceil(t)+"px":"0px",o[i.positionProp]=t,!1===i.transformsEnabled?i.$slideTrack.css(o):(o={},!1===i.cssTransitions?(o[i.animType]="translate("+e+", "+n+")",i.$slideTrack.css(o)):(o[i.animType]="translate3d("+e+", "+n+", 0px)",i.$slideTrack.css(o)))},e.prototype.setDimensions=function(){var t=this;!1===t.options.vertical?!0===t.options.centerMode&&t.$list.css({padding:"0px "+t.options.centerPadding}):(t.$list.height(t.$slides.first().outerHeight(!0)*t.options.slidesToShow),!0===t.options.centerMode&&t.$list.css({padding:t.options.centerPadding+" 0px"})),t.listWidth=t.$list.width(),t.listHeight=t.$list.height(),!1===t.options.vertical&&!1===t.options.variableWidth?(t.slideWidth=Math.ceil(t.listWidth/t.options.slidesToShow),t.$slideTrack.width(Math.ceil(t.slideWidth*t.$slideTrack.children(".slick-slide").length))):!0===t.options.variableWidth?t.$slideTrack.width(5e3*t.slideCount):(t.slideWidth=Math.ceil(t.listWidth),t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0)*t.$slideTrack.children(".slick-slide").length)));var e=t.$slides.first().outerWidth(!0)-t.$slides.first().width();!1===t.options.variableWidth&&t.$slideTrack.children(".slick-slide").width(t.slideWidth-e)},e.prototype.setFade=function(){var e,n=this;n.$slides.each(function(i,o){e=n.slideWidth*i*-1,!0===n.options.rtl?t(o).css({position:"relative",right:e,top:0,zIndex:n.options.zIndex-2,opacity:0}):t(o).css({position:"relative",left:e,top:0,zIndex:n.options.zIndex-2,opacity:0})}),n.$slides.eq(n.currentSlide).css({zIndex:n.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var t=this;if(1===t.options.slidesToShow&&!0===t.options.adaptiveHeight&&!1===t.options.vertical){var e=t.$slides.eq(t.currentSlide).outerHeight(!0);t.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,n,i,o,r,s=this,a=!1;if("object"===t.type(arguments[0])?(i=arguments[0],a=arguments[1],r="multiple"):"string"===t.type(arguments[0])&&(i=arguments[0],o=arguments[1],a=arguments[2],"responsive"===arguments[0]&&"array"===t.type(arguments[1])?r="responsive":void 0!==arguments[1]&&(r="single")),"single"===r)s.options[i]=o;else if("multiple"===r)t.each(i,function(t,e){s.options[t]=e});else if("responsive"===r)for(n in o)if("array"!==t.type(s.options.responsive))s.options.responsive=[o[n]];else{for(e=s.options.responsive.length-1;e>=0;)s.options.responsive[e].breakpoint===o[n].breakpoint&&s.options.responsive.splice(e,1),e--;s.options.responsive.push(o[n])}a&&(s.unload(),s.reinit())},e.prototype.setPosition=function(){var t=this;t.setDimensions(),t.setHeight(),!1===t.options.fade?t.setCSS(t.getLeft(t.currentSlide)):t.setFade(),t.$slider.trigger("setPosition",[t])},e.prototype.setProps=function(){var t=this,e=document.body.style;t.positionProp=!0===t.options.vertical?"top":"left","top"===t.positionProp?t.$slider.addClass("slick-vertical"):t.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===t.options.useCSS&&(t.cssTransitions=!0),t.options.fade&&("number"==typeof t.options.zIndex?t.options.zIndex<3&&(t.options.zIndex=3):t.options.zIndex=t.defaults.zIndex),void 0!==e.OTransform&&(t.animType="OTransform",t.transformType="-o-transform",t.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(t.animType=!1)),void 0!==e.MozTransform&&(t.animType="MozTransform",t.transformType="-moz-transform",t.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(t.animType=!1)),void 0!==e.webkitTransform&&(t.animType="webkitTransform",t.transformType="-webkit-transform",t.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(t.animType=!1)),void 0!==e.msTransform&&(t.animType="msTransform",t.transformType="-ms-transform",t.transitionType="msTransition",void 0===e.msTransform&&(t.animType=!1)),void 0!==e.transform&&!1!==t.animType&&(t.animType="transform",t.transformType="transform",t.transitionType="transition"),t.transformsEnabled=t.options.useTransform&&null!==t.animType&&!1!==t.animType},e.prototype.setSlideClasses=function(t){var e,n,i,o,r=this;if(n=r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),r.$slides.eq(t).addClass("slick-current"),!0===r.options.centerMode){var s=r.options.slidesToShow%2==0?1:0;e=Math.floor(r.options.slidesToShow/2),!0===r.options.infinite&&(t>=e&&t<=r.slideCount-1-e?r.$slides.slice(t-e+s,t+e+1).addClass("slick-active").attr("aria-hidden","false"):(i=r.options.slidesToShow+t,n.slice(i-e+1+s,i+e+2).addClass("slick-active").attr("aria-hidden","false")),0===t?n.eq(n.length-1-r.options.slidesToShow).addClass("slick-center"):t===r.slideCount-1&&n.eq(r.options.slidesToShow).addClass("slick-center")),r.$slides.eq(t).addClass("slick-center")}else t>=0&&t<=r.slideCount-r.options.slidesToShow?r.$slides.slice(t,t+r.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):n.length<=r.options.slidesToShow?n.addClass("slick-active").attr("aria-hidden","false"):(o=r.slideCount%r.options.slidesToShow,i=!0===r.options.infinite?r.options.slidesToShow+t:t,r.options.slidesToShow==r.options.slidesToScroll&&r.slideCount-t<r.options.slidesToShow?n.slice(i-(r.options.slidesToShow-o),i+o).addClass("slick-active").attr("aria-hidden","false"):n.slice(i,i+r.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==r.options.lazyLoad&&"anticipated"!==r.options.lazyLoad||r.lazyLoad()},e.prototype.setupInfinite=function(){var e,n,i,o=this;if(!0===o.options.fade&&(o.options.centerMode=!1),!0===o.options.infinite&&!1===o.options.fade&&(n=null,o.slideCount>o.options.slidesToShow)){for(i=!0===o.options.centerMode?o.options.slidesToShow+1:o.options.slidesToShow,e=o.slideCount;e>o.slideCount-i;e-=1)n=e-1,t(o.$slides[n]).clone(!0).attr("id","").attr("data-slick-index",n-o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");for(e=0;e<i+o.slideCount;e+=1)n=e,t(o.$slides[n]).clone(!0).attr("id","").attr("data-slick-index",n+o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");o.$slideTrack.find(".slick-cloned").find("[id]").each(function(){t(this).attr("id","")})}},e.prototype.interrupt=function(t){t||this.autoPlay(),this.interrupted=t},e.prototype.selectHandler=function(e){var n=this,i=t(e.target).is(".slick-slide")?t(e.target):t(e.target).parents(".slick-slide"),o=parseInt(i.attr("data-slick-index"));o||(o=0),n.slideCount<=n.options.slidesToShow?n.slideHandler(o,!1,!0):n.slideHandler(o)},e.prototype.slideHandler=function(t,e,n){var i,o,r,s,a,l=null,c=this;if(e=e||!1,!(!0===c.animating&&!0===c.options.waitForAnimate||!0===c.options.fade&&c.currentSlide===t))if(!1===e&&c.asNavFor(t),i=t,l=c.getLeft(i),s=c.getLeft(c.currentSlide),c.currentLeft=null===c.swipeLeft?s:c.swipeLeft,!1===c.options.infinite&&!1===c.options.centerMode&&(t<0||t>c.getDotCount()*c.options.slidesToScroll))!1===c.options.fade&&(i=c.currentSlide,!0!==n?c.animateSlide(s,function(){c.postSlide(i)}):c.postSlide(i));else if(!1===c.options.infinite&&!0===c.options.centerMode&&(t<0||t>c.slideCount-c.options.slidesToScroll))!1===c.options.fade&&(i=c.currentSlide,!0!==n?c.animateSlide(s,function(){c.postSlide(i)}):c.postSlide(i));else{if(c.options.autoplay&&clearInterval(c.autoPlayTimer),o=i<0?c.slideCount%c.options.slidesToScroll!=0?c.slideCount-c.slideCount%c.options.slidesToScroll:c.slideCount+i:i>=c.slideCount?c.slideCount%c.options.slidesToScroll!=0?0:i-c.slideCount:i,c.animating=!0,c.$slider.trigger("beforeChange",[c,c.currentSlide,o]),r=c.currentSlide,c.currentSlide=o,c.setSlideClasses(c.currentSlide),c.options.asNavFor&&(a=(a=c.getNavTarget()).slick("getSlick")).slideCount<=a.options.slidesToShow&&a.setSlideClasses(c.currentSlide),c.updateDots(),c.updateArrows(),!0===c.options.fade)return!0!==n?(c.fadeSlideOut(r),c.fadeSlide(o,function(){c.postSlide(o)})):c.postSlide(o),void c.animateHeight();!0!==n?c.animateSlide(l,function(){c.postSlide(o)}):c.postSlide(o)}},e.prototype.startLoad=function(){var t=this;!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.hide(),t.$nextArrow.hide()),!0===t.options.dots&&t.slideCount>t.options.slidesToShow&&t.$dots.hide(),t.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var t,e,n,i,o=this;return t=o.touchObject.startX-o.touchObject.curX,e=o.touchObject.startY-o.touchObject.curY,n=Math.atan2(e,t),(i=Math.round(180*n/Math.PI))<0&&(i=360-Math.abs(i)),i<=45&&i>=0?!1===o.options.rtl?"left":"right":i<=360&&i>=315?!1===o.options.rtl?"left":"right":i>=135&&i<=225?!1===o.options.rtl?"right":"left":!0===o.options.verticalSwiping?i>=35&&i<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(t){var e,n,i=this;if(i.dragging=!1,i.swiping=!1,i.scrolling)return i.scrolling=!1,!1;if(i.interrupted=!1,i.shouldClick=!(i.touchObject.swipeLength>10),void 0===i.touchObject.curX)return!1;if(!0===i.touchObject.edgeHit&&i.$slider.trigger("edge",[i,i.swipeDirection()]),i.touchObject.swipeLength>=i.touchObject.minSwipe){switch(n=i.swipeDirection()){case"left":case"down":e=i.options.swipeToSlide?i.checkNavigable(i.currentSlide+i.getSlideCount()):i.currentSlide+i.getSlideCount(),i.currentDirection=0;break;case"right":case"up":e=i.options.swipeToSlide?i.checkNavigable(i.currentSlide-i.getSlideCount()):i.currentSlide-i.getSlideCount(),i.currentDirection=1}"vertical"!=n&&(i.slideHandler(e),i.touchObject={},i.$slider.trigger("swipe",[i,n]))}else i.touchObject.startX!==i.touchObject.curX&&(i.slideHandler(i.currentSlide),i.touchObject={})},e.prototype.swipeHandler=function(t){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==t.type.indexOf("mouse")))switch(e.touchObject.fingerCount=t.originalEvent&&void 0!==t.originalEvent.touches?t.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),t.data.action){case"start":e.swipeStart(t);break;case"move":e.swipeMove(t);break;case"end":e.swipeEnd(t)}},e.prototype.swipeMove=function(t){var e,n,i,o,r,s,a=this;return r=void 0!==t.originalEvent?t.originalEvent.touches:null,!(!a.dragging||a.scrolling||r&&1!==r.length)&&(e=a.getLeft(a.currentSlide),a.touchObject.curX=void 0!==r?r[0].pageX:t.clientX,a.touchObject.curY=void 0!==r?r[0].pageY:t.clientY,a.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(a.touchObject.curX-a.touchObject.startX,2))),s=Math.round(Math.sqrt(Math.pow(a.touchObject.curY-a.touchObject.startY,2))),!a.options.verticalSwiping&&!a.swiping&&s>4?(a.scrolling=!0,!1):(!0===a.options.verticalSwiping&&(a.touchObject.swipeLength=s),n=a.swipeDirection(),void 0!==t.originalEvent&&a.touchObject.swipeLength>4&&(a.swiping=!0,t.preventDefault()),o=(!1===a.options.rtl?1:-1)*(a.touchObject.curX>a.touchObject.startX?1:-1),!0===a.options.verticalSwiping&&(o=a.touchObject.curY>a.touchObject.startY?1:-1),i=a.touchObject.swipeLength,a.touchObject.edgeHit=!1,!1===a.options.infinite&&(0===a.currentSlide&&"right"===n||a.currentSlide>=a.getDotCount()&&"left"===n)&&(i=a.touchObject.swipeLength*a.options.edgeFriction,a.touchObject.edgeHit=!0),!1===a.options.vertical?a.swipeLeft=e+i*o:a.swipeLeft=e+i*(a.$list.height()/a.listWidth)*o,!0===a.options.verticalSwiping&&(a.swipeLeft=e+i*o),!0!==a.options.fade&&!1!==a.options.touchMove&&(!0===a.animating?(a.swipeLeft=null,!1):void a.setCSS(a.swipeLeft))))},e.prototype.swipeStart=function(t){var e,n=this;if(n.interrupted=!0,1!==n.touchObject.fingerCount||n.slideCount<=n.options.slidesToShow)return n.touchObject={},!1;void 0!==t.originalEvent&&void 0!==t.originalEvent.touches&&(e=t.originalEvent.touches[0]),n.touchObject.startX=n.touchObject.curX=void 0!==e?e.pageX:t.clientX,n.touchObject.startY=n.touchObject.curY=void 0!==e?e.pageY:t.clientY,n.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var t=this;null!==t.$slidesCache&&(t.unload(),t.$slideTrack.children(this.options.slide).detach(),t.$slidesCache.appendTo(t.$slideTrack),t.reinit())},e.prototype.unload=function(){var e=this;t(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(t){var e=this;e.$slider.trigger("unslick",[e,t]),e.destroy()},e.prototype.updateArrows=function(){var t=this;Math.floor(t.options.slidesToShow/2),!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&!t.options.infinite&&(t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===t.currentSlide?(t.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):t.currentSlide>=t.slideCount-t.options.slidesToShow&&!1===t.options.centerMode?(t.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):t.currentSlide>=t.slideCount-1&&!0===t.options.centerMode&&(t.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var t=this;null!==t.$dots&&(t.$dots.find("li").removeClass("slick-active").end(),t.$dots.find("li").eq(Math.floor(t.currentSlide/t.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var t=this;t.options.autoplay&&(document[t.hidden]?t.interrupted=!0:t.interrupted=!1)},t.fn.slick=function(){var t,n,i=this,o=arguments[0],r=Array.prototype.slice.call(arguments,1),s=i.length;for(t=0;t<s;t++)if("object"==typeof o||void 0===o?i[t].slick=new e(i[t],o):n=i[t].slick[o].apply(i[t].slick,r),void 0!==n)return n;return i}}),function(t,e,n,i){"use strict";function o(t){var e=n(t.currentTarget),i=t.data?t.data.options:{},o=e.attr("data-fancybox")||"",r=0,s=[];t.isDefaultPrevented()||(t.preventDefault(),o?(s=i.selector?n(i.selector):t.data?t.data.items:[],s=s.length?s.filter('[data-fancybox="'+o+'"]'):n('[data-fancybox="'+o+'"]'),(r=s.index(e))<0&&(r=0)):s=[e],n.fancybox.open(s,i,r))}if(n){if(n.fn.fancybox)return void("console"in t&&console.log("fancyBox already initialized"));var r={loop:!1,margin:[44,0],gutter:50,keyboard:!0,arrows:!0,infobar:!0,toolbar:!0,buttons:["slideShow","fullScreen","thumbs","share","close"],idleTime:3,smallBtn:"auto",protect:!1,modal:!1,image:{preload:"auto"},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},animationEffect:"zoom",animationDuration:500,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}<p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M9,28 L31,28" /></svg></a>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',smallBtn:'<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'},parentEl:"body",autoFocus:!1,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:4e3},thumbs:{autoStart:!1,hideOnClose:!0},onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share"},de:{CLOSE:"Schliessen",NEXT:"Weiter",PREV:"Zurück",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen"}}},s=n(t),a=n(e),l=0,c=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)},u=function(){var t,n=e.createElement("fakeelement"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in o)if(n.style[t]!==i)return o[t]}(),d=function(t){return t&&t.length&&t[0].offsetHeight},p=function(t,i,o){var s=this;s.opts=n.extend(!0,{index:o},r,i||{}),n.fancybox.isMobile&&(s.opts=n.extend(!0,{},s.opts,s.opts.mobile)),i&&n.isArray(i.buttons)&&(s.opts.buttons=i.buttons),s.id=s.opts.id||++l,s.group=[],s.currIndex=parseInt(s.opts.index,10)||0,s.prevIndex=null,s.prevPos=null,s.currPos=0,s.firstRun=null,s.createGroup(t),s.group.length&&(s.$lastFocus=n(e.activeElement).blur(),s.slides={},s.init(t))};n.extend(p.prototype,{init:function(){var o,r,s,l=this,c=l.group[l.currIndex],u=c.opts,d=n.fancybox.scrollbarWidth;l.scrollTop=a.scrollTop(),l.scrollLeft=a.scrollLeft(),n.fancybox.getInstance()||(n("body").addClass("fancybox-active"),/iPad|iPhone|iPod/.test(navigator.userAgent)&&!t.MSStream?"image"!==c.type&&n("body").css("top",-1*n("body").scrollTop()).addClass("fancybox-iosfix"):!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(d===i&&(o=n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"),d=n.fancybox.scrollbarWidth=o[0].offsetWidth-o[0].clientWidth,o.remove()),n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: '+d+"px; }</style>"),n("body").addClass("compensate-for-scrollbar"))),s="",n.each(u.buttons,function(t,e){s+=u.btnTpl[e]||""}),r=n(l.translate(l,u.baseTpl.replace("{{buttons}}",s).replace("{{arrows}}",u.btnTpl.arrowLeft+u.btnTpl.arrowRight))).attr("id","fancybox-container-"+l.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox",l).prependTo(u.parentEl),l.$refs={container:r},["bg","inner","infobar","toolbar","stage","caption"].forEach(function(t){l.$refs[t]=r.find(".fancybox-"+t)}),l.trigger("onInit"),l.activate(),l.jumpTo(l.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang];return e.replace(/\{\{(\w+)\}\}/g,function(t,e){var o=n[e];return o===i?t:o})},createGroup:function(t){var e=this,o=n.makeArray(t);n.each(o,function(t,o){var r,s,a,l,c={},u={};n.isPlainObject(o)?(c=o,u=o.opts||o):"object"===n.type(o)&&n(o).length?(r=n(o),u=r.data(),u=n.extend({},u,u.options||{}),u.$orig=r,c.src=u.src||r.attr("href"),c.type||c.src||(c.type="inline",c.src=o)):c={type:"html",src:o+""},c.opts=n.extend(!0,{},e.opts,u),n.isArray(u.buttons)&&(c.opts.buttons=u.buttons),s=c.type||c.opts.type,a=c.src||"",!s&&a&&(a.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?s="image":a.match(/\.(pdf)((\?|#).*)?$/i)?s="pdf":"#"===a.charAt(0)&&(s="inline")),c.type=s,c.index=e.group.length,c.opts.$orig&&!c.opts.$orig.length&&delete c.opts.$orig,!c.opts.$thumb&&c.opts.$orig&&(c.opts.$thumb=c.opts.$orig.find("img:first")),c.opts.$thumb&&!c.opts.$thumb.length&&delete c.opts.$thumb,"function"===n.type(e.opts.caption)&&(c.opts.caption=e.opts.caption.apply(o,[e,c])),!c.opts.caption instanceof jQuery&&(c.opts.caption=c.opts.caption===i?"":c.opts.caption+""),"ajax"===s&&(l=a.split(/\s+/,2)).length>1&&(c.src=l.shift(),c.opts.filter=l.shift()),"auto"==c.opts.smallBtn&&(n.inArray(s,["html","inline","ajax"])>-1?(c.opts.toolbar=!1,c.opts.smallBtn=!0):c.opts.smallBtn=!1),"pdf"===s&&(c.type="iframe",c.opts.iframe.preload=!1),c.opts.modal&&(c.opts=n.extend(!0,c.opts,{infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),e.group.push(c)})},addEvents:function(){var i=this;i.removeEvents(),i.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),i.close(t)}).on("click.fb-prev touchend.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),i.previous()}).on("click.fb-next touchend.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),i.next()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?c(function(){i.update()}):(i.$refs.stage.hide(),setTimeout(function(){i.$refs.stage.show(),i.update()},600))}),a.on("focusin.fb",function(t){var o=n.fancybox?n.fancybox.getInstance():null;o.isClosing||!o.current||!o.current.opts.trapFocus||n(t.target).hasClass("fancybox-container")||n(t.target).is(e)||o&&"fixed"!==n(t.target).css("position")&&!o.$refs.container.has(t.target).length&&(t.stopPropagation(),o.focus(),s.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))}),a.on("keydown.fb",function(t){var e=i.current,o=t.keyCode||t.which;if(e&&e.opts.keyboard&&!n(t.target).is("input")&&!n(t.target).is("textarea"))return 8===o||27===o?(t.preventDefault(),void i.close(t)):37===o||38===o?(t.preventDefault(),void i.previous()):39===o||40===o?(t.preventDefault(),void i.next()):void i.trigger("afterKeydown",t,o)}),i.group[i.currIndex].opts.idleTime&&(i.idleSecondsCounter=0,a.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){i.idleSecondsCounter=0,i.isIdle&&i.showControls(),i.isIdle=!1}),i.idleInterval=t.setInterval(function(){i.idleSecondsCounter++,i.idleSecondsCounter>=i.group[i.currIndex].opts.idleTime&&(i.isIdle=!0,i.idleSecondsCounter=0,i.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),a.off("focusin.fb keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e,o){var r,s,a,l,c,u,p,h=this,f=h.group.length;if(!(h.isSliding||h.isClosing||h.isAnimating&&h.firstRun)){if(t=parseInt(t,10),!(s=h.current?h.current.opts.loop:h.opts.loop)&&(t<0||t>=f))return!1;if(r=h.firstRun=null===h.firstRun,!(f<2&&!r&&h.isSliding)){if(l=h.current,h.prevIndex=h.currIndex,h.prevPos=h.currPos,a=h.createSlide(t),f>1&&((s||a.index>0)&&h.createSlide(t-1),(s||a.index<f-1)&&h.createSlide(t+1)),h.current=a,h.currIndex=a.index,h.currPos=a.pos,h.trigger("beforeShow",r),h.updateControls(),u=n.fancybox.getTranslate(a.$slide),a.isMoved=(0!==u.left||0!==u.top)&&!a.$slide.hasClass("fancybox-animated"),a.forcedDuration=i,n.isNumeric(e)?a.forcedDuration=e:e=a.opts[r?"animationDuration":"transitionDuration"],e=parseInt(e,10),r)return a.opts.animationEffect&&e&&h.$refs.container.css("transition-duration",e+"ms"),h.$refs.container.removeClass("fancybox-is-hidden"),d(h.$refs.container),h.$refs.container.addClass("fancybox-is-open"),a.$slide.addClass("fancybox-slide--current"),h.loadSlide(a),void h.preload();n.each(h.slides,function(t,e){n.fancybox.stop(e.$slide)}),a.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"),a.isMoved?(c=Math.round(a.$slide.width()),n.each(h.slides,function(t,i){var o=i.pos-a.pos;n.fancybox.animate(i.$slide,{top:0,left:o*c+o*i.opts.gutter},e,function(){i.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"),i.pos===h.currPos&&(a.isMoved=!1,h.complete())})})):h.$refs.stage.children().removeAttr("style"),a.isLoaded?h.revealContent(a):h.loadSlide(a),h.preload(),l.pos!==a.pos&&(p="fancybox-slide--"+(l.pos>a.pos?"next":"previous"),l.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"),l.isComplete=!1,e&&(a.isMoved||a.opts.transitionEffect)&&(a.isMoved?l.$slide.addClass(p):(p="fancybox-animated "+p+" fancybox-fx-"+a.opts.transitionEffect,n.fancybox.animate(l.$slide,p,e,function(){l.$slide.removeClass(p).removeAttr("style")}))))}}},createSlide:function(t){var e,i,o=this;return i=t%o.group.length,i=i<0?o.group.length+i:i,!o.slides[t]&&o.group[i]&&(e=n('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage),o.slides[t]=n.extend(!0,{},o.group[i],{pos:t,$slide:e,isLoaded:!1}),o.updateSlide(o.slides[t])),o.slides[t]},scaleToActual:function(t,e,o){var r,s,a,l,c,u=this,d=u.current,p=d.$content,h=parseInt(d.$slide.width(),10),f=parseInt(d.$slide.height(),10),m=d.width,g=d.height;"image"!=d.type||d.hasError||!p||u.isAnimating||(n.fancybox.stop(p),u.isAnimating=!0,t=t===i?.5*h:t,e=e===i?.5*f:e,r=n.fancybox.getTranslate(p),l=m/r.width,c=g/r.height,s=.5*h-.5*m,a=.5*f-.5*g,m>h&&((s=r.left*l-(t*l-t))>0&&(s=0),s<h-m&&(s=h-m)),g>f&&((a=r.top*c-(e*c-e))>0&&(a=0),a<f-g&&(a=f-g)),u.updateCursor(m,g),n.fancybox.animate(p,{top:a,left:s,scaleX:l,scaleY:c},o||330,function(){u.isAnimating=!1}),u.SlideShow&&u.SlideShow.isActive&&u.SlideShow.stop())},scaleToFit:function(t){var e,i=this,o=i.current,r=o.$content;"image"!=o.type||o.hasError||!r||i.isAnimating||(n.fancybox.stop(r),i.isAnimating=!0,e=i.getFitPos(o),i.updateCursor(e.width,e.height),n.fancybox.animate(r,{top:e.top,left:e.left,scaleX:e.width/r.width(),scaleY:e.height/r.height()},t||330,function(){i.isAnimating=!1}))},getFitPos:function(t){var e,i,o,r,a,l=t.$content,c=t.width,u=t.height,d=t.opts.margin;return!(!l||!l.length||!c&&!u)&&("number"===n.type(d)&&(d=[d,d]),2==d.length&&(d=[d[0],d[1],d[0],d[1]]),s.width()<800&&(d=[0,0,0,0]),e=parseInt(this.$refs.stage.width(),10)-(d[1]+d[3]),i=parseInt(this.$refs.stage.height(),10)-(d[0]+d[2]),o=Math.min(1,e/c,i/u),r=Math.floor(o*c),a=Math.floor(o*u),{top:Math.floor(.5*(i-a))+d[0],left:Math.floor(.5*(e-r))+d[3],width:r,height:a})},update:function(){var t=this;n.each(t.slides,function(e,n){t.updateSlide(n)})},updateSlide:function(t){var e=this,i=t.$content;i&&(t.width||t.height)&&(n.fancybox.stop(i),n.fancybox.setTranslate(i,e.getFitPos(t)),t.pos===e.currPos&&e.updateCursor()),t.$slide.trigger("refresh"),e.trigger("onUpdate",t)},updateCursor:function(t,e){var n=this,o=n.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");n.current&&!n.isClosing&&(n.isZoomable()?(o.addClass("fancybox-is-zoomable"),(t!==i&&e!==i?t<n.current.width&&e<n.current.height:n.isScaledDown())?o.addClass("fancybox-can-zoomIn"):n.current.opts.touch?o.addClass("fancybox-can-drag"):o.addClass("fancybox-can-zoomOut")):n.current.opts.touch&&o.addClass("fancybox-can-drag"))},isZoomable:function(){var t,e=this,i=e.current;if(i&&!e.isClosing)return!!("image"===i.type&&i.isLoaded&&!i.hasError&&("zoom"===i.opts.clickContent||n.isFunction(i.opts.clickContent)&&"zoom"===i.opts.clickContent(i))&&(t=e.getFitPos(i),i.width>t.width||i.height>t.height))},isScaledDown:function(){var t=this.current,e=t.$content,i=!1;return e&&(i=n.fancybox.getTranslate(e),i=i.width<t.width||i.height<t.height),i},canPan:function(){var t=this.current,e=t.$content,n=!1;return e&&(n=this.getFitPos(t),n=Math.abs(e.width()-n.width)>1||Math.abs(e.height()-n.height)>1),n},loadSlide:function(t){var e,i,o,r=this;if(!t.isLoading&&!t.isLoaded){switch(t.isLoading=!0,r.trigger("beforeLoad",t),e=t.type,(i=t.$slide).off("refresh").trigger("onReset").addClass("fancybox-slide--"+(e||"unknown")).addClass(t.opts.slideClass),e){case"image":r.setImage(t);break;case"iframe":r.setIframe(t);break;case"html":r.setContent(t,t.src||t.content);break;case"inline":n(t.src).length?r.setContent(t,n(t.src)):r.setError(t);break;case"ajax":r.showLoading(t),o=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&r.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&r.setError(t)}})),i.one("onReset",function(){o.abort()});break;default:r.setError(t)}return!0}},setImage:function(e){var i,o,r,s,a=this,l=e.opts.srcset||e.opts.image.srcset;if(l){r=t.devicePixelRatio||1,s=t.innerWidth*r,(o=l.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var i=parseInt(t.substring(0,t.length-1),10);return 0===n?e.url=t:void(i&&(e.value=i,e.postfix=t[t.length-1]))}),e})).sort(function(t,e){return t.value-e.value});for(var c=0;c<o.length;c++){var u=o[c];if("w"===u.postfix&&u.value>=s||"x"===u.postfix&&u.value>=r){i=u;break}}!i&&o.length&&(i=o[o.length-1]),i&&(e.src=i.url,e.width&&e.height&&"w"==i.postfix&&(e.height=e.width/e.height*i.value,e.width=i.value))}e.$content=n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide),!1!==e.opts.preload&&e.opts.width&&e.opts.height&&(e.opts.thumb||e.opts.$thumb)?(e.width=e.opts.width,e.height=e.opts.height,e.$ghost=n("<img />").one("error",function(){n(this).remove(),e.$ghost=null,a.setBigImage(e)}).one("load",function(){a.afterLoad(e),a.setBigImage(e)}).addClass("fancybox-image").appendTo(e.$content).attr("src",e.opts.thumb||e.opts.$thumb.attr("src"))):a.setBigImage(e)},setBigImage:function(t){var e=this,i=n("<img />");t.$image=i.one("error",function(){e.setError(t)}).one("load",function(){clearTimeout(t.timouts),t.timouts=null,e.isClosing||(t.width=this.naturalWidth,t.height=this.naturalHeight,t.opts.image.srcset&&i.attr("sizes","100vw").attr("srcset",t.opts.image.srcset),e.hideLoading(t),t.$ghost?t.timouts=setTimeout(function(){t.timouts=null,t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))):e.afterLoad(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(i[0].complete||"complete"==i[0].readyState)&&i[0].naturalWidth&&i[0].naturalHeight?i.trigger("load"):i[0].error?i.trigger("error"):t.timouts=setTimeout(function(){i[0].complete||t.hasError||e.showLoading(t)},100)},setIframe:function(t){var e,o=this,r=t.opts.iframe,s=t.$slide;t.$content=n('<div class="fancybox-content'+(r.preload?" fancybox-is-hidden":"")+'"></div>').css(r.css).appendTo(s),e=n(r.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(r.attr).appendTo(t.$content),r.preload?(o.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),o.afterLoad(t)}),s.on("refresh.fb",function(){var n,o,s=t.$content,a=r.css.width,l=r.css.height;if(1===e[0].isReady){try{o=e.contents().find("body")}catch(t){}o&&o.length&&(a===i&&(n=e[0].contentWindow.document.documentElement.scrollWidth,a=Math.ceil(o.outerWidth(!0)+(s.width()-n)),a+=s.outerWidth()-s.innerWidth()),l===i&&(l=Math.ceil(o.outerHeight(!0)),l+=s.outerHeight()-s.innerHeight()),a&&s.width(a),l&&s.height(l)),s.removeClass("fancybox-is-hidden")}})):this.afterLoad(t),e.attr("src",t.src),!0===t.opts.smallBtn&&t.$content.prepend(o.translate(t,t.opts.btnTpl.smallBtn)),s.one("onReset",function(){try{n(this).find("iframe").hide().attr("src","//about:blank")}catch(t){}n(this).empty(),t.isLoaded=!1})},setContent:function(t,e){var i=this;i.isClosing||(i.hideLoading(t),t.$slide.empty(),function(t){return t&&t.hasOwnProperty&&t instanceof n}(e)&&e.parent().length?(e.parent(".fancybox-slide--inline").trigger("onReset"),t.$placeholder=n("<div></div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&3===(e=n("<div>").append(n.trim(e)).contents())[0].nodeType&&(e=n("<div>").html(e)),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){t.$placeholder&&(t.$placeholder.after(e.hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1)}),t.$content=n(e).appendTo(t.$slide),t.opts.smallBtn&&!t.$smallBtn&&(t.$smallBtn=n(i.translate(t,t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div").first())),this.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.removeClass("fancybox-slide--"+t.type),this.setContent(t,this.translate(t,t.opts.errorTpl))},showLoading:function(t){(t=t||this.current)&&!t.$spinner&&(t.$spinner=n(this.opts.spinnerTpl).appendTo(t.$slide))},hideLoading:function(t){(t=t||this.current)&&t.$spinner&&(t.$spinner.remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.revealContent(t))},revealContent:function(t){var e,o,r,s,a,l=this,c=t.$slide,u=!1;return e=t.opts[l.firstRun?"animationEffect":"transitionEffect"],r=t.opts[l.firstRun?"animationDuration":"transitionDuration"],r=parseInt(t.forcedDuration===i?r:t.forcedDuration,10),!t.isMoved&&t.pos===l.currPos&&r||(e=!1),"zoom"!==e||t.pos===l.currPos&&r&&"image"===t.type&&!t.hasError&&(u=l.getThumbPos(t))||(e="fade"),"zoom"===e?(a=l.getFitPos(t),a.scaleX=a.width/u.width,a.scaleY=a.height/u.height,delete a.width,delete a.height,"auto"==(s=t.opts.zoomOpacity)&&(s=Math.abs(t.width/t.height-u.width/u.height)>.1),s&&(u.opacity=.1,a.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),u),d(t.$content),void n.fancybox.animate(t.$content,a,r,function(){l.complete()})):(l.updateSlide(t),e?(n.fancybox.stop(c),o="fancybox-animated fancybox-slide--"+(t.pos>=l.prevPos?"next":"previous")+" fancybox-fx-"+e,c.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(o),t.$content.removeClass("fancybox-is-hidden"),d(c),void n.fancybox.animate(c,"fancybox-slide--current",r,function(e){c.removeClass(o).removeAttr("style"),t.pos===l.currPos&&l.complete()},!0)):(d(c),t.$content.removeClass("fancybox-is-hidden"),void(t.pos===l.currPos&&l.complete())))},getThumbPos:function(i){var o,r=!1,s=i.opts.$thumb,a=s?s.offset():0;return a&&s[0].ownerDocument===e&&function(e){for(var i=e[0],o=i.getBoundingClientRect(),r=[];null!==i.parentElement;)"hidden"!==n(i.parentElement).css("overflow")&&"auto"!==n(i.parentElement).css("overflow")||r.push(i.parentElement.getBoundingClientRect()),i=i.parentElement;return r.every(function(t){var e=Math.min(o.right,t.right)-Math.max(o.left,t.left),n=Math.min(o.bottom,t.bottom)-Math.max(o.top,t.top);return e>0&&n>0})&&o.bottom>0&&o.right>0&&o.left<n(t).width()&&o.top<n(t).height()}(s)&&(o=this.$refs.stage.offset(),r={top:a.top-o.top+parseFloat(s.css("border-top-width")||0),left:a.left-o.left+parseFloat(s.css("border-left-width")||0),width:s.width(),height:s.height(),scaleX:1,scaleY:1}),r},complete:function(){var t=this,i=t.current,o={};i.isMoved||!i.isLoaded||i.isComplete||(i.isComplete=!0,i.$slide.siblings().trigger("onReset"),d(i.$slide),i.$slide.addClass("fancybox-slide--complete"),n.each(t.slides,function(e,i){i.pos>=t.currPos-1&&i.pos<=t.currPos+1?o[i.pos]=i:i&&(n.fancybox.stop(i.$slide),i.$slide.off().remove())}),t.slides=o,t.updateCursor(),t.trigger("afterShow"),(n(e.activeElement).is("[disabled]")||i.opts.autoFocus&&"image"!=i.type&&"iframe"!==i.type)&&t.focus())},preload:function(){var t,e,n=this;n.group.length<2||(t=n.slides[n.currPos+1],e=n.slides[n.currPos-1],t&&"image"===t.type&&n.loadSlide(t),e&&"image"===e.type&&n.loadSlide(e))},focus:function(){var t,e=this.current;this.isClosing||(e&&e.isComplete&&((t=e.$slide.find("input[autofocus]:enabled:visible:first")).length||(t=e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))),(t=t&&t.length?t:this.$refs.container).focus())},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&e.trigger("onDeactivate")}),(t.current||t.isIdle)&&(t.$refs.container.index()>0&&t.$refs.container.prependTo(e.body),t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var i,o,r,s,a,l,d=this,p=d.current,h=function(){d.cleanUp(t)};return!(d.isClosing||(d.isClosing=!0,!1===d.trigger("beforeClose",t)?(d.isClosing=!1,c(function(){d.update()}),1):(d.removeEvents(),p.timouts&&clearTimeout(p.timouts),r=p.$content,i=p.opts.animationEffect,o=n.isNumeric(e)?e:i?p.opts.animationDuration:0,p.$slide.off(u).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),p.$slide.siblings().trigger("onReset").remove(),o&&d.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"),d.hideLoading(p),d.hideControls(),d.updateCursor(),"zoom"!==i||!0!==t&&r&&o&&"image"===p.type&&!p.hasError&&(l=d.getThumbPos(p))||(i="fade"),"zoom"===i?(n.fancybox.stop(r),a=n.fancybox.getTranslate(r),a.width=a.width*a.scaleX,a.height=a.height*a.scaleY,"auto"==(s=p.opts.zoomOpacity)&&(s=Math.abs(p.width/p.height-l.width/l.height)>.1),s&&(l.opacity=0),a.scaleX=a.width/l.width,a.scaleY=a.height/l.height,a.width=l.width,a.height=l.height,n.fancybox.setTranslate(p.$content,a),n.fancybox.animate(p.$content,l,o,h),0):(i&&o?!0===t?setTimeout(h,o):n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"),"fancybox-animated fancybox-slide--previous fancybox-fx-"+i,o,h):h(),0))))},cleanUp:function(t){var i,o,r=this,a=n("body");r.current.$slide.trigger("onReset"),r.$refs.container.empty().remove(),r.trigger("afterClose",t),r.$lastFocus&&r.current.opts.backFocus&&r.$lastFocus.focus(),r.current=null,(i=n.fancybox.getInstance())?i.activate():(s.scrollTop(r.scrollTop).scrollLeft(r.scrollLeft),a.removeClass("fancybox-active compensate-for-scrollbar"),a.hasClass("fancybox-iosfix")&&(o=parseInt(e.body.style.top,10),a.removeClass("fancybox-iosfix").css("top","").scrollTop(-1*o)),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var i,o=Array.prototype.slice.call(arguments,1),r=this,s=e&&e.opts?e:r.current;return s?o.unshift(s):s=r,o.unshift(r),n.isFunction(s.opts[t])&&(i=s.opts[t].apply(s,o)),!1===i?i:void("afterClose"===t?a.trigger(t+".fb",o):r.$refs.container.trigger(t+".fb",o))},updateControls:function(t){var e=this,i=e.current,o=i.index,r=i.opts.caption,s=e.$refs.caption;i.$slide.trigger("refresh"),e.$caption=r&&r.length?s.html(r):null,e.isHiddenControls||e.isIdle||e.showControls(),n("[data-fancybox-count]").html(e.group.length),n("[data-fancybox-index]").html(o+1),n("[data-fancybox-prev]").prop("disabled",!i.opts.loop&&o<=0),n("[data-fancybox-next]").prop("disabled",!i.opts.loop&&o>=e.group.length-1),"image"===i.type?n("[data-fancybox-download]").attr("href",i.opts.image.src||i.src):n("[data-fancybox-download]").hide()},hideControls:function(){this.isHiddenControls=!0,this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.isHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal),t.$caption?n.addClass("fancybox-show-caption "):n.removeClass("fancybox-show-caption")},toggleControls:function(){this.isHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.2.0",defaults:r,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox"),i=Array.prototype.slice.call(arguments,1);return e instanceof p&&("string"===n.type(t)?e[t].apply(e,i):"function"===n.type(t)&&t.apply(e,i),e)},open:function(t,e,n){return new p(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),!0===t&&this.close())},destroy:function(){this.close(!0),a.off("click.fb-start")},isMobile:e.createTouch!==i&&/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;if(!t||!t.length)return!1;if((e=t.eq(0).css("transform"))&&-1!==e.indexOf("matrix")?(e=e.split("(")[1],e=e.split(")")[0],e=e.split(",")):e=[],e.length)e=e.length>10?[e[13],e[12],e[0],e[5]]:[e[5],e[4],e[0],e[3]],e=e.map(parseFloat);else{e=[0,0,1,1];var n=/\.*translate\((.*)px,(.*)px\)/i.exec(t.eq(0).attr("style"));n&&(e[0]=parseFloat(n[2]),e[1]=parseFloat(n[1]))}return{top:e[0],left:e[1],scaleX:e[2],scaleY:e[3],opacity:parseFloat(t.css("opacity")),width:t.width(),height:t.height()}},setTranslate:function(t,e){var n="",o={};if(t&&e)return e.left===i&&e.top===i||(n=(e.left===i?t.position().left:e.left)+"px, "+(e.top===i?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),e.scaleX!==i&&e.scaleY!==i&&(n=(n.length?n+" ":"")+"scale("+e.scaleX+", "+e.scaleY+")"),n.length&&(o.transform=n),e.opacity!==i&&(o.opacity=e.opacity),e.width!==i&&(o.width=e.width),e.height!==i&&(o.height=e.height),t.css(o)},animate:function(t,e,o,r,s){var a=u||"transitionend";n.isFunction(o)&&(r=o,o=null),n.isPlainObject(e)||t.removeAttr("style"),t.on(a,function(o){(!o||!o.originalEvent||t.is(o.originalEvent.target)&&"z-index"!=o.originalEvent.propertyName)&&(t.off(a),n.isPlainObject(e)?e.scaleX!==i&&e.scaleY!==i&&(t.css("transition-duration","0ms"),e.width=Math.round(t.width()*e.scaleX),e.height=Math.round(t.height()*e.scaleY),e.scaleX=1,e.scaleY=1,n.fancybox.setTranslate(t,e)):!0!==s&&t.removeClass(e),n.isFunction(r)&&r(o))}),n.isNumeric(o)&&t.css("transition-duration",o+"ms"),n.isPlainObject(e)?n.fancybox.setTranslate(t,e):t.addClass(e),t.data("timer",setTimeout(function(){t.trigger("transitionend")},o+16))},stop:function(t){clearTimeout(t.data("timer")),t.off(u)}},n.fn.fancybox=function(t){var e;return t=t||{},(e=t.selector||!1)?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},o):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},o),this},a.on("click.fb-start","[data-fancybox]",o)}}(window,document,window.jQuery||jQuery),function(t){"use strict";var e=function(e,n,i){if(e)return i=i||"","object"===t.type(i)&&(i=t.param(i,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),i.length&&(e+=(e.indexOf("?")>0?"&":"?")+i),e},n={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"//www.youtube.com/embed/$4",thumb:"//img.youtube.com/vi/$4/hqdefault.jpg"},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1,api:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},metacafe:{matcher:/metacafe.com\/watch\/(\d+)\/(.*)?/,type:"iframe",url:"//www.metacafe.com/embed/$1/?ap=1"},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},type:"iframe",url:"//www.dailymotion.com/embed/video/$1"},vine:{matcher:/vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,type:"iframe",url:"//vine.co/v/$1/embed/simple"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12])+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}};t(document).on("onInit.fb",function(i,o){t.each(o.group,function(i,o){var r,s,a,l,c,u,d,p=o.src||"",h=!1;o.type||(r=t.extend(!0,{},n,o.opts.media),t.each(r,function(n,i){if(a=p.match(i.matcher),u={},d=n,a){if(h=i.type,i.paramPlace&&a[i.paramPlace]){"?"==(c=a[i.paramPlace])[0]&&(c=c.substring(1)),c=c.split("&");for(var r=0;r<c.length;++r){var f=c[r].split("=",2);2==f.length&&(u[f[0]]=decodeURIComponent(f[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},i.params,o.opts[n],u),p="function"===t.type(i.url)?i.url.call(this,a,l,o):e(i.url,a,l),s="function"===t.type(i.thumb)?i.thumb.call(this,a,l,o):e(i.thumb,a),"vimeo"===d&&(p=p.replace("&%23","#")),!1}}),h?(o.src=p,o.type=h,o.opts.thumb||o.opts.$thumb&&o.opts.$thumb.length||(o.opts.thumb=s),"iframe"===h&&(t.extend(!0,o.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}}),o.contentProvider=d,o.opts.slideClass+=" fancybox-slide--"+("gmap_place"==d||"gmap_search"==d?"map":"video"))):p&&(o.type="image"))})})}(window.jQuery||jQuery),function(t,e,n){"use strict";var i=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)},o=t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)},r=function(e){var n=[];e=(e=e.originalEvent||e||t.e).touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var i in e)e[i].pageX?n.push({x:e[i].pageX,y:e[i].pageY}):e[i].clientX&&n.push({x:e[i].clientX,y:e[i].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},a=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,i=t[0].attributes,o=i.length;e<o;e++)if("data-fancybox-"===i[e].nodeName.substr(0,14))return!0;return!1},l=function(e){var n=t.getComputedStyle(e)["overflow-y"],i=t.getComputedStyle(e)["overflow-x"],o=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,r=("scroll"===i||"auto"===i)&&e.scrollWidth>e.clientWidth;return o||r},c=function(t){for(var e=!1;!(e=l(t.get(0)))&&((t=t.parent()).length&&!t.hasClass("fancybox-stage")&&!t.is("body")););return e},u=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};u.prototype.destroy=function(){this.$container.off(".fb.touch")},u.prototype.ontouchstart=function(i){var o=this,l=n(i.target),u=o.instance,d=u.current,p=d.$content,h="touchstart"==i.type;if(h&&o.$container.off("mousedown.fb.touch"),!d||o.instance.isAnimating||o.instance.isClosing)return i.stopPropagation(),void i.preventDefault();if((!i.originalEvent||2!=i.originalEvent.button)&&l.length&&!a(l)&&!a(l.parent())&&!(i.originalEvent.clientX>l[0].clientWidth+l.offset().left)&&(o.startPoints=r(i),o.startPoints&&!(o.startPoints.length>1&&u.isSliding))){if(o.$target=l,o.$content=p,o.canTap=!0,o.opts=d.opts.touch,n(e).off(".fb.touch"),n(e).on(h?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(o,"ontouchend")),n(e).on(h?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(o,"ontouchmove")),!o.opts&&!u.canPan()||!l.is(o.$stage)&&!o.$stage.find(l).length)return void(l.is("img")&&i.preventDefault());i.stopPropagation(),n.fancybox.isMobile&&(c(o.$target)||c(o.$target.parent()))||i.preventDefault(),o.canvasWidth=Math.round(d.$slide[0].clientWidth),o.canvasHeight=Math.round(d.$slide[0].clientHeight),o.startTime=(new Date).getTime(),o.distanceX=o.distanceY=o.distance=0,o.isPanning=!1,o.isSwiping=!1,o.isZooming=!1,o.sliderStartPos=o.sliderLastPos||{top:0,left:0},o.contentStartPos=n.fancybox.getTranslate(o.$content),o.contentLastPos=null,1!==o.startPoints.length||o.isZooming||(o.canTap=!u.isSliding,"image"===d.type&&(o.contentStartPos.width>o.canvasWidth+1||o.contentStartPos.height>o.canvasHeight+1)?(n.fancybox.stop(o.$content),o.$content.css("transition-duration","0ms"),o.isPanning=!0):o.isSwiping=!0,o.$container.addClass("fancybox-controls--isGrabbing")),2!==o.startPoints.length||u.isAnimating||d.hasError||"image"!==d.type||!d.isLoaded&&!d.$ghost||(o.isZooming=!0,o.isSwiping=!1,o.isPanning=!1,n.fancybox.stop(o.$content),o.$content.css("transition-duration","0ms"),o.centerPointStartX=.5*(o.startPoints[0].x+o.startPoints[1].x)-n(t).scrollLeft(),o.centerPointStartY=.5*(o.startPoints[0].y+o.startPoints[1].y)-n(t).scrollTop(),o.percentageOfImageAtPinchPointX=(o.centerPointStartX-o.contentStartPos.left)/o.contentStartPos.width,o.percentageOfImageAtPinchPointY=(o.centerPointStartY-o.contentStartPos.top)/o.contentStartPos.height,o.startDistanceBetweenFingers=s(o.startPoints[0],o.startPoints[1]))}},u.prototype.ontouchmove=function(t){var e=this;if(e.newPoints=r(t),n.fancybox.isMobile&&(c(e.$target)||c(e.$target.parent())))return t.stopPropagation(),void(e.canTap=!1);if((e.opts||e.instance.canPan())&&e.newPoints&&e.newPoints.length&&(e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0)){if(!e.$target.is(e.$stage)&&!e.$stage.find(e.$target).length)return;t.stopPropagation(),t.preventDefault(),e.isSwiping?e.onSwipe():e.isPanning?e.onPan():e.isZooming&&e.onZoom()}},u.prototype.onSwipe=function(){var e,r=this,s=r.isSwiping,a=r.sliderStartPos.left||0;!0===s?Math.abs(r.distance)>10&&(r.canTap=!1,r.instance.group.length<2&&r.opts.vertical?r.isSwiping="y":r.instance.isSliding||!1===r.opts.vertical||"auto"===r.opts.vertical&&n(t).width()>800?r.isSwiping="x":(e=Math.abs(180*Math.atan2(r.distanceY,r.distanceX)/Math.PI),r.isSwiping=e>45&&e<135?"y":"x"),r.instance.isSliding=r.isSwiping,r.startPoints=r.newPoints,n.each(r.instance.slides,function(t,e){n.fancybox.stop(e.$slide),e.$slide.css("transition-duration","0ms"),e.inTransition=!1,e.pos===r.instance.current.pos&&(r.sliderStartPos.left=n.fancybox.getTranslate(e.$slide).left)}),r.instance.SlideShow&&r.instance.SlideShow.isActive&&r.instance.SlideShow.stop()):("x"==s&&(r.distanceX>0&&(r.instance.group.length<2||0===r.instance.current.index&&!r.instance.current.opts.loop)?a+=Math.pow(r.distanceX,.8):r.distanceX<0&&(r.instance.group.length<2||r.instance.current.index===r.instance.group.length-1&&!r.instance.current.opts.loop)?a-=Math.pow(-r.distanceX,.8):a+=r.distanceX),r.sliderLastPos={top:"x"==s?0:r.sliderStartPos.top+r.distanceY,left:a},r.requestId&&(o(r.requestId),r.requestId=null),r.requestId=i(function(){r.sliderLastPos&&(n.each(r.instance.slides,function(t,e){var i=e.pos-r.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:r.sliderLastPos.top,left:r.sliderLastPos.left+i*r.canvasWidth+i*e.opts.gutter})}),r.$container.addClass("fancybox-is-sliding"))}))},u.prototype.onPan=function(){var t,e,r,s=this;s.canTap=!1,t=s.contentStartPos.width>s.canvasWidth?s.contentStartPos.left+s.distanceX:s.contentStartPos.left,e=s.contentStartPos.top+s.distanceY,(r=s.limitMovement(t,e,s.contentStartPos.width,s.contentStartPos.height)).scaleX=s.contentStartPos.scaleX,r.scaleY=s.contentStartPos.scaleY,s.contentLastPos=r,s.requestId&&(o(s.requestId),s.requestId=null),s.requestId=i(function(){n.fancybox.setTranslate(s.$content,s.contentLastPos)})},u.prototype.limitMovement=function(t,e,n,i){var o,r,s,a,l=this,c=l.canvasWidth,u=l.canvasHeight,d=l.contentStartPos.left,p=l.contentStartPos.top,h=l.distanceX,f=l.distanceY;return o=Math.max(0,.5*c-.5*n),r=Math.max(0,.5*u-.5*i),s=Math.min(c-n,.5*c-.5*n),a=Math.min(u-i,.5*u-.5*i),n>c&&(h>0&&t>o&&(t=o-1+Math.pow(-o+d+h,.8)||0),h<0&&t<s&&(t=s+1-Math.pow(s-d-h,.8)||0)),i>u&&(f>0&&e>r&&(e=r-1+Math.pow(-r+p+f,.8)||0),f<0&&e<a&&(e=a+1-Math.pow(a-p-f,.8)||0)),{top:e,left:t}},u.prototype.limitPosition=function(t,e,n,i){var o=this.canvasWidth,r=this.canvasHeight;return n>o?(t=t>0?0:t,t=t<o-n?o-n:t):t=Math.max(0,o/2-n/2),i>r?(e=e>0?0:e,e=e<r-i?r-i:e):e=Math.max(0,r/2-i/2),{top:e,left:t}},u.prototype.onZoom=function(){var e=this,r=e.contentStartPos.width,a=e.contentStartPos.height,l=e.contentStartPos.left,c=e.contentStartPos.top,u=s(e.newPoints[0],e.newPoints[1])/e.startDistanceBetweenFingers,d=Math.floor(r*u),p=Math.floor(a*u),h=(r-d)*e.percentageOfImageAtPinchPointX,f=(a-p)*e.percentageOfImageAtPinchPointY,m=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),g=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),v=m-e.centerPointStartX,y={top:c+(f+(g-e.centerPointStartY)),left:l+(h+v),scaleX:e.contentStartPos.scaleX*u,scaleY:e.contentStartPos.scaleY*u};e.canTap=!1,e.newWidth=d,e.newHeight=p,e.contentLastPos=y,e.requestId&&(o(e.requestId),e.requestId=null),e.requestId=i(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},u.prototype.ontouchend=function(t){var i=this,s=Math.max((new Date).getTime()-i.startTime,1),a=i.isSwiping,l=i.isPanning,c=i.isZooming;return i.endPoints=r(t),i.$container.removeClass("fancybox-controls--isGrabbing"),n(e).off(".fb.touch"),i.requestId&&(o(i.requestId),i.requestId=null),i.isSwiping=!1,i.isPanning=!1,i.isZooming=!1,i.canTap?i.onTap(t):(i.speed=366,i.velocityX=i.distanceX/s*.5,i.velocityY=i.distanceY/s*.5,i.speedX=Math.max(.5*i.speed,Math.min(1.5*i.speed,1/Math.abs(i.velocityX)*i.speed)),void(l?i.endPanning():c?i.endZooming():i.endSwiping(a)))},u.prototype.endSwiping=function(t){var e=this,i=!1;e.instance.isSliding=!1,e.sliderLastPos=null,"y"==t&&Math.abs(e.distanceY)>50?(n.fancybox.animate(e.instance.current.$slide,{top:e.sliderStartPos.top+e.distanceY+150*e.velocityY,opacity:0},150),i=e.instance.close(!0,300)):"x"==t&&e.distanceX>50&&e.instance.group.length>1?i=e.instance.previous(e.speedX):"x"==t&&e.distanceX<-50&&e.instance.group.length>1&&(i=e.instance.next(e.speedX)),!1!==i||"x"!=t&&"y"!=t||e.instance.jumpTo(e.instance.current.index,150),e.$container.removeClass("fancybox-is-sliding")},u.prototype.endPanning=function(){var t,e,i,o=this;o.contentLastPos&&(!1===o.opts.momentum?(t=o.contentLastPos.left,e=o.contentLastPos.top):(t=o.contentLastPos.left+o.velocityX*o.speed,e=o.contentLastPos.top+o.velocityY*o.speed),i=o.limitPosition(t,e,o.contentStartPos.width,o.contentStartPos.height),i.width=o.contentStartPos.width,i.height=o.contentStartPos.height,n.fancybox.animate(o.$content,i,330))},u.prototype.endZooming=function(){var t,e,i,o,r=this,s=r.instance.current,a=r.newWidth,l=r.newHeight;r.contentLastPos&&(t=r.contentLastPos.left,e=r.contentLastPos.top,o={top:e,left:t,width:a,height:l,scaleX:1,scaleY:1},n.fancybox.setTranslate(r.$content,o),a<r.canvasWidth&&l<r.canvasHeight?r.instance.scaleToFit(150):a>s.width||l>s.height?r.instance.scaleToActual(r.centerPointStartX,r.centerPointStartY,150):(i=r.limitPosition(t,e,a,l),n.fancybox.setTranslate(r.content,n.fancybox.getTranslate(r.$content)),n.fancybox.animate(r.$content,i,150)))},u.prototype.onTap=function(t){var e,i=this,o=n(t.target),s=i.instance,a=s.current,l=t&&r(t)||i.startPoints,c=l[0]?l[0].x-i.$stage.offset().left:0,u=l[0]?l[0].y-i.$stage.offset().top:0,d=function(e){var o=a.opts[e];if(n.isFunction(o)&&(o=o.apply(s,[a,t])),o)switch(o){case"close":s.close(i.startEvent);break;case"toggleControls":s.toggleControls(!0);break;case"next":s.next();break;case"nextOrClose":s.group.length>1?s.next():s.close(i.startEvent);break;case"zoom":"image"==a.type&&(a.isLoaded||a.$ghost)&&(s.canPan()?s.scaleToFit():s.isScaledDown()?s.scaleToActual(c,u):s.group.length<2&&s.close(i.startEvent))}};if(!(t.originalEvent&&2==t.originalEvent.button||s.isSliding||c>o[0].clientWidth+o.offset().left)){if(o.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))e="Outside";else if(o.is(".fancybox-slide"))e="Slide";else{if(!s.current.$content||!s.current.$content.has(t.target).length)return;e="Content"}if(i.tapped){if(clearTimeout(i.tapped),i.tapped=null,Math.abs(c-i.tapX)>50||Math.abs(u-i.tapY)>50||s.isSliding)return this;d("dblclick"+e)}else i.tapX=c,i.tapY=u,a.opts["dblclick"+e]&&a.opts["dblclick"+e]!==a.opts["click"+e]?i.tapped=setTimeout(function(){i.tapped=null,d("click"+e)},300):d("click"+e);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new u(e))}),n(e).on("beforeClose.fb",function(t,e){e&&e.Guestures&&e.Guestures.destroy()})}(window,document,window.jQuery||jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'},slideShow:{autoStart:!1,speed:3e3}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this;t.$button=t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),(t.instance.group.length<2||!t.instance.group[t.instance.currIndex].opts.slideShow)&&t.$button.hide()},set:function(t){var e=this;e.instance&&e.instance.current&&(!0===t||e.instance.current.opts.loop||e.instance.currIndex<e.instance.group.length-1)?e.timer=setTimeout(function(){e.instance.jumpTo((e.instance.currIndex+1)%e.instance.group.length)},e.instance.current.opts.slideShow.speed):(e.stop(),e.instance.idleSecondsCounter=0,e.instance.showControls())},clear:function(){clearTimeout(this.timer),this.timer=null},start:function(){var t=this,e=t.instance.current;e&&(t.isActive=!0,t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.set(!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,i){var o=e&&e.SlideShow;i?o&&n.opts.slideShow.autoStart&&o.start():o&&o.isActive&&o.clear()},"afterShow.fb":function(t,e,n){var i=e&&e.SlideShow;i&&i.isActive&&i.set()},"afterKeydown.fb":function(n,i,o,r,s){var a=i&&i.SlideShow;!a||!o.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(r.preventDefault(),a.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),i=n&&n.SlideShow;i&&i.isActive&&(t.hidden?i.clear():i.set())})}(document,window.jQuery||jQuery),function(t,e){"use strict";var n=function(){var e,n,i,o=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r={};for(n=0;n<o.length;n++)if((e=o[n])&&e[1]in t){for(i=0;i<e.length;i++)r[o[0][i]]=e[i];return r}return!1}();if(n){var i={request:function(e){(e=e||t.documentElement)[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on({"onInit.fb":function(t,e){var n;e&&e.group[e.currIndex].opts.fullScreen?((n=e.$refs.container).on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),i.toggle(n[0])}),e.opts.fullScreen&&!0===e.opts.fullScreen.autoStart&&i.request(n[0]),e.FullScreen=i):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,i,o){e&&e.FullScreen&&70===o&&(i.preventDefault(),e.FullScreen.toggle(e.$refs.container[0]))},"beforeClose.fb":function(t){t&&t.FullScreen&&i.exit()}}),e(t).on(n.fullscreenchange,function(){var t=i.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.current.$content.css("transition","none"),n.isAnimating=!1,n.update(!0,!0,0)),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t))})}else e&&e.fancybox&&(e.fancybox.defaults.btnTpl.fullScreen=!1)}(document,window.jQuery||jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,init:function(){var t=this,e=t.instance.group[0],n=t.instance.group[1];t.$button=t.instance.$refs.toolbar.find("[data-fancybox-thumbs]"),t.instance.group.length>1&&t.instance.group[t.instance.currIndex].opts.thumbs&&("image"==e.type||e.opts.thumb||e.opts.$thumb)&&("image"==n.type||n.opts.thumb||n.opts.$thumb)?(t.$button.on("click",function(){t.toggle()}),t.isActive=!0):(t.$button.hide(),t.isActive=!1)},create:function(){var t,n,i=this.instance;this.$grid=e('<div class="fancybox-thumbs"></div>').appendTo(i.$refs.container),t="<ul>",e.each(i.group,function(e,i){(n=i.opts.thumb||(i.opts.$thumb?i.opts.$thumb.attr("src"):null))||"image"!==i.type||(n=i.src),n&&n.length&&(t+='<li data-index="'+e+'"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="'+n+'" /></li>')}),t+="</ul>",this.$list=e(t).appendTo(this.$grid).on("click","li",function(){i.jumpTo(e(this).data("index"))}),this.$list.find("img").hide().one("load",function(){var t,n,i,o,r=e(this).parent().removeClass("fancybox-thumbs-loading"),s=r.outerWidth(),a=r.outerHeight();t=this.naturalWidth||this.width,o=(n=this.naturalHeight||this.height)/a,(i=t/s)>=1&&o>=1&&(i>o?(t/=o,n=a):(t=s,n/=i)),e(this).css({width:Math.floor(t),height:Math.floor(n),"margin-top":Math.min(0,Math.floor(.3*a-.3*n)),"margin-left":Math.min(0,Math.floor(.5*s-.5*t))}).show()}).each(function(){this.src=e(this).data("src")})},focus:function(){this.instance.current&&this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="'+this.instance.current.index+'"]').addClass("fancybox-thumbs-active").focus()},close:function(){this.$grid.hide()},update:function(){this.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),this.isVisible?(this.$grid||this.create(),this.instance.trigger("onThumbsShow"),this.focus()):this.$grid&&this.instance.trigger("onThumbsHide"),this.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.Thumbs&&(e.Thumbs=new n(e))},"beforeShow.fb":function(t,e,n,i){var o=e&&e.Thumbs;if(o&&o.isActive){if(n.modal)return o.$button.hide(),void o.hide();i&&!0===n.opts.thumbs.autoStart&&o.show(),o.isVisible&&o.focus()}},"afterKeydown.fb":function(t,e,n,i,o){var r=e&&e.Thumbs;r&&r.isActive&&71===o&&(i.preventDefault(),r.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&!1!==e.opts.thumbs.hideOnClose&&n.close()}})}(document,window.jQuery||jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'},share:{tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg><span>Facebook</span></a><a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg><span>Pinterest</span></a><a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg><span>Twitter</span></a></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t=e.fancybox.getInstance();t&&e.fancybox.open({src:t.translate(t,t.current.opts.share.tpl.replace(/\{\{src\}\}/g,encodeURI(t.current.src)).replace(/\{\{descr\}\}/g,encodeURI(t.current.opts.caption||""))),type:"html",opts:{autoFocus:!1,animationEffect:"fade"}})})}(document,window.jQuery||jQuery),function(t,e,n){"use strict";function i(){var t=e.location.hash.substr(1),n=t.split("-"),i=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,o=n.join("-");return i<1&&(i=1),{hash:t,index:i,gallery:o}}function o(t){var e;""!==t.gallery&&((e=n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1)).length||(e=n("#"+n.escapeSelector(t.gallery))),e.length&&(s=!1,e.trigger("click")))}function r(t){var e;return!!t&&((e=t.current?t.current.opts:t.opts).hash||(e.$orig?e.$orig.data("fancybox"):""))}n.escapeSelector||(n.escapeSelector=function(t){return(t+"").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t})});var s=!0,a=null,l=null;n(function(){n(t).on({"onInit.fb":function(t,e){var n,o;!1!==e.group[e.currIndex].opts.hash&&(n=i(),(o=r(e))&&n.gallery&&o==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,i,o){var c;o&&!1!==o.opts.hash&&(c=r(i))&&""!==c&&(e.location.hash.indexOf(c)<0&&(i.opts.origHash=e.location.hash),a=c+(i.group.length>1?"-"+(o.index+1):""),"replaceState"in e.history?(l&&clearTimeout(l),l=setTimeout(function(){e.history[s?"pushState":"replaceState"]({},t.title,e.location.pathname+e.location.search+"#"+a),l=null,s=!1},300)):e.location.hash=a)},"beforeClose.fb":function(i,o,s){var c,u;l&&clearTimeout(l),!1!==s.opts.hash&&(c=r(o),u=o&&o.opts.origHash?o.opts.origHash:"",c&&""!==c&&("replaceState"in history?e.history.replaceState({},t.title,e.location.pathname+e.location.search+u):(e.location.hash=u,n(e).scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))),a=null)}}),n(e).on("hashchange.fb",function(){var t=i();n.fancybox.getInstance()?!a||a===t.gallery+"-"+t.index||1===t.index&&a==t.gallery||(a=null,n.fancybox.close()):""!==t.gallery&&o(t)}),o(i())})}(document,window,window.jQuery||jQuery),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},i=n[t]=n[t]||[];return-1==i.indexOf(e)&&i.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=n.indexOf(e);return-1!=i&&n.splice(i,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=0,o=n[i];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),o=n[i+=s?0:1]}return this}},e.allOff=e.removeAllListeners=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(n){return e(t,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){function n(t,e){for(var n in e)t[n]=e[n];return t}function i(t,e,o){return this instanceof i?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=function(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var n=0;n<t.length;n++)e.push(t[n]);else e.push(t);return e}(t),this.options=n({},this.options),"function"==typeof e?o=e:n(this.options,e),o&&this.on("always",o),this.getImages(),s&&(this.jqDeferred=new s.Deferred),void setTimeout(function(){this.check()}.bind(this))):new i(t,e,o)}function o(t){this.img=t}function r(t,e){this.url=t,this.element=e,this.img=new Image}var s=t.jQuery,a=t.console;(i.prototype=Object.create(e.prototype)).options={},i.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},i.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&l[e]){for(var n=t.querySelectorAll("img"),i=0;i<n.length;i++){var o=n[i];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(i=0;i<r.length;i++){var s=r[i];this.addElementBackgroundImages(s)}}}};var l={1:!0,9:!0,11:!0};return i.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var n=/url\((['"])?(.*?)\1\)/gi,i=n.exec(e.backgroundImage);null!==i;){var o=i&&i[2];o&&this.addBackground(o,t),i=n.exec(e.backgroundImage)}},i.prototype.addImage=function(t){var e=new o(t);this.images.push(e)},i.prototype.addBackground=function(t,e){var n=new r(t,e);this.images.push(n)},i.prototype.check=function(){function t(t,n,i){setTimeout(function(){e.progress(t,n,i)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},i.prototype.progress=function(t,e,n){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+n,t,e)},i.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},o.prototype=Object.create(e.prototype),o.prototype.check=function(){return this.getIsImageComplete()?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},o.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},o.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},o.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},o.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype=Object.create(o.prototype),r.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},r.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},i.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&(s=e,s.fn.imagesLoaded=function(t,e){return new i(this,t,e).jqDeferred.promise(s(this))})},i.makeJQueryPlugin(),i}),function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(n){return e(t,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function n(n,r,a){(a=a||e||t.jQuery)&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[n]=function(t){if("string"==typeof t){return function(t,e,i){var o,r="$()."+n+'("'+e+'")';return t.each(function(t,l){var c=a.data(l,n);if(c){var u=c[e];if(u&&"_"!=e.charAt(0)){var d=u.apply(c,i);o=void 0===o?d:o}else s(r+" is not a valid method")}else s(n+" not initialized. Cannot call methods, i.e. "+r)}),void 0!==o?o:t}(this,t,o.call(arguments,1))}return function(t,e){t.each(function(t,i){var o=a.data(i,n);o?(o.option(e),o._init()):(o=new r(i,e),a.data(i,n,o))})}(this,t),this},i(a))}function i(t){!t||t&&t.bridget||(t.bridget=n)}var o=Array.prototype.slice,r=t.console,s=void 0===r?function(){}:function(t){r.error(t)};return i(e||t.jQuery),n}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},i=n[t]=n[t]||[];return-1==i.indexOf(e)&&i.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=n.indexOf(e);return-1!=i&&n.splice(i,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=0,o=n[i];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),o=n[i+=s?0:1]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(e)&&e}function e(t){var e=getComputedStyle(t);return e||r("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function n(){if(!l){l=!0;var n=document.createElement("div");n.style.width="200px",n.style.padding="1px 2px 3px 4px",n.style.borderStyle="solid",n.style.borderWidth="1px 2px 3px 4px",n.style.boxSizing="border-box";var r=document.body||document.documentElement;r.appendChild(n);var s=e(n);i.isBoxSizeOuter=o=200==t(s.width),r.removeChild(n)}}function i(i){if(n(),"string"==typeof i&&(i=document.querySelector(i)),i&&"object"==typeof i&&i.nodeType){var r=e(i);if("none"==r.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<a;e++)t[s[e]]=0;return t}();var l={};l.width=i.offsetWidth,l.height=i.offsetHeight;for(var c=l.isBorderBox="border-box"==r.boxSizing,u=0;u<a;u++){var d=s[u],p=r[d],h=parseFloat(p);l[d]=isNaN(h)?0:h}var f=l.paddingLeft+l.paddingRight,m=l.paddingTop+l.paddingBottom,g=l.marginLeft+l.marginRight,v=l.marginTop+l.marginBottom,y=l.borderLeftWidth+l.borderRightWidth,b=l.borderTopWidth+l.borderBottomWidth,w=c&&o,x=t(r.width);!1!==x&&(l.width=x+(w?0:f+y));var T=t(r.height);return!1!==T&&(l.height=T+(w?0:m+b)),l.innerWidth=l.width-(f+y),l.innerHeight=l.height-(m+b),l.outerWidth=l.width+g,l.outerHeight=l.height+v,l}}var o,r="undefined"==typeof console?function(){}:function(t){console.error(t)},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],a=s.length,l=!1;return i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],n=0;n<e.length;n++){var i=e[n]+"MatchesSelector";if(t[i])return i}}();return function(e,n){return e[t](n)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(n){return e(t,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var n={};n.extend=function(t,e){for(var n in e)t[n]=e[n];return t},n.modulo=function(t,e){return(t%e+e)%e},n.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var n=0;n<t.length;n++)e.push(t[n]);else e.push(t);return e},n.removeFrom=function(t,e){var n=t.indexOf(e);-1!=n&&t.splice(n,1)},n.getParent=function(t,n){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,n))return t},n.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},n.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},n.filterFindElements=function(t,i){var o=[];return(t=n.makeArray(t)).forEach(function(t){if(t instanceof HTMLElement){if(!i)return void o.push(t);e(t,i)&&o.push(t);for(var n=t.querySelectorAll(i),r=0;r<n.length;r++)o.push(n[r])}}),o},n.debounceMethod=function(t,e,n){var i=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){i.apply(r,e),delete r[o]},n||100)}},n.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},n.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,n){return e+"-"+n}).toLowerCase()};var i=t.console;return n.htmlInit=function(e,o){n.docReady(function(){var r=n.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),l=document.querySelectorAll(".js-"+r),c=n.makeArray(a).concat(n.makeArray(l)),u=s+"-options",d=t.jQuery;c.forEach(function(t){var n,r=t.getAttribute(s)||t.getAttribute(u);try{n=r&&JSON.parse(r)}catch(e){return void(i&&i.error("Error parsing "+s+" on "+t.className+": "+e))}var a=new e(t,n);d&&d.data(t,o,a)})})},n}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var i=document.documentElement.style,o="string"==typeof i.transition?"transition":"WebkitTransition",r="string"==typeof i.transform?"transform":"WebkitTransform",s={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[o],a={transform:r,transition:o,transitionDuration:o+"Duration",transitionProperty:o+"Property",transitionDelay:o+"Delay"},l=n.prototype=Object.create(t.prototype);l.constructor=n,l._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},l.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},l.getSize=function(){this.size=e(this.element)},l.css=function(t){var e=this.element.style;for(var n in t){e[a[n]||n]=t[n]}},l.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),i=t[e?"left":"right"],o=t[n?"top":"bottom"],r=this.layout.size,s=-1!=i.indexOf("%")?parseFloat(i)/100*r.width:parseInt(i,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=n?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},l.layoutPosition=function(){var t=this.layout.size,e={},n=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=n?"paddingLeft":"paddingRight",r=n?"left":"right",s=n?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var l=i?"paddingTop":"paddingBottom",c=i?"top":"bottom",u=i?"bottom":"top",d=this.position.y+t[l];e[c]=this.getYValue(d),e[u]="",this.css(e),this.emitEvent("layout",[this])},l.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},l.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},l._transitionTo=function(t,e){this.getPosition();var n=this.position.x,i=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),!s||this.isTransitioning){var a=t-n,l=e-i,c={};c.transform=this.getTranslate(a,l),this.transition({to:c,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})}else this.layoutPosition()},l.getTranslate=function(t,e){var n=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop");return t=n?t:-t,e=i?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},l.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},l.moveTo=l._transitionTo,l.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},l._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},l.transition=function(t){if(parseFloat(this.layout.options.transitionDuration)){var e=this._transn;for(var n in t.onTransitionEnd)e.onEnd[n]=t.onTransitionEnd[n];for(n in t.to)e.ingProperties[n]=!0,t.isCleaning&&(e.clean[n]=!0);if(t.from){this.css(t.from);this.element.offsetHeight;null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0}else this._nonTransition(t)};var c="opacity,"+function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}(r);l.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:c,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(s,this,!1)}},l.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},l.onotransitionend=function(t){this.ontransitionend(t)};var u={"-webkit-transform":"transform"};l.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=u[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],function(t){for(var e in t)return!1;return!0}(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){e.onEnd[n].call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},l.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(s,this,!1),this.isTransitioning=!1},l._removeStyles=function(t){var e={};for(var n in t)e[n]="";this.css(e)};var d={transitionProperty:"",transitionDuration:"",transitionDelay:""};return l.removeTransitionStyles=function(){this.css(d)},l.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},l.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},l.remove=function(){return o&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},l.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("visibleStyle")]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},l.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},l.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var n in e)return n},l.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("hiddenStyle")]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},l.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},l.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(n,i,o,r){return e(t,n,i,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,n,i,o){"use strict";function r(t,e){var n=i.getQueryElement(t);if(n){this.element=n,l&&(this.$element=l(this.element)),this.options=i.extend({},this.constructor.defaults),this.option(e);var o=++u;this.element.outlayerGUID=o,d[o]=this,this._create();this._getOption("initLayout")&&this.layout()}else a&&a.error("Bad element for "+this.constructor.namespace+": "+(n||t))}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}var a=t.console,l=t.jQuery,c=function(){},u=0,d={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var p=r.prototype;i.extend(p,e.prototype),p.option=function(t){i.extend(this.options,t)},p._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},p._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),i.extend(this.element.style,this.options.containerStyle);this._getOption("resize")&&this.bindResize()},p.reloadItems=function(){this.items=this._itemize(this.element.children)},p._itemize=function(t){for(var e=this._filterFindItemElements(t),n=this.constructor.Item,i=[],o=0;o<e.length;o++){var r=new n(e[o],this);i.push(r)}return i},p._filterFindItemElements=function(t){return i.filterFindElements(t,this.options.itemSelector)},p.getItemElements=function(){return this.items.map(function(t){return t.element})},p.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},p._init=p.layout,p._resetLayout=function(){this.getSize()},p.getSize=function(){this.size=n(this.element)},p._getMeasurement=function(t,e){var i,o=this.options[t];o?("string"==typeof o?i=this.element.querySelector(o):o instanceof HTMLElement&&(i=o),this[t]=i?n(i)[e]:o):this[t]=0},p.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},p._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},p._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var n=[];t.forEach(function(t){var i=this._getItemLayoutPosition(t);i.item=t,i.isInstant=e||t.isLayoutInstant,n.push(i)},this),this._processLayoutQueue(n)}},p._getItemLayoutPosition=function(){return{x:0,y:0}},p._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},p.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=function(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),n=e&&e[1],i=e&&e[2];return n.length?(n=parseFloat(n))*(h[i]||1):0}(t),this.stagger)},p._positionItem=function(t,e,n,i,o){i?t.goTo(e,n):(t.stagger(o*this.stagger),t.moveTo(e,n))},p._postLayout=function(){this.resizeContainer()},p.resizeContainer=function(){if(this._getOption("resizeContainer")){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},p._getContainerSize=c,p._setContainerMeasure=function(t,e){if(void 0!==t){var n=this.size;n.isBorderBox&&(t+=e?n.paddingLeft+n.paddingRight+n.borderLeftWidth+n.borderRightWidth:n.paddingBottom+n.paddingTop+n.borderTopWidth+n.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},p._emitCompleteOnItems=function(t,e){function n(){o.dispatchEvent(t+"Complete",null,[e])}function i(){++s==r&&n()}var o=this,r=e.length;if(e&&r){var s=0;e.forEach(function(e){e.once(t,i)})}else n()},p.dispatchEvent=function(t,e,n){var i=e?[e].concat(n):n;if(this.emitEvent(t,i),l)if(this.$element=this.$element||l(this.element),e){var o=l.Event(e);o.type=t,this.$element.trigger(o,n)}else this.$element.trigger(t,n)},p.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},p.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},p.stamp=function(t){(t=this._find(t))&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},p.unstamp=function(t){(t=this._find(t))&&t.forEach(function(t){i.removeFrom(this.stamps,t),this.unignore(t)},this)},p._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=i.makeArray(t)},p._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},p._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},p._manageStamp=c,p._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=n(t);return{left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom}},p.handleEvent=i.handleEvent,p.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},p.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},p.onresize=function(){this.resize()},i.debounceMethod(r,"onresize",100),p.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},p.needsResizeLayout=function(){var t=n(this.element);return this.size&&t&&t.innerWidth!==this.size.innerWidth},p.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},p.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},p.prepended=function(t){var e=this._itemize(t);if(e.length){var n=this.items.slice(0);this.items=e.concat(n),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(n)}},p.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,n){t.stagger(n*e),t.reveal()})}},p.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,n){t.stagger(n*e),t.hide()})}},p.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},p.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},p.getItem=function(t){for(var e=0;e<this.items.length;e++){var n=this.items[e];if(n.element==t)return n}},p.getItems=function(t){var e=[];return(t=i.makeArray(t)).forEach(function(t){var n=this.getItem(t);n&&e.push(n)},this),e},p.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),i.removeFrom(this.items,t)},this)},p.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete d[e],delete this.element.outlayerGUID,l&&l.removeData(this.element,this.constructor.namespace)},r.data=function(t){var e=(t=i.getQueryElement(t))&&t.outlayerGUID;return e&&d[e]},r.create=function(t,e){var n=s(r);return n.defaults=i.extend({},r.defaults),i.extend(n.defaults,e),n.compatOptions=i.extend({},r.compatOptions),n.namespace=t,n.data=r.data,n.Item=s(o),i.htmlInit(n,t),l&&l.bridget&&l.bridget(t,n),n};var h={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var n=e.prototype=Object.create(t.Item.prototype),i=n._create;n._create=function(){this.id=this.layout.itemGUID++,i.call(this),this.sortData={}},n.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var n in t){var i=e[n];this.sortData[n]=i(this.element,this)}}};var o=n.destroy;return n.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function n(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var i=n.prototype;return["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"].forEach(function(t){i[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),i.needsVerticalResizeLayout=function(){var e=t(this.isotope.element);return this.isotope.size&&e&&e.innerHeight!=this.isotope.size.innerHeight},i._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.getRowHeight=function(){this.getSegmentSize("row","Height")},i.getSegmentSize=function(t,e){var n=t+e,i="outer"+e;if(this._getMeasurement(n,i),!this[n]){var o=this.getFirstItemSize();this[n]=o&&o[i]||this.isotope.size["inner"+e]}},i.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},n.modes={},n.create=function(t,e){function o(){n.apply(this,arguments)}return o.prototype=Object.create(i),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,n.modes[t]=o,o},n}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var n=t.create("masonry");n.compatOptions.fitWidth="isFitWidth";var i=n.prototype;return i._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},i.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],n=t&&t.element;this.columnWidth=n&&e(n).outerWidth||this.containerWidth}var i=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/i,s=i-o%i,a=s&&s<1?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},i.getContainerWidth=function(){var t=this._getOption("fitWidth")?this.element.parentNode:this.element,n=e(t);this.containerWidth=n&&n.innerWidth},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,n=e&&e<1?"round":"ceil",i=Math[n](t.size.outerWidth/this.columnWidth);i=Math.min(i,this.cols);for(var o=this[this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition"](i,t),r={x:this.columnWidth*o.col,y:o.y},s=o.y+t.size.outerHeight,a=i+o.col,l=o.col;l<a;l++)this.colYs[l]=s;return r},i._getTopColPosition=function(t){var e=this._getTopColGroup(t),n=Math.min.apply(Math,e);return{col:e.indexOf(n),y:n}},i._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],n=this.cols+1-t,i=0;i<n;i++)e[i]=this._getColGroupY(i,t);return e},i._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var n=this.colYs.slice(t,t+e);return Math.max.apply(Math,n)},i._getHorizontalColPosition=function(t,e){var n=this.horizontalColIndex%this.cols;n=t>1&&n+t>this.cols?0:n;var i=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=i?n+t:this.horizontalColIndex,{col:n,y:this._getColGroupY(n,t)}},i._manageStamp=function(t){var n=e(t),i=this._getElementOffset(t),o=this._getOption("originLeft")?i.left:i.right,r=o+n.outerWidth,s=Math.floor(o/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var l=(this._getOption("originTop")?i.top:i.bottom)+n.outerHeight,c=s;c<=a;c++)this.colYs[c]=Math.max(l,this.colYs[c])},i._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},n}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var n=t.create("masonry"),i=n.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var r in e.prototype)o[r]||(i[r]=e.prototype[r]);var s=i.measureColumns;i.measureColumns=function(){this.items=this.isotope.filteredItems,s.call(this)};var a=i._getOption;return i._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},n}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),n=e.prototype;return n._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,n=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>n&&(this.x=0,this.y=this.maxY);var i={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,i},n._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),n=e.prototype;return n._resetLayout=function(){this.y=0},n._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,n=this.y;return this.y+=t.size.outerHeight,{x:e,y:n}},n._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(n,i,o,r,s,a){return e(t,n,i,o,r,s,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,n,i,o,r,s){var a=t.jQuery,l=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},c=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});c.Item=r,c.LayoutMode=s;var u=c.prototype;u._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in s.modes)this._initLayoutMode(t)},u.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},u._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),n=0;n<t.length;n++){t[n].id=this.itemGUID++}return this._updateItemsSortData(t),t},u._initLayoutMode=function(t){var e=s.modes[t],n=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,n):n,this.modes[t]=new e(this)},u.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},u._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},u.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},u._init=u.arrange,u._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},u._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},u._bindArrangeComplete=function(){function t(){e&&n&&i&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,n,i,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){n=!0,t()}),this.once("revealComplete",function(){i=!0,t()})},u._filter=function(t){var e=this.options.filter;e=e||"*";for(var n=[],i=[],o=[],r=this._getFilterTest(e),s=0;s<t.length;s++){var a=t[s];if(!a.isIgnored){var l=r(a);l&&n.push(a),l&&a.isHidden?i.push(a):l||a.isHidden||o.push(a)}}return{matches:n,needReveal:i,needHide:o}},u._getFilterTest=function(t){return a&&this.options.isJQueryFiltering?function(e){return a(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return i(e.element,t)}},u.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},u._getSorters=function(){var t=this.options.getSortData;for(var e in t){var n=t[e];this._sorters[e]=d(n)}},u._updateItemsSortData=function(t){for(var e=t&&t.length,n=0;e&&n<e;n++){t[n].updateSortData()}};var d=function(){return function(t){if("string"!=typeof t)return t;var e=l(t).split(" "),n=e[0],i=n.match(/^\[(.+)\]$/),o=function(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var n=t.querySelector(e);return n&&n.textContent}}(i&&i[1],n),r=c.sortDataParsers[e[1]];return t=r?function(t){return t&&r(o(t))}:function(t){return t&&o(t)}}}();c.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},u._sort=function(){if(this.options.sortBy){var t=o.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=function(t,e){return function(n,i){for(var o=0;o<t.length;o++){var r=t[o],s=n.sortData[r],a=i.sortData[r];if(s>a||s<a){var l=void 0!==e[r]?e[r]:e;return(s>a?1:-1)*(l?1:-1)}}return 0}}(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},u._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},u._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},u._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},u._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},u._manageStamp=function(t){this._mode()._manageStamp(t)},u._getContainerSize=function(){return this._mode()._getContainerSize()},u.needsResizeLayout=function(){return this._mode().needsResizeLayout()},u.appended=function(t){var e=this.addItems(t);if(e.length){var n=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(n)}},u.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var n=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=n.concat(this.filteredItems),this.items=e.concat(this.items)}},u._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},u.insert=function(t){var e=this.addItems(t);if(e.length){var n,i,o=e.length;for(n=0;n<o;n++)i=e[n],this.element.appendChild(i.element);var r=this._filter(e).matches;for(n=0;n<o;n++)e[n].isLayoutInstant=!0;for(this.arrange(),n=0;n<o;n++)delete e[n].isLayoutInstant;this.reveal(r)}};var p=u.remove;return u.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);p.call(this,t);for(var n=e&&e.length,i=0;n&&i<n;i++){var r=e[i];o.removeFrom(this.filteredItems,r)}},u.shuffle=function(){for(var t=0;t<this.items.length;t++){this.items[t].sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},u._noTransition=function(t,e){var n=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.apply(this,e);return this.options.transitionDuration=n,i},u.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},c}),function(t,e,n,i){function o(e,n){var r=this;"object"==typeof n&&(delete n.refresh,delete n.render,t.extend(this,n)),this.$element=t(e),!this.imageSrc&&this.$element.is("img")&&(this.imageSrc=this.$element.attr("src"));var s=(this.position+"").toLowerCase().match(/\S+/g)||[];if(s.length<1&&s.push("center"),1==s.length&&s.push(s[0]),"top"!=s[0]&&"bottom"!=s[0]&&"left"!=s[1]&&"right"!=s[1]||(s=[s[1],s[0]]),this.positionX!==i&&(s[0]=this.positionX.toLowerCase()),this.positionY!==i&&(s[1]=this.positionY.toLowerCase()),r.positionX=s[0],r.positionY=s[1],"left"!=this.positionX&&"right"!=this.positionX&&(isNaN(parseInt(this.positionX))?this.positionX="center":this.positionX=parseInt(this.positionX)),"top"!=this.positionY&&"bottom"!=this.positionY&&(isNaN(parseInt(this.positionY))?this.positionY="center":this.positionY=parseInt(this.positionY)),this.position=this.positionX+(isNaN(this.positionX)?"":"px")+" "+this.positionY+(isNaN(this.positionY)?"":"px"),navigator.userAgent.match(/(iPod|iPhone|iPad)/))return this.imageSrc&&this.iosFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;if(navigator.userAgent.match(/(Android)/))return this.imageSrc&&this.androidFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;this.$mirror=t("<div />").prependTo(this.mirrorContainer);var a=this.$element.find(">.parallax-slider"),l=!1;0==a.length?this.$slider=t("<img />").prependTo(this.$mirror):(this.$slider=a.prependTo(this.$mirror),l=!0),this.$mirror.addClass("parallax-mirror").css({visibility:"hidden",zIndex:this.zIndex,position:"fixed",top:0,left:0,overflow:"hidden"}),this.$slider.addClass("parallax-slider").one("load",function(){r.naturalHeight&&r.naturalWidth||(r.naturalHeight=this.naturalHeight||this.height||1,r.naturalWidth=this.naturalWidth||this.width||1),r.aspectRatio=r.naturalWidth/r.naturalHeight,o.isSetup||o.setup(),o.sliders.push(r),o.isFresh=!1,o.requestRender()}),l||(this.$slider[0].src=this.imageSrc),(this.naturalHeight&&this.naturalWidth||this.$slider[0].complete||a.length>0)&&this.$slider.trigger("load")}!function(){for(var t=0,n=["ms","moz","webkit","o"],i=0;i<n.length&&!e.requestAnimationFrame;++i)e.requestAnimationFrame=e[n[i]+"RequestAnimationFrame"],e.cancelAnimationFrame=e[n[i]+"CancelAnimationFrame"]||e[n[i]+"CancelRequestAnimationFrame"];e.requestAnimationFrame||(e.requestAnimationFrame=function(n){var i=(new Date).getTime(),o=Math.max(0,16-(i-t)),r=e.setTimeout(function(){n(i+o)},o);return t=i+o,r}),e.cancelAnimationFrame||(e.cancelAnimationFrame=function(t){clearTimeout(t)})}(),t.extend(o.prototype,{speed:.2,bleed:0,zIndex:-100,iosFix:!0,androidFix:!0,position:"center",overScrollFix:!1,mirrorContainer:"body",refresh:function(){this.boxWidth=this.$element.outerWidth(),this.boxHeight=this.$element.outerHeight()+2*this.bleed,this.boxOffsetTop=this.$element.offset().top-this.bleed,this.boxOffsetLeft=this.$element.offset().left,this.boxOffsetBottom=this.boxOffsetTop+this.boxHeight;var t,e=o.winHeight,n=o.docHeight,i=Math.min(this.boxOffsetTop,n-e),r=Math.max(this.boxOffsetTop+this.boxHeight-e,0),s=this.boxHeight+(i-r)*(1-this.speed)|0,a=(this.boxOffsetTop-i)*(1-this.speed)|0;s*this.aspectRatio>=this.boxWidth?(this.imageWidth=s*this.aspectRatio|0,this.imageHeight=s,this.offsetBaseTop=a,t=this.imageWidth-this.boxWidth,"left"==this.positionX?this.offsetLeft=0:"right"==this.positionX?this.offsetLeft=-t:isNaN(this.positionX)?this.offsetLeft=-t/2|0:this.offsetLeft=Math.max(this.positionX,-t)):(this.imageWidth=this.boxWidth,this.imageHeight=this.boxWidth/this.aspectRatio|0,this.offsetLeft=0,t=this.imageHeight-s,"top"==this.positionY?this.offsetBaseTop=a:"bottom"==this.positionY?this.offsetBaseTop=a-t:isNaN(this.positionY)?this.offsetBaseTop=a-t/2|0:this.offsetBaseTop=a+Math.max(this.positionY,-t))},render:function(){var t=o.scrollTop,e=o.scrollLeft,n=this.overScrollFix?o.overScroll:0,i=t+o.winHeight;this.boxOffsetBottom>t&&this.boxOffsetTop<=i?(this.visibility="visible",this.mirrorTop=this.boxOffsetTop-t,this.mirrorLeft=this.boxOffsetLeft-e,this.offsetTop=this.offsetBaseTop-this.mirrorTop*(1-this.speed)):this.visibility="hidden",this.$mirror.css({transform:"translate3d("+this.mirrorLeft+"px, "+(this.mirrorTop-n)+"px, 0px)",visibility:this.visibility,height:this.boxHeight,width:this.boxWidth}),this.$slider.css({transform:"translate3d("+this.offsetLeft+"px, "+this.offsetTop+"px, 0px)",position:"absolute",height:this.imageHeight,width:this.imageWidth,maxWidth:"none"})}}),t.extend(o,{scrollTop:0,scrollLeft:0,winHeight:0,winWidth:0,docHeight:1<<30,docWidth:1<<30,sliders:[],isReady:!1,isFresh:!1,isBusy:!1,setup:function(){function i(){if(u==e.pageYOffset)return e.requestAnimationFrame(i),!1;u=e.pageYOffset,r.render(),e.requestAnimationFrame(i)}if(!this.isReady){var r=this,s=t(n),a=t(e),l=function(){o.winHeight=a.height(),o.winWidth=a.width(),o.docHeight=s.height(),o.docWidth=s.width()},c=function(){var t=a.scrollTop(),e=o.docHeight-o.winHeight,n=o.docWidth-o.winWidth;o.scrollTop=Math.max(0,Math.min(e,t)),o.scrollLeft=Math.max(0,Math.min(n,a.scrollLeft())),o.overScroll=Math.max(t-e,Math.min(t,0))};a.on("resize.px.parallax load.px.parallax",function(){l(),r.refresh(),o.isFresh=!1,o.requestRender()}).on("scroll.px.parallax load.px.parallax",function(){c(),o.requestRender()}),l(),c(),this.isReady=!0;var u=-1;i()}},configure:function(e){"object"==typeof e&&(delete e.refresh,delete e.render,t.extend(this.prototype,e))},refresh:function(){t.each(this.sliders,function(){this.refresh()}),this.isFresh=!0},render:function(){this.isFresh||this.refresh(),t.each(this.sliders,function(){this.render()})},requestRender:function(){this.render(),this.isBusy=!1},destroy:function(n){var i,r=t(n).data("px.parallax");for(r.$mirror.remove(),i=0;i<this.sliders.length;i+=1)this.sliders[i]==r&&this.sliders.splice(i,1);t(n).data("px.parallax",!1),0===this.sliders.length&&(t(e).off("scroll.px.parallax resize.px.parallax load.px.parallax"),this.isReady=!1,o.isSetup=!1)}});var r=t.fn.parallax;t.fn.parallax=function(i){return this.each(function(){var r=t(this),s="object"==typeof i&&i;this==e||this==n||r.is("body")?o.configure(s):r.data("px.parallax")?"object"==typeof i&&t.extend(r.data("px.parallax"),s):(s=t.extend({},r.data(),s),r.data("px.parallax",new o(this,s))),"string"==typeof i&&("destroy"==i?o.destroy(this):o[i]())})},t.fn.parallax.Constructor=o,t.fn.parallax.noConflict=function(){return t.fn.parallax=r,this},t(function(){t('[data-parallax="scroll"]').parallax()})}(jQuery,window,document),function(){var t,e,n,i,o,r=function(t,e){return function(){return t.apply(e,arguments)}},s=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};e=function(){function t(){}return t.prototype.extend=function(t,e){var n,i;for(n in e)i=e[n],null==t[n]&&(t[n]=i);return t},t.prototype.isMobile=function(t){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)},t.prototype.createEvent=function(t,e,n,i){var o;return null==e&&(e=!1),null==n&&(n=!1),null==i&&(i=null),null!=document.createEvent?(o=document.createEvent("CustomEvent")).initCustomEvent(t,e,n,i):null!=document.createEventObject?(o=document.createEventObject(),o.eventType=t):o.eventName=t,o},t.prototype.emitEvent=function(t,e){return null!=t.dispatchEvent?t.dispatchEvent(e):e in(null!=t)?t[e]():"on"+e in(null!=t)?t["on"+e]():void 0},t.prototype.addEvent=function(t,e,n){return null!=t.addEventListener?t.addEventListener(e,n,!1):null!=t.attachEvent?t.attachEvent("on"+e,n):t[e]=n},t.prototype.removeEvent=function(t,e,n){return null!=t.removeEventListener?t.removeEventListener(e,n,!1):null!=t.detachEvent?t.detachEvent("on"+e,n):delete t[e]},t.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},t}(),n=this.WeakMap||this.MozWeakMap||(n=function(){function t(){this.keys=[],this.values=[]}return t.prototype.get=function(t){var e,n,i,o;for(e=n=0,i=(o=this.keys).length;i>n;e=++n)if(o[e]===t)return this.values[e]},t.prototype.set=function(t,e){var n,i,o,r;for(n=i=0,o=(r=this.keys).length;o>i;n=++i)if(r[n]===t)return void(this.values[n]=e);return this.keys.push(t),this.values.push(e)},t}()),t=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(t=function(){function t(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return t.notSupported=!0,t.prototype.observe=function(){},t}()),i=this.getComputedStyle||function(t){return this.getPropertyValue=function(e){var n;return"float"===e&&(e="styleFloat"),o.test(e)&&e.replace(o,function(t,e){return e.toUpperCase()}),(null!=(n=t.currentStyle)?n[e]:void 0)||null},this},o=/(\-([a-z]){1})/g,this.WOW=function(){function o(t){null==t&&(t={}),this.scrollCallback=r(this.scrollCallback,this),this.scrollHandler=r(this.scrollHandler,this),this.resetAnimation=r(this.resetAnimation,this),this.start=r(this.start,this),this.scrolled=!0,this.config=this.util().extend(t,this.defaults),this.animationNameCache=new n,this.wowEvent=this.util().createEvent(this.config.boxClass)}return o.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},o.prototype.init=function(){var t;return this.element=window.document.documentElement,"interactive"===(t=document.readyState)||"complete"===t?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},o.prototype.start=function(){var e,n,i,o;if(this.stopped=!1,this.boxes=function(){var t,n,i,o;for(o=[],t=0,n=(i=this.element.querySelectorAll("."+this.config.boxClass)).length;n>t;t++)e=i[t],o.push(e);return o}.call(this),this.all=function(){var t,n,i,o;for(o=[],t=0,n=(i=this.boxes).length;n>t;t++)e=i[t],o.push(e);return o}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(o=this.boxes,n=0,i=o.length;i>n;n++)e=o[n],this.applyStyle(e,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new t(function(t){return function(e){var n,i,o,r,s;for(s=[],n=0,i=e.length;i>n;n++)r=e[n],s.push(function(){var t,e,n,i;for(i=[],t=0,e=(n=r.addedNodes||[]).length;e>t;t++)o=n[t],i.push(this.doSync(o));return i}.call(t));return s}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},o.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},o.prototype.sync=function(){return t.notSupported?this.doSync(this.element):void 0},o.prototype.doSync=function(t){var e,n,i,o,r;if(null==t&&(t=this.element),1===t.nodeType){for(r=[],n=0,i=(o=(t=t.parentNode||t).querySelectorAll("."+this.config.boxClass)).length;i>n;n++)e=o[n],s.call(this.all,e)<0?(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),r.push(this.scrolled=!0)):r.push(void 0);return r}},o.prototype.show=function(t){return this.applyStyle(t),t.className=t.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(t),this.util().emitEvent(t,this.wowEvent),this.util().addEvent(t,"animationend",this.resetAnimation),this.util().addEvent(t,"oanimationend",this.resetAnimation),this.util().addEvent(t,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(t,"MSAnimationEnd",this.resetAnimation),t},o.prototype.applyStyle=function(t,e){var n,i,o;return i=t.getAttribute("data-wow-duration"),n=t.getAttribute("data-wow-delay"),o=t.getAttribute("data-wow-iteration"),this.animate(function(r){return function(){return r.customStyle(t,e,i,n,o)}}(this))},o.prototype.animate="requestAnimationFrame"in window?function(t){return window.requestAnimationFrame(t)}:function(t){return t()},o.prototype.resetStyle=function(){var t,e,n,i,o;for(o=[],e=0,n=(i=this.boxes).length;n>e;e++)t=i[e],o.push(t.style.visibility="visible");return o},o.prototype.resetAnimation=function(t){var e;return t.type.toLowerCase().indexOf("animationend")>=0?(e=t.target||t.srcElement,e.className=e.className.replace(this.config.animateClass,"").trim()):void 0},o.prototype.customStyle=function(t,e,n,i,o){return e&&this.cacheAnimationName(t),t.style.visibility=e?"hidden":"visible",n&&this.vendorSet(t.style,{animationDuration:n}),i&&this.vendorSet(t.style,{animationDelay:i}),o&&this.vendorSet(t.style,{animationIterationCount:o}),this.vendorSet(t.style,{animationName:e?"none":this.cachedAnimationName(t)}),t},o.prototype.vendors=["moz","webkit"],o.prototype.vendorSet=function(t,e){var n,i,o,r;i=[];for(n in e)o=e[n],t[""+n]=o,i.push(function(){var e,i,s,a;for(a=[],e=0,i=(s=this.vendors).length;i>e;e++)r=s[e],a.push(t[""+r+n.charAt(0).toUpperCase()+n.substr(1)]=o);return a}.call(this));return i},o.prototype.vendorCSS=function(t,e){var n,o,r,s,a,l;for(s=(a=i(t)).getPropertyCSSValue(e),n=0,o=(r=this.vendors).length;o>n;n++)l=r[n],s=s||a.getPropertyCSSValue("-"+l+"-"+e);return s},o.prototype.animationName=function(t){var e;try{e=this.vendorCSS(t,"animation-name").cssText}catch(n){e=i(t).getPropertyValue("animation-name")}return"none"===e?"":e},o.prototype.cacheAnimationName=function(t){return this.animationNameCache.set(t,this.animationName(t))},o.prototype.cachedAnimationName=function(t){return this.animationNameCache.get(t)},o.prototype.scrollHandler=function(){return this.scrolled=!0},o.prototype.scrollCallback=function(){var t;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var e,n,i,o;for(o=[],e=0,n=(i=this.boxes).length;n>e;e++)(t=i[e])&&(this.isVisible(t)?this.show(t):o.push(t));return o}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},o.prototype.offsetTop=function(t){for(var e;void 0===t.offsetTop;)t=t.parentNode;for(e=t.offsetTop;t=t.offsetParent;)e+=t.offsetTop;return e},o.prototype.isVisible=function(t){var e,n,i,o,r;return n=t.getAttribute("data-wow-offset")||this.config.offset,r=window.pageYOffset,o=r+Math.min(this.element.clientHeight,this.util().innerHeight())-n,i=this.offsetTop(t),e=i+t.clientHeight,o>=i&&e>=r},o.prototype.util=function(){return null!=this._util?this._util:this._util=new e},o.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},o}()}.call(this),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):t.jQuery)}(this,function(t){"use strict";function e(t){var e,n,i,o,r,s,a,l={};for(a=0,s=(r=t.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").split(",")).length;a<s&&-1===(n=r[a]).search(/^(http|https|ftp):\/\//)&&-1!==n.search(":");a++)e=n.indexOf(":"),i=n.substring(0,e),(o=n.substring(e+1))||(o=void 0),"string"==typeof o&&(o="true"===o||"false"!==o&&o),"string"==typeof o&&(o=isNaN(o)?o:+o),l[i]=o;return null==i&&null==o?t:l}function n(n,i,s){if(this.$element=t(n),"string"==typeof i&&(i=e(i)),s?"string"==typeof s&&(s=e(s)):s={},"string"==typeof i)i=i.replace(/\.\w*$/,"");else if("object"==typeof i)for(var a in i)i.hasOwnProperty(a)&&(i[a]=i[a].replace(/\.\w*$/,""));this.settings=t.extend({},o,s),this.path=i;try{this.init()}catch(t){if(t.message!==r)throw t}}var i="vide",o={volume:1,playbackRate:1,muted:!0,loop:!0,autoplay:!0,position:"50% 50%",posterType:"detect",resizing:!0,bgColor:"transparent",className:""},r="Not implemented";n.prototype.init=function(){var e,n,i=this,o=i.path,s=o,a="",l=i.$element,c=i.settings,u=function(t){var e,n,i,o=(t=""+t).split(/\s+/),r="50%",s="50%";for(i=0,e=o.length;i<e;i++)"left"===(n=o[i])?r="0%":"right"===n?r="100%":"top"===n?s="0%":"bottom"===n?s="100%":"center"===n?0===i?r="50%":s="50%":0===i?r=n:s=n;return{x:r,y:s}}(c.position),d=c.posterType;n=i.$wrapper=t("<div>").addClass(c.className).css({position:"absolute","z-index":-1,top:0,left:0,bottom:0,right:0,overflow:"hidden","-webkit-background-size":"cover","-moz-background-size":"cover","-o-background-size":"cover","background-size":"cover","background-color":c.bgColor,"background-repeat":"no-repeat","background-position":u.x+" "+u.y}),"object"==typeof o&&(o.poster?s=o.poster:o.mp4?s=o.mp4:o.webm?s=o.webm:o.ogv&&(s=o.ogv)),"detect"===d?function(e,n){var i=function(){n(this.src)};t('<img src="'+e+'.gif">').on("load",i),t('<img src="'+e+'.jpg">').on("load",i),t('<img src="'+e+'.jpeg">').on("load",i),t('<img src="'+e+'.png">').on("load",i)}(s,function(t){n.css("background-image","url("+t+")")}):"none"!==d&&n.css("background-image","url("+s+"."+d+")"),"static"===l.css("position")&&l.css("position","relative"),l.prepend(n),"object"==typeof o?(o.mp4&&(a+='<source src="'+o.mp4+'.mp4" type="video/mp4">'),o.webm&&(a+='<source src="'+o.webm+'.webm" type="video/webm">'),o.ogv&&(a+='<source src="'+o.ogv+'.ogv" type="video/ogg">'),e=i.$video=t("<video>"+a+"</video>")):e=i.$video=t('<video><source src="'+o+'.mp4" type="video/mp4"><source src="'+o+'.webm" type="video/webm"><source src="'+o+'.ogv" type="video/ogg"></video>');try{e.prop({autoplay:c.autoplay,loop:c.loop,volume:c.volume,muted:c.muted,defaultMuted:c.muted,playbackRate:c.playbackRate,defaultPlaybackRate:c.playbackRate})}catch(t){throw new Error(r)}e.css({margin:"auto",position:"absolute","z-index":-1,top:u.y,left:u.x,"-webkit-transform":"translate(-"+u.x+", -"+u.y+")","-ms-transform":"translate(-"+u.x+", -"+u.y+")","-moz-transform":"translate(-"+u.x+", -"+u.y+")",transform:"translate(-"+u.x+", -"+u.y+")",visibility:"hidden",opacity:0}).one("canplaythrough.vide",function(){i.resize()}).one("playing.vide",function(){e.css({visibility:"visible",opacity:1}),n.css("background-image","none")}),l.on("resize.vide",function(){c.resizing&&i.resize()}),n.append(e)},n.prototype.getVideoObject=function(){return this.$video[0]},n.prototype.resize=function(){if(this.$video){var t=this.$wrapper,e=this.$video,n=e[0],i=n.videoHeight,o=n.videoWidth,r=t.height(),s=t.width();s/o>r/i?e.css({width:s+2,height:"auto"}):e.css({width:"auto",height:r+2})}},n.prototype.destroy=function(){delete t[i].lookup[this.index],this.$video&&this.$video.off(i),this.$element.off(i).removeData(i),this.$wrapper.remove()},t[i]={lookup:[]},t.fn[i]=function(e,o){var r;return this.each(function(){(r=t.data(this,i))&&r.destroy(),(r=new n(this,e,o)).index=t[i].lookup.push(r)-1,t.data(this,i,r)}),this},t(document).ready(function(){var e=t(window);e.on("resize.vide",function(){for(var e,n=t[i].lookup.length,o=0;o<n;o++)(e=t[i].lookup[o])&&e.settings.resizing&&e.resize()}),e.on("unload.vide",function(){return!1}),t(document).find("[data-vide-bg]").each(function(e,n){var o=t(n),r=o.data("vide-options"),s=o.data("vide-bg");o[i](s,r)})})}),function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Typed=e():t.Typed=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(1),r=n(3),s=function(){function t(e,n){(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")})(this,t),o.initializer.load(this,n,e),this.begin()}return i(t,[{key:"toggle",value:function(){this.pause.status?this.start():this.stop()}},{key:"stop",value:function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))}},{key:"start",value:function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))}},{key:"destroy",value:function(){this.reset(!1),this.options.onDestroy(this)}},{key:"reset",value:function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())}},{key:"begin",value:function(){var t=this;this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout(function(){t.currentElContent&&0!==t.currentElContent.length?t.backspace(t.currentElContent,t.currentElContent.length):t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},this.startDelay)}},{key:"typewrite",value:function(t,e){var n=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var i=this.humanizer(this.typeSpeed),o=1;return!0===this.pause.status?void this.setPauseStatus(t,e,!0):void(this.timeout=setTimeout(function(){e=r.htmlParser.typeHtmlChars(t,e,n);var i=0,s=t.substr(e);if("^"===s.charAt(0)&&/^\^\d+/.test(s)){var a=1;a+=(s=/\d+/.exec(s)[0]).length,i=parseInt(s),n.temporaryPause=!0,n.options.onTypingPaused(n.arrayPos,n),t=t.substring(0,e)+t.substring(e+a),n.toggleBlinking(!0)}if("`"===s.charAt(0)){for(;"`"!==t.substr(e+o).charAt(0)&&(o++,!(e+o>t.length)););var l=t.substring(0,e),c=t.substring(l.length+1,e+o),u=t.substring(e+o+1);t=l+c+u,o--}n.timeout=setTimeout(function(){n.toggleBlinking(!1),e===t.length?n.doneTyping(t,e):n.keepTyping(t,e,o),n.temporaryPause&&(n.temporaryPause=!1,n.options.onTypingResumed(n.arrayPos,n))},i)},i))}},{key:"keepTyping",value:function(t,e,n){0===e&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this)),e+=n;var i=t.substr(0,e);this.replaceText(i),this.typewrite(t,e)}},{key:"doneTyping",value:function(t,e){var n=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=setTimeout(function(){n.backspace(t,e)},this.backDelay))}},{key:"backspace",value:function(t,e){var n=this;if(!0!==this.pause.status){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var i=this.humanizer(this.backSpeed);this.timeout=setTimeout(function(){e=r.htmlParser.backSpaceHtmlChars(t,e,n);var i=t.substr(0,e);if(n.replaceText(i),n.smartBackspace){var o=n.strings[n.arrayPos+1];o&&i===o.substr(0,e)?n.stopNum=e:n.stopNum=0}e>n.stopNum?(e--,n.backspace(t,e)):e<=n.stopNum&&(n.arrayPos++,n.arrayPos===n.strings.length?(n.arrayPos=0,n.options.onLastStringBackspaced(),n.shuffleStringsIfNeeded(),n.begin()):n.typewrite(n.strings[n.sequence[n.arrayPos]],e))},i)}else this.setPauseStatus(t,e,!0)}},{key:"complete",value:function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0}},{key:"setPauseStatus",value:function(t,e,n){this.pause.typewrite=n,this.pause.curString=t,this.pause.curStrPos=e}},{key:"toggleBlinking",value:function(t){if(this.cursor&&!this.pause.status&&this.cursorBlinking!==t){this.cursorBlinking=t;var e=t?"infinite":0;this.cursor.style.animationIterationCount=e}}},{key:"humanizer",value:function(t){return Math.round(Math.random()*t/2)+t}},{key:"shuffleStringsIfNeeded",value:function(){this.shuffle&&(this.sequence=this.sequence.sort(function(){return Math.random()-.5}))}},{key:"initFadeOut",value:function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout(function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)},this.fadeOutDelay)}},{key:"replaceText",value:function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t}},{key:"bindFocusEvents",value:function(){var t=this;this.isInput&&(this.el.addEventListener("focus",function(e){t.stop()}),this.el.addEventListener("blur",function(e){t.el.value&&0!==t.el.value.length||t.start()}))}},{key:"insertCursor",value:function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))}}]),t}();e.default=s,t.exports=e.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(t){return t&&t.__esModule?t:{default:t}}(n(2)),s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return o(t,[{key:"load",value:function(t,e,n){if(t.el="string"==typeof n?document.querySelector(n):n,t.options=i({},r.default,e),t.isInput="input"===t.el.tagName.toLowerCase(),t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map(function(t){return t.trim()}),"string"==typeof t.options.stringsElement?t.stringsElement=document.querySelector(t.options.stringsElement):t.stringsElement=t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.display="none";var o=Array.prototype.slice.apply(t.stringsElement.children),s=o.length;if(s)for(l=0;l<s;l+=1){var a=o[l];t.strings.push(a.innerHTML.trim())}}t.strPos=0,t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.sequence=[],t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1;for(var l in t.strings)t.sequence[l]=l;t.currentElContent=this.getCurrentElContent(t),t.autoInsertCss=t.options.autoInsertCss,this.appendAnimationCss(t)}},{key:"getCurrentElContent",value:function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent}},{key:"appendAnimationCss",value:function(t){if(t.autoInsertCss&&t.showCursor&&t.fadeOut){var e=document.createElement("style");e.type="text/css";var n="";t.showCursor&&(n+="\n        .typed-cursor{\n          opacity: 1;\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),t.fadeOut&&(n+="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n          -webkit-animation: 0;\n                  animation: 0;\n        }\n      "),0!==e.length&&(e.innerHTML=n,document.head.appendChild(e))}}}]),t}();e.default=s;var a=new s;e.initializer=a},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onComplete:function(t){},preStringTyped:function(t,e){},onStringTyped:function(t,e){},onLastStringBackspaced:function(t){},onTypingPaused:function(t,e){},onTypingResumed:function(t,e){},onReset:function(t){},onStop:function(t,e){},onStart:function(t,e){},onDestroy:function(t){}},t.exports=e.default},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return n(t,[{key:"typeHtmlChars",value:function(t,e,n){if("html"!==n.contentType)return e;var i=t.substr(e).charAt(0);if("<"===i||"&"===i){var o="";for(o="<"===i?">":";";t.substr(e+1).charAt(0)!==o&&!(++e+1>t.length););e++}return e}},{key:"backSpaceHtmlChars",value:function(t,e,n){if("html"!==n.contentType)return e;var i=t.substr(e).charAt(0);if(">"===i||";"===i){var o="";for(o=">"===i?"<":"&";t.substr(e-1).charAt(0)!==o&&!(--e<0););e--}return e}}]),t}();e.default=i;var o=new i;e.htmlParser=o}])}),appear=function(){"use strict";var t=null,e=0,n={};return addEventListener("scroll",function(){var i=window.scrollY||window.pageYOffset;null!=t&&(n.velocity=i-t,n.delta=n.velocity>=0?n.velocity:-1*n.velocity),t=i,e&&clearTimeout(e),e=setTimeout(function(){t=null},30)},!1),function(t){return function(t){function e(){n.delta<g.delta.speed&&(c||(c=!0,r(),setTimeout(function(){c=!1},g.delta.timeout))),function(t,e){return function(){var n=this,i=arguments;clearTimeout(l),l=setTimeout(function(){t.apply(n,i)},e)}}(function(){r()},g.debounce)()}function i(){r(),addEventListener("scroll",e,!1),addEventListener("resize",e,!1)}function o(){removeEventListener("scroll",e,!1),removeEventListener("resize",e,!1)}function r(){u||(p.forEach(function(t,e){t&&function(t,e){var n=t.getBoundingClientRect();return n.top+n.height>=0&&n.left+n.width>=0&&n.bottom-n.height<=(window.innerHeight||document.documentElement.clientHeight)+e&&n.right-n.width<=(window.innerWidth||document.documentElement.clientWidth)+e}(t,g.bounds)?h[e]&&(h[e]=!1,f++,g.appear&&g.appear(t),g.disappear||g.reappear||(p[e]=null)):(!1===h[e]&&(g.disappear&&g.disappear(t),m++,g.reappear||(p[e]=null)),h[e]=!0)}),g.reappear||g.appear&&(!g.appear||f!==a)||g.disappear&&(!g.disappear||m!==a)||(u=!0,o(),g.done&&g.done()))}function s(){if(!d){d=!0,g.init&&g.init();var t;if(t="function"==typeof g.elements?g.elements():g.elements){a=t.length;for(var e=0;a>e;e+=1)p.push(t[e]),h.push(!0);i()}}}var a,l,c,u,d=!1,p=[],h=[],f=0,m=0,g={};return function(t){g={init:(t=t||{}).init,elements:t.elements,appear:t.appear,disappear:t.disappear,done:t.done,reappear:t.reappear,bounds:t.bounds||0,debounce:t.debounce||50,delta:{speed:t.deltaSpeed||50,timeout:t.deltaTimeout||500}},addEventListener("DOMContentLoaded",s,!1);var e=!1;Function("/*@cc_on return document.documentMode===10@*/")()&&(e=!0);var n="complete"===document.readyState||"loaded"===document.readyState;return e?n&&s():(n||"interactive"===document.readyState)&&s(),{trigger:function(){r()},pause:function(){o()},resume:function(){i()},destroy:function(){p=[],l&&clearTimeout(l),o()}}}}()(t)}}(),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){"use strict";function e(t){var e=t.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)}function n(t){return function(n){var i=n.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(i)for(var o=0,r=i.length;o<r;++o){var a=i[o].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),l=e(a[0]),c=a[1]||"",u=a[3]||"",d=null;a=a[2],s.hasOwnProperty(a)&&(d=s[a],d=Number(t[d])),null!==d&&("!"===c&&(d=function(t,e){var n="s",i="";return t&&(1===(t=t.replace(/(:|;|\s)/gi,"").split(/\,/)).length?n=t[0]:(i=t[0],n=t[1])),Math.abs(e)>1?n:i}(u,d)),""===c&&d<10&&(d="0"+d.toString()),n=n.replace(l,d.toString()))}return n=n.replace(/%%/,"%")}}var i=[],o=[],r={precision:100,elapse:!1,defer:!1};o.push(/^[0-9]*$/.source),o.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),o.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),o=new RegExp(o.join("|"));var s={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},a=function(e,n,o){this.el=e,this.$el=t(e),this.interval=null,this.offset={},this.options=t.extend({},r),this.instanceNumber=i.length,i.push(this),this.$el.data("countdown-instance",this.instanceNumber),o&&("function"==typeof o?(this.$el.on("update.countdown",o),this.$el.on("stoped.countdown",o),this.$el.on("finish.countdown",o)):this.options=t.extend({},r,o)),this.setFinalDate(n),!1===this.options.defer&&this.start()};t.extend(a.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var t=this;this.update(),this.interval=setInterval(function(){t.update.call(t)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),i[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(t){this.finalDate=function(t){if(t instanceof Date)return t;if(String(t).match(o))return String(t).match(/^[0-9]*$/)&&(t=Number(t)),String(t).match(/\-/)&&(t=String(t).replace(/\-/g,"/")),new Date(t);throw new Error("Couldn't cast `"+t+"` to a date object.")}(t)},update:function(){if(0!==this.$el.closest("html").length){var e,n=void 0!==t._data(this.el,"events"),i=new Date;e=this.finalDate.getTime()-i.getTime(),e=Math.ceil(e/1e3),e=!this.options.elapse&&e<0?0:Math.abs(e),this.totalSecsLeft!==e&&n&&(this.totalSecsLeft=e,this.elapsed=i>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-i.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))}else this.remove()},dispatchEvent:function(e){var i=t.Event(e+".countdown");i.finalDate=this.finalDate,i.elapsed=this.elapsed,i.offset=t.extend({},this.offset),i.strftime=n(this.offset),this.$el.trigger(i)}}),t.fn.countdown=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){var n=t(this).data("countdown-instance");if(void 0!==n){var o=i[n],r=e[0];a.prototype.hasOwnProperty(r)?o[r].apply(o,e.slice(1)):null===String(r).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(o.setFinalDate.call(o,r),o.start()):t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,r))}else new a(this,e[0],e[1])})}}),function(){function t(){E.keyboardSupport&&p("keydown",o)}function e(){if(!I&&document.body){I=!0;var e=document.body,n=document.documentElement,i=window.innerHeight,o=e.scrollHeight;if(O=document.compatMode.indexOf("CSS")>=0?n:e,b=e,t(),top!=self)k=!0;else if(Q&&o>i&&(e.offsetHeight<=i||n.offsetHeight<=i)){var r=document.createElement("div");r.style.cssText="position:absolute; z-index:-10000; top:0; left:0; right:0; height:"+O.scrollHeight+"px",document.body.appendChild(r);var s;x=function(){s||(s=setTimeout(function(){_||(r.style.height="0",r.style.height=O.scrollHeight+"px",s=null)},500))},setTimeout(x,10),p("resize",x);if((w=new z(x)).observe(e,{attributes:!0,childList:!0,characterData:!1}),O.offsetHeight<=i){var a=document.createElement("div");a.style.clear="both",e.appendChild(a)}}E.fixedBackground||_||(e.style.backgroundAttachment="scroll",n.style.backgroundAttachment="scroll")}}function n(t,e,n){if(function(t,e){t=t>0?1:-1,e=e>0?1:-1,(A.x!==t||A.y!==e)&&(A.x=t,A.y=e,N=[],M=0)}(e,n),1!=E.accelerationMax){var i=Date.now()-M;if(i<E.accelerationDelta){var o=(1+50/i)/2;o>1&&(o=Math.min(o,E.accelerationMax),e*=o,n*=o)}M=Date.now()}if(N.push({x:e,y:n,lastX:0>e?.99:-.99,lastY:0>n?.99:-.99,start:Date.now()}),!H){var r=t===document.body,s=function(i){for(var o=Date.now(),a=0,l=0,c=0;c<N.length;c++){var u=N[c],d=o-u.start,p=d>=E.animationTime,h=p?1:d/E.animationTime;E.pulseAlgorithm&&(h=function(t){return t>=1?1:0>=t?0:(1==E.pulseNormalize&&(E.pulseNormalize/=v(1)),v(t))}(h));var f=u.x*h-u.lastX>>0,m=u.y*h-u.lastY>>0;a+=f,l+=m,u.lastX+=f,u.lastY+=m,p&&(N.splice(c,1),c--)}r?window.scrollBy(a,l):(a&&(t.scrollLeft+=a),l&&(t.scrollTop+=l)),e||n||(N=[]),N.length?F(s,t,1e3/E.frameRate+1):H=!1};F(s,t,0),H=!0}}function i(t){I||e();var i=t.target;if(t.defaultPrevented||t.ctrlKey)return!0;if(f(b,"embed")||f(i,"embed")&&/\.pdf/i.test(i.src)||f(b,"object")||i.shadowRoot)return!0;var o=-t.wheelDeltaX||t.deltaX||0,r=-t.wheelDeltaY||t.deltaY||0;L&&(t.wheelDeltaX&&m(t.wheelDeltaX,120)&&(o=t.wheelDeltaX/Math.abs(t.wheelDeltaX)*-120),t.wheelDeltaY&&m(t.wheelDeltaY,120)&&(r=t.wheelDeltaY/Math.abs(t.wheelDeltaY)*-120)),o||r||(r=-t.wheelDelta||0),1===t.deltaMode&&(o*=40,r*=40);var a=l(i);return a?!!function(t){return t?(D.length||(D=[t,t,t]),t=Math.abs(t),D.push(t),D.shift(),clearTimeout(S),S=setTimeout(function(){try{localStorage.SS_deltaBuffer=D.join(",")}catch(t){}},1e3),!g(120)&&!g(100)):void 0}(r)||(Math.abs(o)>1.2&&(o*=E.stepSize/120),Math.abs(r)>1.2&&(r*=E.stepSize/120),n(a,o,r),t.preventDefault(),void s()):!k||!Y||(Object.defineProperty(t,"target",{value:window.frameElement}),parent.wheel(t))}function o(t){var e=t.target,i=t.ctrlKey||t.altKey||t.metaKey||t.shiftKey&&t.keyCode!==P.spacebar;document.body.contains(b)||(b=document.activeElement);var o=/^(button|submit|radio|checkbox|file|color|image)$/i;if(t.defaultPrevented||/^(textarea|select|embed|object)$/i.test(e.nodeName)||f(e,"input")&&!o.test(e.type)||f(b,"video")||function(t){var e=t.target,n=!1;if(-1!=document.URL.indexOf("www.youtube.com/watch"))do{if(n=e.classList&&e.classList.contains("html5-video-controls"))break}while(e=e.parentNode);return n}(t)||e.isContentEditable||i)return!0;if((f(e,"button")||f(e,"input")&&o.test(e.type))&&t.keyCode===P.spacebar)return!0;if(f(e,"input")&&"radio"==e.type&&$[t.keyCode])return!0;var r=0,a=0,c=l(b);if(!c)return!k||!Y||parent.keydown(t);var u=c.clientHeight;switch(c==document.body&&(u=window.innerHeight),t.keyCode){case P.up:a=-E.arrowScroll;break;case P.down:a=E.arrowScroll;break;case P.spacebar:a=-(t.shiftKey?1:-1)*u*.9;break;case P.pageup:a=.9*-u;break;case P.pagedown:a=.9*u;break;case P.home:a=-c.scrollTop;break;case P.end:var d=c.scrollHeight-c.scrollTop-u;a=d>0?d+10:0;break;case P.left:r=-E.arrowScroll;break;case P.right:r=E.arrowScroll;break;default:return!0}n(c,r,a),t.preventDefault(),s()}function r(t){b=t.target}function s(){clearTimeout(T),T=setInterval(function(){R={}},1e3)}function a(t,e){for(var n=t.length;n--;)R[j(t[n])]=e;return e}function l(t){var e=[],n=document.body,i=O.scrollHeight;do{var o=R[j(t)];if(o)return a(e,o);if(e.push(t),i===t.scrollHeight){var r=u(O)&&u(n)||d(O);if(k&&c(O)||!k&&r)return a(e,q())}else if(c(t)&&d(t))return a(e,t)}while(t=t.parentElement)}function c(t){return t.clientHeight+10<t.scrollHeight}function u(t){return"hidden"!==getComputedStyle(t,"").getPropertyValue("overflow-y")}function d(t){var e=getComputedStyle(t,"").getPropertyValue("overflow-y");return"scroll"===e||"auto"===e}function p(t,e){window.addEventListener(t,e,!1)}function h(t,e){window.removeEventListener(t,e,!1)}function f(t,e){return(t.nodeName||"").toLowerCase()===e.toLowerCase()}function m(t,e){return Math.floor(t/e)==t/e}function g(t){return m(D[0],t)&&m(D[1],t)&&m(D[2],t)}function v(t){var e,n,i;return 1>(t*=E.pulseScale)?e=t-(1-Math.exp(-t)):(n=Math.exp(-1),t-=1,i=1-Math.exp(-t),e=n+i*(1-n)),e*E.pulseNormalize}function y(t){for(var e in t)C.hasOwnProperty(e)&&(E[e]=t[e])}var b,w,x,T,S,C={frameRate:150,animationTime:400,stepSize:100,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,fixedBackground:!0,excluded:""},E=C,_=!1,k=!1,A={x:0,y:0},I=!1,O=document.documentElement,D=[],L=/^Mac/.test(navigator.platform),P={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},$={37:1,38:1,39:1,40:1},N=[],H=!1,M=Date.now(),j=function(){var t=0;return function(e){return e.uniqueID||(e.uniqueID=t++)}}(),R={};if(window.localStorage&&localStorage.SS_deltaBuffer)try{D=localStorage.SS_deltaBuffer.split(",")}catch(t){}var W,F=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t,e,n){window.setTimeout(t,n||1e3/60)},z=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,q=function(){var t;return function(){if(!t){var e=document.createElement("div");e.style.cssText="height:10000px;width:1px;",document.body.appendChild(e);var n=document.body.scrollTop;document.documentElement.scrollTop,window.scrollBy(0,3),t=document.body.scrollTop!=n?document.body:document.documentElement,window.scrollBy(0,-3),document.body.removeChild(e)}return t}}(),B=window.navigator.userAgent,U=/Edge/.test(B),Y=/chrome/i.test(B)&&!U,V=/safari/i.test(B)&&!U,X=/mobile/i.test(B),G=/Windows NT 6.1/i.test(B)&&/rv:11/i.test(B),Q=V&&(/Version\/8/i.test(B)||/Version\/9/i.test(B)),K=(Y||V||G)&&!X;"onwheel"in document.createElement("div")?W="wheel":"onmousewheel"in document.createElement("div")&&(W="mousewheel"),W&&K&&(p(W,i),p("mousedown",r),p("load",e)),y.destroy=function(){w&&w.disconnect(),h(W,i),h("mousedown",r),h("keydown",o),h("resize",x),h("load",e)},window.SmoothScrollOptions&&y(window.SmoothScrollOptions),"function"==typeof define&&define.amd?define(function(){return y}):"object"==typeof exports?module.exports=y:window.SmoothScroll=y}();
(function($){
  'use strict';
  var devdap = {
    // Inverse header background when scroll 
    hederInverse: function(){
      $(window).on('scroll', function() {
          if ($(this).scrollTop() > 5) {
              $('body').addClass('is-scrolling');
          } else {
              $('body').removeClass('is-scrolling');
          }
      });
    },
    carouselsInit:function(){
      $('[data-init="carousel"]').slick({
				customPaging: function(){
					return "<span class='slick-dot'></span>";
				}
			});
    },
					
			slickMargin: function(){
				$('[data-slick-margin]').each(function(){
					
						var margin = $(this).data('slick-margin');
					
						$(this).find('.slick-list').css({
							marginLeft:-margin,
							marginRight:-margin
						});
					
						$(this).find('.slick-slide').css({
							marginLeft:margin,
							marginRight:margin
						});
					
				});
			},
					
			hamburgarToggler: function(){
              $('.js-hamburger').on('click', function(){
                $(this).toggleClass('is-active');
              });
			},
		
	 

			parallaxInit: function(){
				if($(window).width() > 768 ){
				  $('[data-parallax]').each(function(){
						var params =  {
							imageSrc: $(this).data('parallax'),
							speed: 0.3
						};
						$(this).parallax(params);
					});
				}
			},
			
			accordianToggleIcon: function(){
				$(".accordion__title").on('click', function(){
					$('.accordion__title.active').removeClass('active');
					$(this).addClass('active');
				});
			},
	  
		
			// Smooth scroll to target element
		
			scrollTo: function(){
					$('[data-scrollto]').on('click', function(){
					var id = '#' + $(this).data('scrollto');
					if ( $(id).length > 0 ) {
						var offset = 0;
						if ( $('.header').length ) {
							offset = $('.header').height();
						}
						$('html').animate({scrollTop: $(id).offset().top - offset}, 700);
					}
					return false;
				});
			},
		
		// Tabs toggle 
		tabsToggle: function(){
			$('.tabs a').click(function (e) {
				$('.tabs a.active').removeClass('active box-shadow-v1');
				e.preventDefault();
				$(this).tab('show');
				$(this).addClass('active box-shadow-v1');
			});
		},
		
  	/// Scroll to top
		scrollTop: function(){
			var documentOffsetHeight = document.body.offsetHeight;
			var windowHeight = $(window).height();
			$(window).on('scroll', function() {
				if ($(this).scrollTop() > (windowHeight + 500) ){
					$('.scroll-top.active').removeClass('active');
					$('.scroll-top').addClass('active');
				} else {
					$('.scroll-top').removeClass('active');
				}
			});
			$('.scroll-top').on('click', function() {
				$("html, body").animate({
						scrollTop: 0
				}, 600);
				return false;
			});
		},
		
		wowInit: function(){
			var wow = new WOW(
				{
					boxClass:     'wow',     
					animateClass: 'animated',
					offset:       0,         
					mobile:       true,  
					live:         true,       
					scrollContainer: null 
				}
			);
			wow.init();
		},
		
		
		isotop: function(){
			$('.portfolio-filter').on('click', 'li', function(){
				var filterValue = $(this).attr('data-filter');
				$('.portfolio-filter > li.active').removeClass('active');
				$(this).addClass('active');
				$('.portfolio').isotope({
					filter: filterValue
				});
			});

			var $portfolio = $('.portfolio'); 
			$portfolio.imagesLoaded( function(){
				$portfolio.isotope({
					itemSelector : '.portfolio-item',
					layoutMode: 'fitRows'
				});
			});
		},
		
		postTab: function(){
			$('.post-tab-list').on('click', 'a', function(e) {
						e.preventDefault();
					$('.post-tab-list a.active').removeClass('active');
						var tab = $(this).data('tab');
						$('.post__tab-content').removeClass('active');
						$('#' + tab).addClass('active');
						$(this).addClass('active');

				}); 
		},
		
			typingText: function(){
				if($('[data-type]').data('type') === undefined){
					return false;
				} 
				var typedTxt = $('[data-type]').data('type').split(',');
				var typed = new Typed('[data-type]', {
					strings: typedTxt,
					typeSpeed: 80,
					loop:true,
					backSpeed: 80,
					showCursor:false
				});
			},

		BSprogressBar: function() {

		    if (typeof appear === 'function') {
		        appear({
		            elements: function elements() {
		                return $('.progress-bar');
		            },
		            appear: function appear(el) {
		                $(el).each(function() {
		                    var progressWidth = $(this).attr('aria-valuenow');
		                    $(this).css({
		                        width: progressWidth + "%"
		                    });
		                });
		            },
		            bounds: 200,
		            reappear: true
		        });
		    } else {
		        $('.progress-bar').each(function() {
		            var progressWidth = $(this).attr('aria-valuenow');
		            $(this).css({
		                width: progressWidth + "%"
		            });
		        });
		    }
		},
		
		
		countDown: function(){
			if(!$.fn.countdown) return;
			$('[data-countdown]').each(function() {
				var $this = $(this), finalDate = $(this).data('countdown');
				$this.countdown(finalDate, function(event) {
					 
					if($this.find('.countdown-days').length > 0){ 
						$this.find('.countdown-days').text(event.strftime('%D'));
					}
					if($this.find('.countdown-hours').length > 0){ 
						$this.find('.countdown-hours').text(event.strftime('%H'));
					}
					if($this.find('.countdown-minutes').length > 0){ 
						$this.find('.countdown-minutes').text(event.strftime('%M'));
					}
					if($this.find('.countdown-seconds').length > 0){ 
						$this.find('.countdown-seconds').text(event.strftime('%S'));
					}
				});
			});
		},
		
		// Init the main function 
    init: function(){
				devdap.hederInverse();
				devdap.carouselsInit();
				devdap.parallaxInit();
				devdap.hamburgarToggler();
				devdap.accordianToggleIcon();
				devdap.slickMargin();
				devdap.scrollTo();
				devdap.tabsToggle();
				devdap.scrollTop();
				if(typeof wow == 'function'){
					devdap.wowInit();
				}
				devdap.postTab();
				devdap.isotop(); 
			
			devdap.typingText();
			devdap.BSprogressBar();
			devdap.countDown();

    }
		
		

  }; 
	
	
	
  
  devdap.init();
  
}(jQuery));
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
