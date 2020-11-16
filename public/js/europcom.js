(function () {
  'use strict';

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

  var detailedButton = document.querySelector("#detailedAgenda");
  var summaryButton = document.querySelector("#summarydAgenda");

  var activeButtons = function activeButtons() {
    return document.querySelectorAll(".ec-europcom-program .ec-europcom-program__change-detail-btn.active");
  };

  var getExpandedElements = function getExpandedElements() {
    return document.querySelectorAll("details");
  };

  var toggleClass = function toggleClass(el) {
    _toConsumableArray(activeButtons()).map(function (element) {
      return element.classList.remove("active");
    });

    el.classList.add("active");
  };

  var changeVisibility = function changeVisibility(_boolean) {
    _toConsumableArray(getExpandedElements()).map(function (element) {
      element.open = _boolean;
    });
  };

  var onClick = function onClick(el, text) {
    toggleClass(el);
    text === "detailedView" ? changeVisibility(true) : changeVisibility(false);
  };

  detailedButton.addEventListener("click", function () {
    return onClick(event.target, "detailedView");
  });
  summaryButton.addEventListener("click", function () {
    return onClick(event.target, "summaryView");
  });

}());
