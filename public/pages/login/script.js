const logInBtn = document.getElementById("log-in-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const validateForm = (username, email, password, confirmPassword) => {
  if (
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === ""
  ) {
    alert("Spaces are not allowed");
    return false;
  }
  if (password !== confirmPassword) {
    confirmPasswordInput.style.border = "red solid 1px";
    alert("Passwords are not correspond");
    return false;
  }

  return true;
};

logInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  fetch("/login", options)
    .then(data => {
      if(data.status >= 200 && data.status < 300) {
          window.location = '/welcome';
      } else {
        return data.json();
      }
    })
    .then(data => {
      alert(data.msg)
    })
    .catch((err) => console.log("err" + err));
});
