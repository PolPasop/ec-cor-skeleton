(function () {
  'use strict';

  const factsheets = document.querySelectorAll('.ec-cor-mediafactsheet');

  const toggle = element => {
    console.log("toggle");
    element.classList.toggle("open");
  };

  [...factsheets].map(factsheet => {
    const button = factsheet.querySelector('.ec-cor-mediafactsheet__sliderbutton');
    button.addEventListener('click', () => toggle(factsheet));
  });

}());
