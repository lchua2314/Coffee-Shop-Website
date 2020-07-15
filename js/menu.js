// View1
const view = document.querySelector(".one__view");
const viewOpenBtn = document.querySelector(".one__view__openBtn");
const viewCloseBtn = document.querySelector(".one__view__closeBtn");
const viewOverlay = document.querySelector(".one__view-overlay");

viewOpenBtn.addEventListener("click", function () {
  view.classList.add("one__showview");
  viewOverlay.classList.add("one__transparentBcg");
});
viewCloseBtn.addEventListener("click", function () {
  view.classList.remove("one__showview");
  viewOverlay.classList.remove("one__transparentBcg");
});

// View2
const view2 = document.querySelector(".two__view");
const viewOpenBtn2 = document.querySelector(".two__view__openBtn");
const viewCloseBtn2 = document.querySelector(".two__view__closeBtn");
const viewOverlay2 = document.querySelector(".two__view-overlay");

viewOpenBtn2.addEventListener("click", function () {
  view2.classList.add("two__showview");
  viewOverlay2.classList.add("two__transparentBcg");
});
viewCloseBtn2.addEventListener("click", function () {
  view2.classList.remove("two__showview");
  viewOverlay2.classList.remove("two__transparentBcg");
});
