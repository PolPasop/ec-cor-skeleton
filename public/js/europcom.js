(function () {
  'use strict';

  const detailedButton = document.querySelector("#detailedAgenda");
  const summaryButton = document.querySelector("#summarydAgenda");

  const getExpandedElements = () => document.querySelectorAll("details");

  const changeVisibility = boolean => {
    [...getExpandedElements()].map(element => element.open = boolean);
  };

  detailedButton.addEventListener("click", () => changeVisibility(true));
  summaryButton.addEventListener("click", () => changeVisibility(false));

}());
