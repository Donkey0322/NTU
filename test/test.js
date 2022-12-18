const ITEMS_LIST = [
  "Loosen up your neck.",
  "Unclench your jaw.",
  "Let go of that tense on your shoulders.",
  "Open up your mouth and stretch your jaw.",
  "Huge, deep breaths.",
  "Look up.",
  "Pull & align you head back.",
  "Face stretch: Open your mouth wide - say “O,” followed by “E.”",
  "For 10 seconds, just close your eyes.",
  "Lift your shoulders & tighten it up for 2 seconds. Let go.",
  "Inhale for 4s, hold for 8s, exhale for 7s",
];
const RO_UL = ".roulette ul";
const NUM_OF_ITEMS = ITEMS_LIST.length;
const HEIGHT_ITEMS_LIST = document.querySelector(RO_UL).height;

// JQuery
jQuery(document).ready(function ($) {
  $(".spin-btn").click(function () {
    $(RO_UL).removeClass();
    renderList();

    setTimeout(function () {
      $(RO_UL).addClass("roll");
    }, 200);

    setTimeout(function () {
      $(RO_UL).removeClass("roll");
      $(RO_UL).empty();
    }, 2000);

    setTimeout(function () {
      renderElement("li", getRandomItem(), RO_UL);
      $(RO_UL).addClass("fadesIn");
    }, 3000);
  });
});

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderElement(el, item, selector) {
  let listElement = document.createElement(el);
  let innerText = document.createTextNode(item);
  listElement.appendChild(innerText);
  document.querySelector(selector).appendChild(listElement);
}

function renderList() {
  for (i = 0; i < NUM_OF_ITEMS; i++) {
    renderElement("li", ITEMS_LIST[i], RO_UL);
  }
}

function getRandomItem() {
  return ITEMS_LIST[randNum(1, NUM_OF_ITEMS)];
}

window.addEventListener("load", renderList);
// To read about: https://stackoverflow.com/a/36096571
