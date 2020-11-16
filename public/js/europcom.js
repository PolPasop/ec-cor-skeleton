(function () {
  'use strict';

  const detailedButton = document.querySelector("#detailedAgenda");
  const summaryButton = document.querySelector("#summarydAgenda");

  const activeButtons = () => document.querySelectorAll(".ec-europcom-program .active");

  const getExpandedElements = () => document.querySelectorAll("details");

  const toggleClass = el => {
    [...activeButtons()].map(element => element.classList.remove("active"));
    el.classList.add("active");
  };

  const changeVisibility = boolean => {
    [...getExpandedElements()].map(element => element.open = boolean);
  };

  const onClick = (el, text) => {
    toggleClass(el);
    text === "detailedView" ? changeVisibility(true) : changeVisibility(false);
  };

  detailedButton.addEventListener("click", () => onClick(event.target, "detailedView"));
  summaryButton.addEventListener("click", () => onClick(event.target, "summaryView"));

}());
