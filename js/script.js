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
const itemDisplay = document.querySelector(".item-display");
const item1 = document.querySelector(".first__cart__button");
let item1Amount, up1, down1, remove1;

let item1Counter = 0; // Save this in local storage

item1.addEventListener("click", function () {
  if (item1Counter === 0) {
    itemDisplay.innerHTML += `<div class="one1-cart-item">
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
      <p class="item-amount">1</p>
      <div class="item1Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
    item1Amount = document.querySelector(".item-amount");
    up1 = document.querySelector(".item1Up");
    down1 = document.querySelector(".item1Down");
    remove1 = document.querySelector(".remove-item-1");

    up1.addEventListener("click", function () {
      item1Amount.innerHTML++;
      item1Counter++;
    });

    down1.addEventListener("click", function () {
      item1Amount.innerHTML--;
      item1Counter--;

      if (item1Counter === 0) {
        itemDisplay.innerHTML -= `<div class="one1-cart-item">
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
      <p class="item-amount">${item1Counter}</p>
      <div class="item1Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
        checkCartEmpty();
      }
    });

    remove1.addEventListener("click", function () {
      itemDisplay.innerHTML -= `<div class="one1-cart-item">
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
      <p class="item-amount">${item1Counter}</p>
      <div class="item1Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
      item1Counter = 0;
      item1Amount.innerHTML = 0;
      checkCartEmpty();
    });
  } else {
    item1Amount.innerHTML++;
  }
  item1Counter++;
});

function checkCartEmpty() {
  // if (isNaN(itemDisplay.innerHTML)) {
  // This does not check if cart is empty.
  if (item1Counter === 0) {
    itemDisplay.innerHTML = "";
    return true;
  } else {
    return false;
  }
}
