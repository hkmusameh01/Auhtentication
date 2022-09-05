const signUpBtn = document.getElementById("sign-up-btn");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const validateForm = (username, email, password, confirmPassword) => {
  if (
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === ""
  ) {
    alert("Spaces are not allowed");
    return false;
  } else if (password !== confirmPassword) {
    
    confirmPasswordInput.style.border = "red solid 1px";
    // alert("Passwords are not correspond");
    return false;
  } else {
    return true;
  }
};

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const email = emailInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const isValidate = validateForm(username, email, password, confirmPassword);

  if (!isValidate) return;

  const options = {};

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  })
    .then((data) => {
      console.log(data.status);
      if(data.status >= 200 && data.status < 300) {
        window.location = '/welcome'
      } else {
        return data.json()
      }
    })
    .then((data) => alert(data.msg))
    .catch((err) => {
      console.log("err" + err);
    });
});
