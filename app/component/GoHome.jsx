'use strict';

var React = require('react');
var findDOMNode = require('react-dom').findDOMNode;
import {Link} from 'react-router-dom';

import {WIDTH,CONTENT_HEIGHT} from '../route/const';

function classNames() {
  var classes = '';
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;
    var argType = typeof arg;
    if ('string' === argType || 'number' === argType) {
      classes += ' ' + arg;
    } else if (Array.isArray(arg)) {
      classes += ' ' + classNames.apply(null, arg);
    } else if ('object' === argType) {
      for (var key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes += ' ' + key;
        }
      }
    }
  }
  return classes.substr(1);
}

var emptyFunction = function () {};
var CX = classNames;

function createUIEvent(draggable) {
  return {
    position: {
      top: draggable.state.pageY,
      left: draggable.state.pageX
    }
  };
}

function canDragY(draggable) {
  return draggable.props.axis === 'both' ||
      draggable.props.axis === 'y';
}

function canDragX(draggable) {
  return draggable.props.axis === 'both' ||
      draggable.props.axis === 'x';
}

function isFunction(func) {
  return typeof func === 'function' ||
    Object.prototype.toString.call(func) === '[object Function]';
}

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array, callback) {
  for (var i = 0, length = array.length, element = null; i < length; i += 1) {
    element = array[i];
    if (callback.apply(callback, [element, i, array])) {
      return element;
    }
  }
}

function matchesSelector(el, selector) {
  var method = findInArray([
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ], function (method) {
    return isFunction(el[method]);
  });

  return el[method].call(el, selector);
}

// @credits:
// http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
/* Conditional to fix node server side rendering of component */
if (typeof window === 'undefined') {
    // Do Node Stuff
  var isTouchDevice = false;
} else {
  // Do Browser Stuff
  var isTouchDevice = 'ontouchstart' in window // works on most browsers
    || 'onmsgesturechange' in window; // works on ie10 on ms surface
  // Check for IE11
  try {
    document.createEvent('TouchEvent');
  } catch (e) {
    isTouchDevice = false;
  }

}

// look ::handleDragStart
//function isMultiTouch(e) {
//  return e.touches && Array.isArray(e.touches) && e.touches.length > 1
//}

/**
 * simple abstraction for dragging events names
 * */
var dragEventFor = (function () {
  var eventsFor = {
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    },
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    }
  };
  return eventsFor[isTouchDevice ? 'touch' : 'mouse'];
})();

/**
 * get {pageX, pageY} positions of control
 * */
function getControlPosition(e) {
  var position = (e.touches && e.touches[0]) || e;
  return {
    pageX: position.pageX,
    pageY: position.pageY
  };
}

function getBoundPosition(pageX, pageY, bound, target) {
  if (bound) {
    if ((typeof bound !== 'object') && (typeof bound !== 'string' && bound.toLowerCase() !== 'parent')) {
      console.warn('Bound should either "parent" or an object');
    }

    var par = target.parentNode;

    if(bound == 'body'){
        par = document.body;
    }

    var topLimit = bound.top || 40;
    var leftLimit = bound.left || 0;
    var rightLimit = bound.right || par.offsetWidth;
    var bottomLimit = bound.bottom || par.offsetHeight;
    pageX = Math.min(pageX, rightLimit - target.offsetWidth);
    pageY = Math.min(pageY, bottomLimit - target.offsetHeight);
    pageX = Math.max(leftLimit, pageX);
    pageY = Math.max(topLimit, pageY);
  }
  return {
    pageX: pageX,
    pageY: pageY
  };
}

function addEvent(el, event, handler) {
  if (!el) { return; }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
}

function removeEvent(el, event, handler) {
  if (!el) { return; }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
}

var GoHome = React.createClass({
  displayName: 'Draggable',

  propTypes: {

    axis: React.PropTypes.oneOf(['both', 'x', 'y']),

    handle: React.PropTypes.string,

    cancel: React.PropTypes.string,

    grid: React.PropTypes.arrayOf(React.PropTypes.number),

    start: React.PropTypes.object,

    onStart: React.PropTypes.func,

    onDrag: React.PropTypes.func,

    onStop: React.PropTypes.func,

    onMouseDown: React.PropTypes.func,

    bound: React.PropTypes.any
  },

  componentWillUnmount: function () {
      var node = findDOMNode(this);
    // Remove any leftover event handlers
    removeEvent(node, dragEventFor.move, this.handleDrag);
    removeEvent(node, dragEventFor.end, this.handleDragEnd);
  },

  getDefaultProps: function () {
    return {
      axis: 'both',
      handle: ".drage-handle",
      cancel: null,
      grid: null,
      bound: 'body',
      start: {
        x: WIDTH - 50,
        y: 200
      },
      onStart: emptyFunction,
      onDrag: emptyFunction,
      onStop: emptyFunction,
      onMouseDown: emptyFunction
    };
  },

  getInitialState: function () {
    return {
      // Whether or not currently dragging
      dragging: false,

      // Start top/left of this.getDOMNode()
      startX: 0,
      startY: 0,

      // Offset between start top/left and mouse top/left
      offsetX: 0,
      offsetY: 0,

      // Current top/left of this.getDOMNode()
      pageX: this.props.start.x,
      pageY: this.props.start.y
    };
  },

  handleDragStart: function (e) {
    // todo: write right implementation to prevent multitouch drag
    // prevent multi-touch events
    // if (isMultiTouch(e)) {
    //     this.handleDragEnd.apply(e, arguments);
    //     return
    // }

    // Make it possible to attach event handlers on top of this one
    this.props.onMouseDown(e);

    var node = findDOMNode(this);

    // Short circuit if handle or cancel prop was provided
    // and selector doesn't match
    if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
      (this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
      return;
    }

    var dragPoint = getControlPosition(e);

    // Initiate dragging
    this.setState({
      dragging: true,
      offsetX: parseInt(dragPoint.pageX, 10),
      offsetY: parseInt(dragPoint.pageY, 10),
      startX: parseInt(node.style.left, 10) || 0,
      startY: parseInt(node.style.top, 10) || 0
    });

    // Call event handler
    this.props.onStart(e, createUIEvent(this));

    // Add event handlers
    addEvent(node, dragEventFor.move, this.handleDrag);
    addEvent(node, dragEventFor.end, this.handleDragEnd);
  },

  handleDragEnd: function (e) {
    // Short circuit if not currently dragging
    if (!this.state.dragging) {
      return;
    }

    // Turn off dragging
    this.setState({
      dragging: false
    });

    var node = findDOMNode(this);

    // Call event handler
    this.props.onStop(e, createUIEvent(this));

    // Remove event handlers
    removeEvent(node, dragEventFor.move, this.handleDrag);
    removeEvent(node, dragEventFor.end, this.handleDragEnd);
  },

  handleDrag: function (e) {
    var dragPoint = getControlPosition(e);

    // Calculate top and left
    var pageX = (this.state.startX +
        (dragPoint.pageX - this.state.offsetX));
    var pageY = (this.state.startY +
        (dragPoint.pageY - this.state.offsetY));
    var pos =
      getBoundPosition(pageX, pageY, this.props.bound, findDOMNode(this));
    pageX = pos.pageX;
    pageY = pos.pageY;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      var directionX = pageX < parseInt(this.state.pageX, 10) ? -1 : 1;
      var directionY = pageY < parseInt(this.state.pageY, 10) ? -1 : 1;

      pageX = Math.abs(pageX - parseInt(this.state.pageX, 10)) >=
          this.props.grid[0]
          ? (parseInt(this.state.pageX, 10) +
            (this.props.grid[0] * directionX))
          : this.state.pageX;

      pageY = Math.abs(pageY - parseInt(this.state.pageY, 10)) >=
          this.props.grid[1]
          ? (parseInt(this.state.pageY, 10) +
            (this.props.grid[1] * directionY))
          : this.state.pageY;
    }

    // Update top and left
    this.setState({
      pageX: pageX,
      pageY: pageY
    });

    // Call event handler
    this.props.onDrag(e, createUIEvent(this));

    // Prevent the default behavior
    e.preventDefault();

  },

  render: function () {
    var originalStyle = {zIndex: 20000};
    var style = {
      // Set top if vertical drag is enabled
      top: canDragY(this)
        ? this.state.pageY
        : this.state.startY,

        // Set left if horizontal drag is enabled
      left: canDragX(this)
        ? this.state.pageX
        : this.state.startX
    };
    for (var s in originalStyle) {
      style[s] = originalStyle[s];
    }

    var className = CX({
      'react-drag': true,
      'react-drag-dragging': this.state.dragging,
      'go-home': true
    });
    // var oldClass = this.props.children.props.className;
    // if (oldClass) {
    //   className = oldClass + ' ' + className;
    // }
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(
        <div>
            <Link to="/news/info" className="drage-handle"></Link>
        </div>, {
      style: style,
      className: className,
      onMouseDown: this.handleDragStart,
      onTouchTap: function(event){
          event.preventDefault();
        //   window.browserHistory.push('/news/info');
          window.location.href = '/news/info';
      }.bind(this),
      onTouchStart: function (ev) {
        ev.preventDefault();
        // ev.preventDefault(); // prevent for scroll
        return this.handleDragStart.apply(this, arguments);
      }.bind(this),
      onMouseUp: this.handleDragEnd,
      onTouchEnd: this.handleDragEnd
    });
  }
});

module.exports = GoHome;
