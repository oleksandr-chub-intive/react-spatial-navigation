'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shuffle = require('lodash/shuffle');

var _shuffle2 = _interopRequireDefault(_shuffle);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _reactNative = require('react-native');

var _withFocusable = require('./withFocusable');

var _withFocusable2 = _interopRequireDefault(_withFocusable);

var _spatialNavigation = require('./spatialNavigation');

var _spatialNavigation2 = _interopRequireDefault(_spatialNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp */


_spatialNavigation2.default.init({
  debug: false,
  visualDebug: false
});

// SpatialNavigation.setKeyMap(keyMap); -> Custom key map

var KEY_ENTER = 'enter';

var styles = _reactNative.StyleSheet.create({
  wrapper: {
    flex: 1,
    maxHeight: 400,
    maxWidth: 800,
    backgroundColor: '#333333',
    flexDirection: 'row'
  },
  content: {
    flex: 1
  },
  menu: {
    maxWidth: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  menuFocused: {
    backgroundColor: '#546e84'
  },
  menuItem: {
    width: 50,
    height: 50,
    backgroundColor: '#f8f258'
  },
  activeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeProgram: {
    width: 160,
    height: 120
  },
  activeProgramTitle: {
    padding: 20,
    color: 'white'
  },
  programWrapper: {
    padding: 10,
    alignItems: 'center'
  },
  program: {
    height: 100,
    width: 100
  },
  programTitle: {
    color: 'white'
  },
  categoryWrapper: {
    padding: 20
  },
  categoryTitle: {
    color: 'white'
  },
  categoriesWrapper: {
    flex: 1
  },
  focusedBorder: {
    borderWidth: 6,
    borderColor: 'red',
    backgroundColor: 'white'
  }
});

var categories = (0, _shuffle2.default)([{
  title: 'Featured'
}, {
  title: 'Cool'
}, {
  title: 'Decent'
}]);

var programs = (0, _shuffle2.default)([{
  title: 'Program 1',
  color: '#337fdd'
}, {
  title: 'Program 2',
  color: '#dd4558'
}, {
  title: 'Program 3',
  color: '#7ddd6a'
}, {
  title: 'Program 4',
  color: '#dddd4d'
}, {
  title: 'Program 5',
  color: '#8299dd'
}, {
  title: 'Program 6',
  color: '#edab83'
}, {
  title: 'Program 7',
  color: '#60ed9e'
}, {
  title: 'Program 8',
  color: '#d15fb6'
}, {
  title: 'Program 9',
  color: '#c0ee33'
}]);

var RETURN_KEY = 8;
var B_KEY = 66;

/* eslint-disable react/prefer-stateless-function */

var MenuItem = function (_React$PureComponent) {
  _inherits(MenuItem, _React$PureComponent);

  function MenuItem() {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
  }

  _createClass(MenuItem, [{
    key: 'render',
    value: function render() {
      // console.log('Menu item rendered: ', this.props.realFocusKey);

      return _react2.default.createElement(_reactNative.TouchableOpacity, { style: [styles.menuItem, this.props.focused ? styles.focusedBorder : null] });
    }
  }]);

  return MenuItem;
}(_react2.default.PureComponent);

MenuItem.propTypes = {
  focused: _propTypes2.default.bool.isRequired

  // realFocusKey: PropTypes.string.isRequired
};

var MenuItemFocusable = (0, _withFocusable2.default)()(MenuItem);

var Menu = function (_React$PureComponent2) {
  _inherits(Menu, _React$PureComponent2);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this2.onPressKey = _this2.onPressKey.bind(_this2);
    return _this2;
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.setFocus();

      window.addEventListener('keydown', this.onPressKey);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.onPressKey);
    }
  }, {
    key: 'onPressKey',
    value: function onPressKey(event) {
      if (event.keyCode === RETURN_KEY) {
        this.props.setFocus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('Menu rendered: ', this.props.realFocusKey);

      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.menu, this.props.hasFocusedChild ? styles.menuFocused : null] },
        _react2.default.createElement(MenuItemFocusable, { focusKey: 'MENU-1' }),
        _react2.default.createElement(MenuItemFocusable, { focusKey: 'MENU-2' }),
        _react2.default.createElement(MenuItemFocusable, { focusKey: 'MENU-3' }),
        _react2.default.createElement(MenuItemFocusable, { focusKey: 'MENU-4' }),
        _react2.default.createElement(MenuItemFocusable, { focusKey: 'MENU-5' }),
        _react2.default.createElement(MenuItemFocusable, { focusKey: 'MENU-6' })
      );
    }
  }]);

  return Menu;
}(_react2.default.PureComponent);

Menu.propTypes = {
  setFocus: _propTypes2.default.func.isRequired,
  hasFocusedChild: _propTypes2.default.bool.isRequired

  // realFocusKey: PropTypes.string.isRequired
};

var MenuFocusable = (0, _withFocusable2.default)({
  trackChildren: true
})(Menu);

var Content = function (_React$PureComponent3) {
  _inherits(Content, _React$PureComponent3);

  function Content(props) {
    _classCallCheck(this, Content);

    var _this3 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this3.state = {
      currentProgram: null,
      blockNavigationOut: false
    };

    _this3.onPressKey = _this3.onPressKey.bind(_this3);
    _this3.onProgramPress = _this3.onProgramPress.bind(_this3);
    return _this3;
  }

  _createClass(Content, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.onPressKey);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.onPressKey);
    }
  }, {
    key: 'onPressKey',
    value: function onPressKey(event) {
      if (event.keyCode === B_KEY) {
        var blocked = this.state.blockNavigationOut;


        console.warn('blockNavigationOut: ' + !blocked + '. Press B to ' + (blocked ? 'block' : 'unblock '));
        this.setState(function (prevState) {
          return { blockNavigationOut: !prevState.blockNavigationOut };
        });
      }
    }
  }, {
    key: 'onProgramPress',
    value: function onProgramPress(programProps) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          pressedKeys = _ref.pressedKeys;

      if (pressedKeys && pressedKeys[KEY_ENTER] > 1) {
        return;
      }
      this.setState({
        currentProgram: programProps
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var blockNavigationOut = this.state.blockNavigationOut;

      // console.log('content rendered: ', this.props.realFocusKey);

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.content },
        _react2.default.createElement(Active, { program: this.state.currentProgram }),
        _react2.default.createElement(CategoriesFocusable, {
          focusKey: 'CATEGORIES',
          onProgramPress: this.onProgramPress,
          blockNavigationOut: blockNavigationOut
        })
      );
    }
  }]);

  return Content;
}(_react2.default.PureComponent);

Content.propTypes = {
  // realFocusKey: PropTypes.string.isRequired
};

var ContentFocusable = (0, _withFocusable2.default)()(Content);

var Active = function (_React$PureComponent4) {
  _inherits(Active, _React$PureComponent4);

  function Active() {
    _classCallCheck(this, Active);

    return _possibleConstructorReturn(this, (Active.__proto__ || Object.getPrototypeOf(Active)).apply(this, arguments));
  }

  _createClass(Active, [{
    key: 'render',
    value: function render() {
      var program = this.props.program;


      var style = {
        backgroundColor: program ? program.color : 'grey'
      };

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.activeWrapper },
        _react2.default.createElement(_reactNative.View, { style: [style, styles.activeProgram] }),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.activeProgramTitle },
          program ? program.title : 'No Program'
        )
      );
    }
  }]);

  return Active;
}(_react2.default.PureComponent);

Active.propTypes = {
  program: _propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    color: _propTypes2.default.string.isRequired
  })
};

Active.defaultProps = {
  program: null
};

var Program = function (_React$PureComponent5) {
  _inherits(Program, _React$PureComponent5);

  function Program() {
    _classCallCheck(this, Program);

    return _possibleConstructorReturn(this, (Program.__proto__ || Object.getPrototypeOf(Program)).apply(this, arguments));
  }

  _createClass(Program, [{
    key: 'render',
    value: function render() {
      // console.log('Program rendered: ', this.props.realFocusKey);

      var _props = this.props,
          color = _props.color,
          onPress = _props.onPress,
          focused = _props.focused,
          title = _props.title;


      var style = {
        backgroundColor: color
      };

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        {
          onPress: onPress,
          style: styles.programWrapper
        },
        _react2.default.createElement(_reactNative.View, { style: [style, styles.program, focused ? styles.focusedBorder : null] }),
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.programTitle },
          title
        )
      );
    }
  }]);

  return Program;
}(_react2.default.PureComponent);

Program.propTypes = {
  title: _propTypes2.default.string.isRequired,
  color: _propTypes2.default.string.isRequired,
  onPress: _propTypes2.default.func.isRequired,
  focused: _propTypes2.default.bool.isRequired

  // realFocusKey: PropTypes.string.isRequired
};

var ProgramFocusable = (0, _withFocusable2.default)()(Program);

var Category = function (_React$PureComponent6) {
  _inherits(Category, _React$PureComponent6);

  function Category(props) {
    _classCallCheck(this, Category);

    var _this6 = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this, props));

    _this6.scrollRef = null;

    _this6.onProgramFocused = _this6.onProgramFocused.bind(_this6);
    _this6.onProgramArrowPress = _this6.onProgramArrowPress.bind(_this6);
    return _this6;
  }

  _createClass(Category, [{
    key: 'onProgramFocused',
    value: function onProgramFocused(_ref2) {
      var x = _ref2.x;

      this.scrollRef.scrollTo({
        x: x
      });
    }
  }, {
    key: 'onProgramArrowPress',
    value: function onProgramArrowPress(direction, _ref3) {
      var categoryIndex = _ref3.categoryIndex,
          programIndex = _ref3.programIndex;

      if (direction === 'right' && programIndex === programs.length - 1 && categoryIndex < categories.length - 1) {
        this.props.setFocus('CATEGORY-' + (categoryIndex + 1));

        return false;
      }

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      // console.log('Category rendered: ', this.props.realFocusKey);

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.categoryWrapper },
        _react2.default.createElement(
          _reactNative.Text,
          { style: styles.categoryTitle },
          this.props.title
        ),
        _react2.default.createElement(
          _reactNative.ScrollView,
          {
            horizontal: true,
            ref: function ref(reference) {
              if (reference) {
                _this7.scrollRef = reference;
              }
            }
          },
          programs.map(function (program, index) {
            return _react2.default.createElement(ProgramFocusable, _extends({}, program, {
              focusKey: 'PROGRAM-' + _this7.props.realFocusKey + '-' + index,
              onPress: function onPress() {
                return _this7.props.onProgramPress(program);
              },
              onEnterPress: _this7.props.onProgramPress,
              key: program.title,
              onBecameFocused: _this7.onProgramFocused,
              onArrowPress: _this7.onProgramArrowPress,
              programIndex: index,
              categoryIndex: _this7.props.categoryIndex
            }));
          })
        )
      );
    }
  }]);

  return Category;
}(_react2.default.PureComponent);

Category.propTypes = {
  title: _propTypes2.default.string.isRequired,
  onProgramPress: _propTypes2.default.func.isRequired,
  realFocusKey: _propTypes2.default.string.isRequired,
  categoryIndex: _propTypes2.default.number.isRequired,
  setFocus: _propTypes2.default.func.isRequired
};

var CategoryFocusable = (0, _withFocusable2.default)()(Category);

var Categories = function (_React$PureComponent7) {
  _inherits(Categories, _React$PureComponent7);

  function Categories(props) {
    _classCallCheck(this, Categories);

    var _this8 = _possibleConstructorReturn(this, (Categories.__proto__ || Object.getPrototypeOf(Categories)).call(this, props));

    _this8.scrollRef = null;

    _this8.onCategoryFocused = _this8.onCategoryFocused.bind(_this8);
    return _this8;
  }

  _createClass(Categories, [{
    key: 'onCategoryFocused',
    value: function onCategoryFocused(_ref4) {
      var y = _ref4.y;

      this.scrollRef.scrollTo({
        y: y
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      // console.log('Categories rendered: ', this.props.realFocusKey);

      return _react2.default.createElement(
        _reactNative.ScrollView,
        {
          ref: function ref(reference) {
            if (reference) {
              _this9.scrollRef = reference;
            }
          },
          style: styles.categoriesWrapper
        },
        categories.map(function (category, index) {
          return _react2.default.createElement(CategoryFocusable, _extends({
            focusKey: 'CATEGORY-' + index
          }, category, {
            onProgramPress: _this9.props.onProgramPress,
            key: category.title,
            onBecameFocused: _this9.onCategoryFocused,
            categoryIndex: index

            // preferredChildFocusKey={`PROGRAM-CATEGORY-${index}-${programs.length - 1}`}
          }));
        })
      );
    }
  }]);

  return Categories;
}(_react2.default.PureComponent);

Categories.propTypes = {
  onProgramPress: _propTypes2.default.func.isRequired,
  realFocusKey: _propTypes2.default.string.isRequired
};

var CategoriesFocusable = (0, _withFocusable2.default)()(Categories);

var Spatial = function (_React$PureComponent8) {
  _inherits(Spatial, _React$PureComponent8);

  function Spatial(props) {
    _classCallCheck(this, Spatial);

    var _this10 = _possibleConstructorReturn(this, (Spatial.__proto__ || Object.getPrototypeOf(Spatial)).call(this, props));

    _this10.onWheel = _this10.onWheel.bind(_this10);
    _this10.throttledWheelHandler = (0, _throttle2.default)(_this10.throttledWheelHandler.bind(_this10), 500, { trailing: false });
    return _this10;
  }

  _createClass(Spatial, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('wheel', this.onWheel, { passive: false });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('wheel', this.onWheel);
    }
  }, {
    key: 'onWheel',
    value: function onWheel(event) {
      event.preventDefault();
      this.throttledWheelHandler(event);
    }
  }, {
    key: 'throttledWheelHandler',
    value: function throttledWheelHandler(event) {
      event.preventDefault();
      var deltaY = event.deltaY,
          deltaX = event.deltaX;
      var navigateByDirection = this.props.navigateByDirection;


      if (deltaY > 1) {
        navigateByDirection('down');
      } else if (deltaY < 0) {
        navigateByDirection('up');
      } else if (deltaX > 1) {
        navigateByDirection('right');
      } else if (deltaX < 1) {
        navigateByDirection('left');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.wrapper },
        _react2.default.createElement(MenuFocusable, {
          focusKey: 'MENU'
        }),
        _react2.default.createElement(ContentFocusable, {
          focusKey: 'CONTENT'
        })
      );
    }
  }]);

  return Spatial;
}(_react2.default.PureComponent);

Spatial.propTypes = {
  navigateByDirection: _propTypes2.default.func.isRequired
};

var SpatialFocusable = (0, _withFocusable2.default)()(Spatial);

var App = function App() {
  return _react2.default.createElement(
    _reactNative.View,
    null,
    _react2.default.createElement(SpatialFocusable, { focusable: false })
  );
};

exports.default = App;