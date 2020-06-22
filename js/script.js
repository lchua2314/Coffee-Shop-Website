// Login Interaction
const sendBtn = document.querySelector("#login-btn");
const usernameIn = document.querySelector("#userid");
const usernameOut = document.querySelector("#username-display");
const usernameOut2 = document.querySelector(".sign-in");
const passwordIn = document.querySelector("#pswrd");
const formJS = document.querySelector("form");
// let usernameGlobal = true;

// if (usernameGlobal) {
//   usernameOut2.innerHTML = '<i class="fas fa-user"></i> ' + usernameIn.value;
// }

if (sendBtn) {
  sendBtn.addEventListener("click", updateUsername);
  formJS.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function updateUsername() {
  let username =
      'Currently logged in as: <br> <i class="fas fa-user"></i> ' +
      usernameIn.value,
    password = passwordIn.value;
  if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
    // usernameGlobal = false;
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
    // usernameGlobal = false;
  } else {
    usernameOut.innerHTML = username;
    usernameOut2.innerHTML = '<i class="fas fa-user"></i> ' + usernameIn.value;
    // usernameGlobal = true;
    usernameIn.value = "";
    passwordIn.value = "";
  }
}
