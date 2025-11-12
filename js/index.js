var Name = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var logEmail = document.getElementById("logEmail");
var logPassword = document.getElementById("logPassword");
var logBtn = document.getElementById("logBtn");
var signBtn = document.getElementById("signBtn");
var message = document.getElementById("message");

var userList = [];

if (localStorage.getItem("userContainer") !== null) {
  userList = JSON.parse(localStorage.getItem("userContainer"));
}

function signUp() {
  if (!Name.value || !email.value || !password.value) {
    message.textContent = "All inputs are required";
    message.classList.remove("d-none");
    return;
  }

  if (
    nameValidation() &&
    emailValidation() &&
    passwordValidation() &&
    existEmail()
  ) {
    var user = {
      name: Name.value,
      email: email.value,
      password: password.value,
    };
    userList.push(user);
    localStorage.setItem("userContainer", JSON.stringify(userList));
    message.textContent = "Sign up successful!";
    message.classList.remove("text-danger");
    message.classList.add("text-success");
    message.classList.remove("d-none");

    document.querySelector("form").reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

function logIn() {
  if (!logEmail.value || !logPassword.value) {
    message.textContent = "All inputs is required";
    message.classList.remove("d-none");
    return;
  }

  for (var i = 0; i < userList.length; i++) {
    if (
      logEmail.value === userList[i].email &&
      logPassword.value === userList[i].password
    ) {
      localStorage.setItem("currentUser", userList[i].name);
      window.location.href = "home.html";
      return;
    }
  }
  message.textContent = "Incorrect email or password";
  message.classList.remove("d-none");
}

function nameValidation() {
  var regex = /^[a-z0-9._]+$/;
  var text = Name.value;
  if (regex.test(text)) {
    message.classList.add("d-none");
    return true;
  } else {
    message.textContent = "All inputs is required";
    message.classList.remove("d-none");
    return false;
  }
}

function emailValidation() {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var text = email.value;
  if (regex.test(text)) {
    message.classList.add("d-none");
    return true;
  } else {
    message.textContent = "Invalid email format";
    message.classList.remove("d-none");
    return false;
  }
}

function existEmail() {
  for (var i = 0; i < userList.length; i++) {
    if (userList[i].email === email.value) {
      message.textContent = "Email already exists";
      message.classList.remove("d-none");
      return false;
    }
  }
  return true;
}

function passwordValidation() {
  var regex = /^.{6,}$/;
  var text = password.value;
  if (regex.test(text)) {
    message.classList.add("d-none");
    return true;
  } else {
    message.textContent = "Password must be at least 6 characters";
    message.classList.remove("d-none");
    return false;
  }
}
if (window.location.pathname.includes("home.html")) {
  let userName = localStorage.getItem("currentUser") || "Guest";
  document.getElementById("userName").textContent = userName;
}
