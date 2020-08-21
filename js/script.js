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
    if (usernameIn.value == "E-commerce") {
      window.open("https://lchua2314.github.io/E-commerce-Website/index.html");
      alert("Thanks for looking at the code! :)");
    }
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
let totalAmount;

// Establish totalAmount in local storage if not there already.
if (!localStorage.getItem("total")) {
  localStorage.setItem("total", "0");
} else {
  totalAmount = parseFloat(localStorage.getItem("total"));
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

/* Item displays in the DOM */

// Item Display: Item 1: Caffe Americano
const item1Display = document.querySelector(".item1-display");
let item1Counter, item1Amount, up1, down1, remove1;
if (localStorage.getItem("item1")) {
  item1Counter = parseInt(localStorage.getItem("item1"));
} else {
  item1Counter = 0;
}

// Item Display: Item 2: Caffe Misto
const item2Display = document.querySelector(".item2-display");
let item2Counter, item2Amount, up2, down2, remove2;
if (localStorage.getItem("item2")) {
  item2Counter = parseInt(localStorage.getItem("item2"));
} else {
  item2Counter = 0;
}

// Item Display: Item 3: Blonde Caffe Americano
const item3Display = document.querySelector(".item3-display");
let item3Counter, item3Amount, up3, down3, remove3;
if (localStorage.getItem("item3")) {
  item3Counter = parseInt(localStorage.getItem("item3"));
} else {
  item3Counter = 0;
}

// Item Display: Item 4: Blonde Roast
const item4Display = document.querySelector(".item4-display");
let item4Counter, item4Amount, up4, down4, remove4;
if (localStorage.getItem("item4")) {
  item4Counter = parseInt(localStorage.getItem("item4"));
} else {
  item4Counter = 0;
}

// Item Display: Item 5: Dark Roast Coffee
const item5Display = document.querySelector(".item5-display");
let item5Counter, item5Amount, up5, down5, remove5;
if (localStorage.getItem("item5")) {
  item5Counter = parseInt(localStorage.getItem("item5"));
} else {
  item5Counter = 0;
}

// Item Display: Item 6: Pike Place® Roast
const item6Display = document.querySelector(".item6-display");
let item6Counter, item6Amount, up6, down6, remove6;
if (localStorage.getItem("item6")) {
  item6Counter = parseInt(localStorage.getItem("item6"));
} else {
  item6Counter = 0;
}

// Item Display: Item 7: Decaf Pike Place® Roast
const item7Display = document.querySelector(".item7-display");
let item7Counter, item7Amount, up7, down7, remove7;
if (localStorage.getItem("item7")) {
  item7Counter = parseInt(localStorage.getItem("item7"));
} else {
  item7Counter = 0;
}

// Item Display: Item 8: Cappuccino
const item8Display = document.querySelector(".item8-display");
let item8Counter, item8Amount, up8, down8, remove8;
if (localStorage.getItem("item8")) {
  item8Counter = parseInt(localStorage.getItem("item8"));
} else {
  item8Counter = 0;
}

// Item Display: Item 9: Blonde Cappuccino
const item9Display = document.querySelector(".item9-display");
let item9Counter, item9Amount, up9, down9, remove9;
if (localStorage.getItem("item9")) {
  item9Counter = parseInt(localStorage.getItem("item9"));
} else {
  item9Counter = 0;
}

// Item Display: Item 10: Espresso
const item10Display = document.querySelector(".item10-display");
let item10Counter, item10Amount, up10, down10, remove10;
if (localStorage.getItem("item10")) {
  item10Counter = parseInt(localStorage.getItem("item10"));
} else {
  item10Counter = 0;
}

// Item Display: Item 11: Espresso Macchiato
const item11Display = document.querySelector(".item11-display");
let item11Counter, item11Amount, up11, down11, remove11;
if (localStorage.getItem("item11")) {
  item11Counter = parseInt(localStorage.getItem("item11"));
} else {
  item11Counter = 0;
}

// Item Display: Item 12: Flat White
const item12Display = document.querySelector(".item12-display");
let item12Counter, item12Amount, up12, down12, remove12;
if (localStorage.getItem("item12")) {
  item12Counter = parseInt(localStorage.getItem("item12"));
} else {
  item12Counter = 0;
}

// Tests whether or not person is on the Menu page
if (document.querySelector(".one__cart__button")) {
  // Item 1: Caffe Americano
  const item1Button = document.querySelector(".one__cart__button");

  item1Button.addEventListener("click", function () {
    if (!localStorage.getItem("item1")) {
      initializeItem1();
    }
    item1Counter++;
    item1Amount.innerHTML = item1Counter;
    updateTotal(2.1);
    Storage.setAmount("item1", item1Counter);
  });

  // Item 2: Caffe Misto
  const item2Button = document.querySelector(".two__cart__button");

  item2Button.addEventListener("click", function () {
    if (!localStorage.getItem("item2")) {
      initializeItem2();
    }
    item2Counter++;
    item2Amount.innerHTML = item2Counter;
    updateTotal(2.6);
    Storage.setAmount("item2", item2Counter);
  });

  // Item 3: Blonde Caffe Americano
  const item3Button = document.querySelector(".three__cart__button");

  item3Button.addEventListener("click", function () {
    if (!localStorage.getItem("item3")) {
      initializeItem3();
    }
    item3Counter++;
    item3Amount.innerHTML = item3Counter;
    updateTotal(2.79);
    Storage.setAmount("item3", item3Counter);
  });

  // Item 4: Blonde Roast
  const item4Button = document.querySelector(".four__cart__button");

  item4Button.addEventListener("click", function () {
    if (!localStorage.getItem("item4")) {
      initializeItem4();
    }
    item4Counter++;
    item4Amount.innerHTML = item4Counter;
    updateTotal(2.05);
    Storage.setAmount("item4", item4Counter);
  });

  // Item 5: Dark Roast Coffee
  const item5Button = document.querySelector(".five__cart__button");

  item5Button.addEventListener("click", function () {
    if (!localStorage.getItem("item5")) {
      initializeItem5();
    }
    item5Counter++;
    item5Amount.innerHTML = item5Counter;
    updateTotal(2.2);
    Storage.setAmount("item5", item5Counter);
  });

  // Item 6: Pike Place® Roast
  const item6Button = document.querySelector(".six__cart__button");

  item6Button.addEventListener("click", function () {
    if (!localStorage.getItem("item6")) {
      initializeItem6();
    }
    item6Counter++;
    item6Amount.innerHTML = item6Counter;
    updateTotal(2.8);
    Storage.setAmount("item6", item6Counter);
  });

  // Item 7: Decaf Pike Place® Roast
  const item7Button = document.querySelector(".seven__cart__button");

  item7Button.addEventListener("click", function () {
    if (!localStorage.getItem("item7")) {
      initializeItem7();
    }
    item7Counter++;
    item7Amount.innerHTML = item7Counter;
    updateTotal(2.25);
    Storage.setAmount("item7", item7Counter);
  });

  // Item 8: Cappuccino
  const item8Button = document.querySelector(".eight__cart__button");

  item8Button.addEventListener("click", function () {
    if (!localStorage.getItem("item8")) {
      initializeItem8();
    }
    item8Counter++;
    item8Amount.innerHTML = item8Counter;
    updateTotal(2.59);
    Storage.setAmount("item8", item8Counter);
  });

  // Item 9: Blonde Cappuccino
  const item9Button = document.querySelector(".nine__cart__button");

  item9Button.addEventListener("click", function () {
    if (!localStorage.getItem("item9")) {
      initializeItem9();
    }
    item9Counter++;
    item9Amount.innerHTML = item9Counter;
    updateTotal(2.34);
    Storage.setAmount("item9", item9Counter);
  });

  // Item 10: Espresso
  const item10Button = document.querySelector(".ten__cart__button");

  item10Button.addEventListener("click", function () {
    if (!localStorage.getItem("item10")) {
      initializeItem10();
    }
    item10Counter++;
    item10Amount.innerHTML = item10Counter;
    updateTotal(2.89);
    Storage.setAmount("item10", item10Counter);
  });

  // Item 11: Espresso Macchiato
  const item11Button = document.querySelector(".eleven__cart__button");

  item11Button.addEventListener("click", function () {
    if (!localStorage.getItem("item11")) {
      initializeItem11();
    }
    item11Counter++;
    item11Amount.innerHTML = item11Counter;
    updateTotal(2.18);
    Storage.setAmount("item11", item11Counter);
  });

  // Item 12: Flat White
  const item12Button = document.querySelector(".twelve__cart__button");

  item12Button.addEventListener("click", function () {
    if (!localStorage.getItem("item12")) {
      initializeItem12();
    }
    item12Counter++;
    item12Amount.innerHTML = item12Counter;
    updateTotal(2.75);
    Storage.setAmount("item12", item12Counter);
  });
}

// Check if there are items in the local storage
if (checkStorageForCart()) {
  if (localStorage.getItem("item1")) {
    // Item 1: Caffe Americano
    initializeItem1();
  }
  if (localStorage.getItem("item2")) {
    // Item 2: Caffe Misto
    initializeItem2();
  }
  if (localStorage.getItem("item3")) {
    // Item 3: Blonde Caffe Americano
    initializeItem3();
  }
  if (localStorage.getItem("item4")) {
    // Item 4: Blonde Roast
    initializeItem4();
  }
  if (localStorage.getItem("item5")) {
    // Item 5: Dark Roast Coffee
    initializeItem5();
  }
  if (localStorage.getItem("item6")) {
    // Item 6: Pike Place® Roast
    initializeItem6();
  }
  if (localStorage.getItem("item7")) {
    // Item 7: Decaf Pike Place® Roast
    initializeItem7();
  }
  if (localStorage.getItem("item8")) {
    // Item 8: Cappuccino
    initializeItem8();
  }
  if (localStorage.getItem("item9")) {
    // Item 9: Blonde Cappuccino
    initializeItem9();
  }
  if (localStorage.getItem("item10")) {
    // Item 10: Espresso
    initializeItem10();
  }
  if (localStorage.getItem("item11")) {
    // Item 11: Espresso Macchiato
    initializeItem11();
  }
  if (localStorage.getItem("item12")) {
    // Item 12: Flat White
    initializeItem12();
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
 * Caffe Americano
 */
function initializeItem1() {
  item1Display.innerHTML += `<div class="one1-cart-item">
  <img src="../img/caffe-americano.jpg" alt="product" />
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

/**
 * Initializes item2 if it is already in the cart or needs to be added to the cart.
 * Caffe Misto
 */
function initializeItem2() {
  item2Display.innerHTML += `<div class="two2-cart-item">
  <img src="../img/caffe-misto.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Caffè</span> Misto</h3>
      <h4>$2.60</h4>
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
  item2Amount = document.querySelector(".item-amount2");
  up2 = document.querySelector(".item2Up");
  down2 = document.querySelector(".item2Down");
  remove2 = document.querySelector(".remove-item-2");

  up2.addEventListener("click", function () {
    item2Counter++;
    item2Amount.innerHTML = item2Counter;
    updateTotal(2.6);
    Storage.setAmount("item2", item2Counter);
  });

  down2.addEventListener("click", function () {
    item2Counter--;
    item2Amount.innerHTML = item2Counter;
    updateTotal(-2.6);
    Storage.setAmount("item2", item2Counter);

    if (item2Counter === 0) {
      item2Display.innerHTML = "";
      Storage.removeAmount("item2");
    }
  });

  remove2.addEventListener("click", function () {
    item2Display.innerHTML = "";
    updateTotal(-2.6 * item2Counter);
    item2Counter = 0;
    Storage.removeAmount("item2");
  });
}

/**
 * Initializes item3 if it is already in the cart or needs to be added to the cart.
 * Blonde Caffe Americano
 */
function initializeItem3() {
  item3Display.innerHTML += `<div class="three3-cart-item">
  <img src="../img/caffe-americano.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Blonde Caffè</span> Americano</h3>
      <h4>$2.79</h4>
      <span class="remove-item-3">Remove</span>
    </div>
    <div>
      <div class="item3Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount3">${item3Counter}</p>
      <div class="item3Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item3Amount = document.querySelector(".item-amount3");
  up3 = document.querySelector(".item3Up");
  down3 = document.querySelector(".item3Down");
  remove3 = document.querySelector(".remove-item-3");

  up3.addEventListener("click", function () {
    item3Counter++;
    item3Amount.innerHTML = item3Counter;
    updateTotal(2.79);
    Storage.setAmount("item3", item3Counter);
  });

  down3.addEventListener("click", function () {
    item3Counter--;
    item3Amount.innerHTML = item3Counter;
    updateTotal(-2.79);
    Storage.setAmount("item3", item3Counter);

    if (item3Counter === 0) {
      item3Display.innerHTML = "";
      Storage.removeAmount("item3");
    }
  });

  remove3.addEventListener("click", function () {
    item3Display.innerHTML = "";
    updateTotal(-2.79 * item3Counter);
    item3Counter = 0;
    Storage.removeAmount("item3");
  });
}

/**
 * Initializes item4 if it is already in the cart or needs to be added to the cart.
 * Blonde Roast
 */
function initializeItem4() {
  item4Display.innerHTML += `<div class="four4-cart-item">
  <img src="../img/dark-roast-coffee.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Blonde</span> Roast</h3>
      <h4>$2.05</h4>
      <span class="remove-item-4">Remove</span>
    </div>
    <div>
      <div class="item4Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount4">${item4Counter}</p>
      <div class="item4Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item4Amount = document.querySelector(".item-amount4");
  up4 = document.querySelector(".item4Up");
  down4 = document.querySelector(".item4Down");
  remove4 = document.querySelector(".remove-item-4");

  up4.addEventListener("click", function () {
    item4Counter++;
    item4Amount.innerHTML = item4Counter;
    updateTotal(2.05);
    Storage.setAmount("item4", item4Counter);
  });

  down4.addEventListener("click", function () {
    item4Counter--;
    item4Amount.innerHTML = item4Counter;
    updateTotal(-2.05);
    Storage.setAmount("item4", item4Counter);

    if (item4Counter === 0) {
      item4Display.innerHTML = "";
      Storage.removeAmount("item4");
    }
  });

  remove4.addEventListener("click", function () {
    item4Display.innerHTML = "";
    updateTotal(-2.05 * item4Counter);
    item4Counter = 0;
    Storage.removeAmount("item4");
  });
}

/**
 * Initializes item5 if it is already in the cart or needs to be added to the cart.
 * Dark Roast Coffee
 */
function initializeItem5() {
  item5Display.innerHTML += `<div class="five5-cart-item">
  <img src="../img/dark-roast-coffee.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Dark Roast</span> Coffee</h3>
      <h4>$2.20</h4>
      <span class="remove-item-5">Remove</span>
    </div>
    <div>
      <div class="item5Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount5">${item5Counter}</p>
      <div class="item5Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item5Amount = document.querySelector(".item-amount5");
  up5 = document.querySelector(".item5Up");
  down5 = document.querySelector(".item5Down");
  remove5 = document.querySelector(".remove-item-5");

  up5.addEventListener("click", function () {
    item5Counter++;
    item5Amount.innerHTML = item5Counter;
    updateTotal(2.2);
    Storage.setAmount("item5", item5Counter);
  });

  down5.addEventListener("click", function () {
    item5Counter--;
    item5Amount.innerHTML = item5Counter;
    updateTotal(-2.2);
    Storage.setAmount("item5", item5Counter);

    if (item5Counter === 0) {
      item5Display.innerHTML = "";
      Storage.removeAmount("item5");
    }
  });

  remove5.addEventListener("click", function () {
    item5Display.innerHTML = "";
    updateTotal(-2.2 * item5Counter);
    item5Counter = 0;
    Storage.removeAmount("item5");
  });
}

/**
 * Initializes item6 if it is already in the cart or needs to be added to the cart.
 * Pike Place® Roast
 */
function initializeItem6() {
  item6Display.innerHTML += `<div class="six6-cart-item">
  <img src="../img/dark-roast-coffee.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Pike Place®</span> Roast</h3>
      <h4>$2.80</h4>
      <span class="remove-item-6">Remove</span>
    </div>
    <div>
      <div class="item6Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount6">${item6Counter}</p>
      <div class="item6Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item6Amount = document.querySelector(".item-amount6");
  up6 = document.querySelector(".item6Up");
  down6 = document.querySelector(".item6Down");
  remove6 = document.querySelector(".remove-item-6");

  up6.addEventListener("click", function () {
    item6Counter++;
    item6Amount.innerHTML = item6Counter;
    updateTotal(2.8);
    Storage.setAmount("item6", item6Counter);
  });

  down6.addEventListener("click", function () {
    item6Counter--;
    item6Amount.innerHTML = item6Counter;
    updateTotal(-2.8);
    Storage.setAmount("item6", item6Counter);

    if (item6Counter === 0) {
      item6Display.innerHTML = "";
      Storage.removeAmount("item6");
    }
  });

  remove6.addEventListener("click", function () {
    item6Display.innerHTML = "";
    updateTotal(-2.8 * item6Counter);
    item6Counter = 0;
    Storage.removeAmount("item6");
  });
}

/**
 * Initializes item7 if it is already in the cart or needs to be added to the cart.
 * Decaf Pike Place® Roast
 */
function initializeItem7() {
  item7Display.innerHTML += `<div class="seven7-cart-item">
  <img src="../img/dark-roast-coffee.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Decaf Pike </span>Place® Roast</h3>
      <h4>$2.25</h4>
      <span class="remove-item-7">Remove</span>
    </div>
    <div>
      <div class="item7Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount7">${item7Counter}</p>
      <div class="item7Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item7Amount = document.querySelector(".item-amount7");
  up7 = document.querySelector(".item7Up");
  down7 = document.querySelector(".item7Down");
  remove7 = document.querySelector(".remove-item-7");

  up7.addEventListener("click", function () {
    item7Counter++;
    item7Amount.innerHTML = item7Counter;
    updateTotal(2.25);
    Storage.setAmount("item7", item7Counter);
  });

  down7.addEventListener("click", function () {
    item7Counter--;
    item7Amount.innerHTML = item7Counter;
    updateTotal(-2.25);
    Storage.setAmount("item7", item7Counter);

    if (item7Counter === 0) {
      item7Display.innerHTML = "";
      Storage.removeAmount("item7");
    }
  });

  remove7.addEventListener("click", function () {
    item7Display.innerHTML = "";
    updateTotal(-2.25 * item7Counter);
    item7Counter = 0;
    Storage.removeAmount("item7");
  });
}

/**
 * Initializes item8 if it is already in the cart or needs to be added to the cart.
 * Cappuccino
 */
function initializeItem8() {
  item8Display.innerHTML += `<div class="eight8-cart-item">
  <img src="../img/cappuccino.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Cappu</span>ccino</h3>
      <h4>$2.59</h4>
      <span class="remove-item-8">Remove</span>
    </div>
    <div>
      <div class="item8Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount8">${item8Counter}</p>
      <div class="item8Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item8Amount = document.querySelector(".item-amount8");
  up8 = document.querySelector(".item8Up");
  down8 = document.querySelector(".item8Down");
  remove8 = document.querySelector(".remove-item-8");

  up8.addEventListener("click", function () {
    item8Counter++;
    item8Amount.innerHTML = item8Counter;
    updateTotal(2.59);
    Storage.setAmount("item8", item8Counter);
  });

  down8.addEventListener("click", function () {
    item8Counter--;
    item8Amount.innerHTML = item8Counter;
    updateTotal(-2.59);
    Storage.setAmount("item8", item8Counter);

    if (item8Counter === 0) {
      item8Display.innerHTML = "";
      Storage.removeAmount("item8");
    }
  });

  remove8.addEventListener("click", function () {
    item8Display.innerHTML = "";
    updateTotal(-2.59 * item8Counter);
    item8Counter = 0;
    Storage.removeAmount("item8");
  });
}

/**
 * Initializes item9 if it is already in the cart or needs to be added to the cart.
 * Blonde Cappuccino
 */
function initializeItem9() {
  item9Display.innerHTML += `<div class="nine9-cart-item">
  <img src="../img/cappuccino.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Blonde</span> Cappuccino</h3>
      <h4>$2.34</h4>
      <span class="remove-item-9">Remove</span>
    </div>
    <div>
      <div class="item9Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount9">${item9Counter}</p>
      <div class="item9Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item9Amount = document.querySelector(".item-amount9");
  up9 = document.querySelector(".item9Up");
  down9 = document.querySelector(".item9Down");
  remove9 = document.querySelector(".remove-item-9");

  up9.addEventListener("click", function () {
    item9Counter++;
    item9Amount.innerHTML = item9Counter;
    updateTotal(2.34);
    Storage.setAmount("item9", item9Counter);
  });

  down9.addEventListener("click", function () {
    item9Counter--;
    item9Amount.innerHTML = item9Counter;
    updateTotal(-2.34);
    Storage.setAmount("item9", item9Counter);

    if (item9Counter === 0) {
      item9Display.innerHTML = "";
      Storage.removeAmount("item9");
    }
  });

  remove9.addEventListener("click", function () {
    item9Display.innerHTML = "";
    updateTotal(-2.34 * item9Counter);
    item9Counter = 0;
    Storage.removeAmount("item9");
  });
}

/**
 * Initializes item10 if it is already in the cart or needs to be added to the cart.
 * Espresso
 */
function initializeItem10() {
  item10Display.innerHTML += `<div class="ten10-cart-item">
  <img src="../img/espresso.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Espr</span>esso</h3>
      <h4>$2.89</h4>
      <span class="remove-item-10">Remove</span>
    </div>
    <div>
      <div class="item10Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount10">${item10Counter}</p>
      <div class="item10Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item10Amount = document.querySelector(".item-amount10");
  up10 = document.querySelector(".item10Up");
  down10 = document.querySelector(".item10Down");
  remove10 = document.querySelector(".remove-item-10");

  up10.addEventListener("click", function () {
    item10Counter++;
    item10Amount.innerHTML = item10Counter;
    updateTotal(2.89);
    Storage.setAmount("item10", item10Counter);
  });

  down10.addEventListener("click", function () {
    item10Counter--;
    item10Amount.innerHTML = item10Counter;
    updateTotal(-2.89);
    Storage.setAmount("item10", item10Counter);

    if (item10Counter === 0) {
      item10Display.innerHTML = "";
      Storage.removeAmount("item10");
    }
  });

  remove10.addEventListener("click", function () {
    item10Display.innerHTML = "";
    updateTotal(-2.89 * item10Counter);
    item10Counter = 0;
    Storage.removeAmount("item10");
  });
}

/**
 * Initializes item11 if it is already in the cart or needs to be added to the cart.
 * Espresso Macchiato
 */
function initializeItem11() {
  item11Display.innerHTML += `<div class="eleven11-cart-item">
  <img src="../img/espresso-macchiato.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Espresso</span> Macchiato</h3>
      <h4>$2.18</h4>
      <span class="remove-item-11">Remove</span>
    </div>
    <div>
      <div class="item11Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount11">${item11Counter}</p>
      <div class="item11Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item11Amount = document.querySelector(".item-amount11");
  up11 = document.querySelector(".item11Up");
  down11 = document.querySelector(".item11Down");
  remove11 = document.querySelector(".remove-item-11");

  up11.addEventListener("click", function () {
    item11Counter++;
    item11Amount.innerHTML = item11Counter;
    updateTotal(2.18);
    Storage.setAmount("item11", item11Counter);
  });

  down11.addEventListener("click", function () {
    item11Counter--;
    item11Amount.innerHTML = item11Counter;
    updateTotal(-2.18);
    Storage.setAmount("item11", item11Counter);

    if (item11Counter === 0) {
      item11Display.innerHTML = "";
      Storage.removeAmount("item11");
    }
  });

  remove11.addEventListener("click", function () {
    item11Display.innerHTML = "";
    updateTotal(-2.18 * item11Counter);
    item11Counter = 0;
    Storage.removeAmount("item11");
  });
}

/**
 * Initializes item12 if it is already in the cart or needs to be added to the cart.
 * Flat White
 */
function initializeItem12() {
  item12Display.innerHTML += `<div class="twelve12-cart-item">
  <img src="../img/flat-white.jpg" alt="product" />
    <div>
      <h3><span class="span-primary">Flat</span> White</h3>
      <h4>$2.75</h4>
      <span class="remove-item-12">Remove</span>
    </div>
    <div>
      <div class="item12Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount12">${item12Counter}</p>
      <div class="item12Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item12Amount = document.querySelector(".item-amount12");
  up12 = document.querySelector(".item12Up");
  down12 = document.querySelector(".item12Down");
  remove12 = document.querySelector(".remove-item-12");

  up12.addEventListener("click", function () {
    item12Counter++;
    item12Amount.innerHTML = item12Counter;
    updateTotal(2.75);
    Storage.setAmount("item12", item12Counter);
  });

  down12.addEventListener("click", function () {
    item12Counter--;
    item12Amount.innerHTML = item12Counter;
    updateTotal(-2.75);
    Storage.setAmount("item12", item12Counter);

    if (item12Counter === 0) {
      item12Display.innerHTML = "";
      Storage.removeAmount("item12");
    }
  });

  remove12.addEventListener("click", function () {
    item12Display.innerHTML = "";
    updateTotal(-2.75 * item12Counter);
    item12Counter = 0;
    Storage.removeAmount("item12");
  });
}
