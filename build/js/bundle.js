(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var factsheets = document.querySelectorAll('.ec-cor-mediafactsheet');

  var toggle = function toggle(element) {
    console.log("toggle");
    element.classList.toggle("open");
  };

  _toConsumableArray(factsheets).map(function (factsheet) {
    var button = factsheet.querySelector('.ec-cor-mediafactsheet__sliderbutton');
    button.addEventListener('click', function () {
      return toggle(factsheet);
    });
  });

  // https://inclusive-components.design/collapsible-sections/
  (function () {
    // Check for <template> support
    if ("content" in document.createElement("template")) {
      var tmpl = document.createElement("template"); // Create the web component's template
      // featuring a <slot> for the light DOM content

      tmpl.innerHTML = "\n      <h3>\n        <button aria-expanded=\"false\">\n          <svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 10 10\">\n            <rect class=\"vert\" height=\"8\" width=\"2\" y=\"1\" x=\"4\" />\n            <rect height=\"2\" width=\"8\" y=\"4\" x=\"1\" />\n          </svg>\n        </button>\n      </h3>\n      <div class=\"content\" hidden>\n        <slot></slot>\n      </div>\n      <style>\n        h3 {\n          margin: 0;\n        }\n\n        h3 button {\n          all: inherit;\n          box-sizing: border-box;\n          cursor: hover;\n          display: flex;\n          justify-content: space-between;\n          width: 100%;\n          padding: 0.5em 0;\n        }\n\n        h3 button:focus svg {\n          outline: 2px solid;\n        }\n\n        button svg {\n          height: 1em;\n          margin-left: 0.5em;\n        }\n\n        [aria-expanded=\"true\"] .vert {\n          display: none;\n        }\n\n        [aria-expanded] rect {\n          fill: currentColor;\n        }\n      </style>\n    "; // Check for latest Shadow DOM syntax suppport

      if (document.head.attachShadow) {
        var ToggleSection = /*#__PURE__*/function (_HTMLElement) {
          _inherits(ToggleSection, _HTMLElement);

          var _super = _createSuper(ToggleSection);

          function ToggleSection() {
            var _this;

            _classCallCheck(this, ToggleSection);

            _this = _super.call(this); // Make the host element a region

            _this.setAttribute("role", "region"); // Create a `shadowroot`and populate from template


            _this.attachShadow({
              mode: "open"
            });

            _this.shadowRoot.appendChild(tmpl.content.cloneNode(true)); // Assign the toggle button


            _this.btn = _this.shadowRoot.querySelector("h3 button"); // Get the first element in light DOM
            // and cast its heading level (which should, but may not, exist)

            var oldHeading = _this.querySelector(":first-child");

            var level = parseInt(oldHeading.tagName.substr(1)); // Get the Shadow DOM <h3>

            _this.heading = _this.shadowRoot.querySelector("h3"); // If there is no level, there is no heading.
            // Add a warning

            if (!level) {
              console.warn("The first element inside each <toggle-section> should be a heading of an appropriate level.");
            } // If the level is a real integer and not 2
            // set `aria-level`accordingly


            if (level && level !== 2) {
              _this.heading.setAttribute("aria-level", level);
            } // Add the light DOM heading label to the innerHTML of the toggle button
            // and remove the now unwanted Light DOM heading


            _this.btn.innerHTML = oldHeading.textContent + _this.btn.innerHTML;
            oldHeading.parentNode.removeChild(oldHeading); // The main state switching function

            _this.switchState = function () {
              var expanded = _this.getAttribute("open") === "true" || false; // Toggle `aria-expanded`

              _this.btn.setAttribute("aria-expanded", expanded); // Toggle the `.content` element's visibility


              _this.shadowRoot.querySelector(".content").hidden = !expanded;
            }; // Change the component's `open`attribute value on click
            // (which will, in turn, trigger switchState(), see below)


            _this.btn.onclick = function () {
              _this.setAttribute("open", _this.getAttribute("open") === "true" ? "false" : "true");
            };

            return _this;
          } // Identify just the `open` attribute as an observed attribute


          _createClass(ToggleSection, [{
            key: "attributeChangedCallback",
            // When `open` changes value, execute switchState()
            value: function attributeChangedCallback(name) {
              if (name === "open") {
                this.switchState();
              }
            }
          }], [{
            key: "observedAttributes",
            get: function get() {
              return ["open"];
            }
          }]);

          return ToggleSection;
        }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)); // Add our new custom element to the window for use


        window.customElements.define("toggle-section", ToggleSection); // Define the expand/collapse all template

        var buttons = document.createElement("div");
        buttons.innerHTML = "\n        <ul class=\"toggle-section-controls\" aria-label=\"section controls\">\n          <li><button id=\"expand\">expand all</button></li>\n          <li><button id=\"collapse\">collapse all</button></li>\n        </ul>\n      "; // Get the first `toggle-section` on the page
        // and all toggle sections as a node list

        var first = document.querySelector("toggle-section");
        var all = document.querySelectorAll("toggle-section"); // Insert the button controls before the first <toggle-section>

        first.parentNode.insertBefore(buttons, first); // Place the click on the parent <ul> ...

        buttons.addEventListener("click", function (e) {
          // ... then determine which button was the target
          var expand = e.target.id === "expand" ? true : false; // Iterate over the toggle sections to switch
          // each one's state uniformly

          Array.prototype.forEach.call(all, function (t) {
            t.setAttribute("open", expand);
          });
        });
      }
    }
  })();

}());
