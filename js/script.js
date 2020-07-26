"use strict";
// Login Interaction
const loginBtn = document.querySelector("#login-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const usernameIn = document.querySelector("#userid");
const emailIn = document.querySelector("#emailid");
const usernameOut = document.querySelector("#username-display");
const usernameOutNavBar = document.querySelector(".sign-in");
const signUpNavBar = document.querySelector(".sign-up");
const slashNavBar = document.querySelector("#slash");
const passwordIn = document.querySelector("#pswrd");
const loginForm = document.querySelector("#login-form");

function checkUsername() {
  let password = passwordIn.value;
  if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
  } else {
    Storage.setUsername(usernameIn.value);
    location.reload();
  }
}

function createNewUsername() {
  let password = passwordIn.value,
    email = emailIn.value;
  if (!validateEmail(email)) {
    usernameOut.innerHTML = "Please enter a valid email address.";
  } else if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
  } else {
    Storage.setUsername(usernameIn.value);
    location.reload();
  }
}

function validateEmail(inputEmail) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(inputEmail).toLowerCase());
}

class Storage {
  static setUsername(inputUsername) {
    localStorage.setItem("username", inputUsername);
  }
  static getUsername() {
    return localStorage.getItem("username");
  }
  static setPassword(inputPassword) {
    localStorage.setItem("password", inputPassword);
  }
  static getPassword() {
    return localStorage.getItem("password");
  }
  static setAmount(itemName, itemAmount) {
    localStorage.setItem(itemName, itemAmount.toString());
  }
  static removeAmount(itemName) {
    localStorage.removeItem(itemName);
  }
}

let currUser = Storage.getUsername();
if (currUser) {
  usernameOutNavBar.innerHTML = '<i class="fas fa-user"></i> ' + currUser;
  signUpNavBar.innerHTML = "";
  slashNavBar.innerHTML = "";
  if (loginForm) {
    loginForm.innerHTML = "";
    usernameOut.innerHTML =
      'Currently logged in as: <br> <i class="fas fa-user"></i> ' + currUser;
  }
}

if (loginBtn) {
  if (!currUser) {
    loginBtn.addEventListener("click", checkUsername);
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else {
    loginBtn.innerHTML = "Sign Out";
    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      location.reload();
    });
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

if (signUpBtn) {
  if (!currUser) {
    signUpBtn.addEventListener("click", createNewUsername);
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else {
    signUpBtn.innerHTML = "Sign Out";
    signUpBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      location.reload();
    });
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

// Navbar Mobile
const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    menuNav.classList.add("open");
    html.classList.add("no-scroll");
    navItems.forEach((item) => item.classList.add("open"));

    showMenu = true;
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    html.classList.remove("no-scroll");
    navItems.forEach((item) => item.classList.remove("open"));

    showMenu = false;
  }
}

// Shopping Cart Open and Close Function
const html = document.querySelector("html");
const cart = document.querySelector(".cart");
const cartOpenBtn = document.querySelector(".cart__openBtn");
const cartCloseBtn = document.querySelector(".cart__closeBtn");
const cartOverlay = document.querySelector(".cart-overlay");

cartOpenBtn.addEventListener("click", function () {
  cart.classList.add("showcart");
  cartOverlay.classList.add("transparentBcg");
  html.classList.add("no-scroll");
});

cartCloseBtn.addEventListener("click", function () {
  cart.classList.remove("showcart");
  cartOverlay.classList.remove("transparentBcg");
  html.classList.remove("no-scroll");
});

// Shopping Cart Adding Items to Cart
const total = document.querySelector(".total");
let item1Amount, up1, down1, remove1, totalAmount;

// Establish totalAmount in local storage if not there already.
if (!localStorage.getItem("total")) {
  localStorage.setItem("total", "0");
  console.log("FRESH TOTAL!");
} else {
  totalAmount = parseFloat(localStorage.getItem("total"));
  console.log(totalAmount);
  updateTotal(0);
}

/**
 * Updates total in the local storage and class "total" in the DOM
 * @param {Float} moneyChange
 */
function updateTotal(moneyChange) {
  totalAmount += moneyChange;
  localStorage.setItem("total", totalAmount.toString());
  if (totalAmount > 1) {
    total.innerHTML = `<span class="span-primary">Total Amount:</span> $${totalAmount.toFixed(
      2
    )}`;
  } else {
    total.innerHTML = `<br>
      <br>
      Your Shopping Cart is empty. <br>
        Add items to cart by hovering over / tapping on the images of products
    on the Menu page.`;
  }
}

// Item displays in the DOM
const item1Display = document.querySelector(".item1-display");
let item1Counter;

// Tests whether or not person is on the Menu page
if (document.querySelector(".one__cart__button")) {
  // Item 1: Caffe Americano
  const item1Button = document.querySelector(".one__cart__button");
  if (localStorage.getItem("item1")) {
    item1Counter = parseInt(localStorage.getItem("item1"));
  } else {
    item1Counter = 0;
  }

  item1Button.addEventListener("click", function () {
    if (!localStorage.getItem("item1")) {
      initializeItem1();
    }
    item1Counter++;
    console.log("item1Counter BUTTON: " + item1Counter);
    item1Amount.innerHTML = item1Counter;
    updateTotal(2.1);
    Storage.setAmount("item1", item1Counter);
  });

  // Item 2: Caffe Misto
  const item2Display = document.querySelector(".item2-display");
  const item2Button = document.querySelector(".two__cart__button");
  let item2Amount, up2, down2, remove2;

  let item2Counter = 0; // Save this in local storage

  item2Button.addEventListener("click", function () {
    if (item2Counter === 0) {
      item2Display.innerHTML += `<div class="two2-cart-item">
  <img src="../img/caffe-misto.webp" alt="product" />
    <div>
      <h3><span class="span-primary">Caffè</span> Misto</h3>
      <h4>$2.60</h4>
      <span class="remove-item-2">Remove</span>
    </div>
    <div>
      <div class="item2Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount2">1</p>
      <div class="item2Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
      item2Amount = document.querySelector(".item-amount2");
      up2 = document.querySelector(".item2Up");
      down2 = document.querySelector(".item2Down");
      remove2 = document.querySelector(".remove-item-2");

      up2.addEventListener("click", function () {
        item2Amount.innerHTML++;
        item2Counter++;
        updateTotal(2.6);
        Storage.setAmount("item2", item2Counter);
      });

      down2.addEventListener("click", function () {
        item2Amount.innerHTML--;
        item2Counter--;
        updateTotal(-2.6);
        Storage.setAmount("item2", item2Counter);

        if (item2Counter === 0) {
          item2Display.innerHTML -= `<div class="two2-cart-item">
  <img src="../img/caffe-americano.webp" alt="product" />
    <div>
      <h3><span class="span-primary">Caffè</span> Americano</h3>
      <h4>$2.10</h4>
      <span class="remove-item-2">Remove</span>
    </div>
    <div>
      <div class="item2Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount2">${item2Counter}</p>
      <div class="item2Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
          checkCartEmpty2();
          Storage.removeAmount("item2");
        }
      });

      remove2.addEventListener("click", function () {
        item2Display.innerHTML -= `<div class="one1-cart-item">
  <img src="../img/caffe-americano.webp" alt="product" />
    <div>
      <h3><span class="span-primary">Caffè</span> Americano</h3>
      <h4>$2.10</h4>
      <span class="remove-item-2">Remove</span>
    </div>
    <div>
      <div class="item2Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount2">${item2Counter}</p>
      <div class="item2Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
        updateTotal(-2.6 * item2Counter);
        Storage.removeAmount("item2");
        item2Counter = 0;
        item2Amount.innerHTML = 0;
        checkCartEmpty2();
      });
    } else {
      item2Amount.innerHTML++;
      Storage.setAmount("item2", item2Counter);
    }
    item2Counter++;
    updateTotal(2.6);
    Storage.setAmount("item2", item2Counter);
  });

  function checkCartEmpty2() {
    if (item2Counter === 0) {
      item2Display.innerHTML = "";
      return true;
    }
    return false;
  }
}

// Check if there are items in the local storage
if (checkStorageForCart()) {
  if (localStorage.getItem("item1")) {
    // Item 1: Caffe Americano
    item1Counter = parseInt(localStorage.getItem("item1"));
    initializeItem1();
  }
}

/**
 * Checks if there is at least one item in the local storage
 */
function checkStorageForCart() {
  if (
    localStorage.getItem("item1") ||
    localStorage.getItem("item2") ||
    localStorage.getItem("item3") ||
    localStorage.getItem("item4") ||
    localStorage.getItem("item5") ||
    localStorage.getItem("item6") ||
    localStorage.getItem("item7") ||
    localStorage.getItem("item8") ||
    localStorage.getItem("item9") ||
    localStorage.getItem("item10") ||
    localStorage.getItem("item11") ||
    localStorage.getItem("item12")
  ) {
    return true;
  }
  return false;
}

/**
 * Initializes item1 if it is already in the cart or needs to be added to the cart.
 */
function initializeItem1() {
  item1Display.innerHTML += `<div class="one1-cart-item">
  <img src="../img/caffe-americano.webp" alt="product" />
    <div>
      <h3><span class="span-primary">Caffè</span> Americano</h3>
      <h4>$2.10</h4>
      <span class="remove-item-1">Remove</span>
    </div>
    <div>
      <div class="item1Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount1">${item1Counter}</p>
      <div class="item1Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item1Amount = document.querySelector(".item-amount1");
  up1 = document.querySelector(".item1Up");
  down1 = document.querySelector(".item1Down");
  remove1 = document.querySelector(".remove-item-1");

  up1.addEventListener("click", function () {
    item1Counter++;
    item1Amount.innerHTML = item1Counter;
    updateTotal(2.1);
    Storage.setAmount("item1", item1Counter);
  });

  down1.addEventListener("click", function () {
    item1Counter--;
    item1Amount.innerHTML = item1Counter;
    updateTotal(-2.1);
    Storage.setAmount("item1", item1Counter);

    if (item1Counter === 0) {
      item1Display.innerHTML = "";
      Storage.removeAmount("item1");
    }
  });

  remove1.addEventListener("click", function () {
    item1Display.innerHTML = "";
    updateTotal(-2.1 * item1Counter);
    item1Counter = 0;
    Storage.removeAmount("item1");
  });
}
