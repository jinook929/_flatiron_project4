// navbar elements
const signupLink = document.querySelector("#signup")
const loginLink = document.querySelector("#login")
const logoutLink = document.querySelector("#logout")
// session modals elements
const labels = document.querySelectorAll('.form-input label')
const signupForm = document.querySelector("#signup-form")
const signupClose = document.querySelector("#signup-close")
const tologin = document.querySelector("#tologin")
const loginForm = document.querySelector("#login-form")
const loginClose = document.querySelector("#login-close")
const toSignup = document.querySelector("#toSignup")

// signup & login form labels effect
labels.forEach(label => {
  label.innerHTML = label.innerText
    .split('')
    .map((letter, i) => `<span style="transition-delay:${i * 50}ms">${letter}</span>`)
    .join('')
})

//// signup modal
// signup form appearing
signupLink.addEventListener("click", e => {
  signupForm.classList.toggle("off")
  if(!loginForm.classList.contains("off")) loginForm.classList.add("off")
})
// signup form close button
signupClose.addEventListener("click", e => {
  signupForm.classList.toggle("off")
})
// signup form to login form
toLogin.addEventListener("click", e => {
  signupForm.classList.toggle("off")
  loginForm.classList.toggle("off")
})
// signup submit
signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  sessionSubmit.apply(e.target, ["users", signupForm, "signed up"])
  Notice.getNotices()
})

//// login modal
// login form appearing
loginLink.addEventListener("click", e => {
  loginForm.classList.toggle("off")
  if(!signupForm.classList.contains("off")) signupForm.classList.add("off")
})
// login form close button
loginClose.addEventListener("click", e => {
  loginForm.classList.toggle("off")
})
// login form to signup form
toSignup.addEventListener("click", e => {
  loginForm.classList.toggle("off")
  signupForm.classList.toggle("off")
})
// login submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  sessionSubmit.apply(e.target, ["sessions", loginForm, "logged in"])
  Notice.getNotices();console.log("Hello")
})

//// loguot link
logoutLink.addEventListener("click", e => {
  axios.delete(`${url}/sessions`)
  .catch(err => console.log(err))
  .then((res) => {
    let user = new User(res.data);

    let message = user.message
    modalToggle(message, "USER")   

    sessionStorage.clear()
    newNotice.innerHTML = ""
    Notice.getNotices();console.log("Goodbye")
  })
})

//// session related functions
// toggle navbar items and control message display
function modalToggle(message, username = "USER") {
  displayMessage(message)
  
  profileLink.children[0].innerHTML = `Hi, ${username}!`
  signupLink.classList.toggle("off")
  loginLink.classList.toggle("off")
  profileLink.classList.toggle("off")
  logoutLink.classList.toggle("off")
}
// submit form info to backend and keep login status
function sessionSubmit(route, form, status) {
  axios.post(`${url}/${route}`, {
    user: {
      email: this[0].value,
      password: this[1].value
    }
  })
  .catch(err => console.log(err))
  .then((res) => {
    let user = new User(res.data)
    if(user.message) {
      form.classList.toggle("off")
      form.children[2][0].value = ""
      form.children[2][1].value = ""
      displayMessage(user.message)
    } else {
      let message = `Successfully ${status} as ${user.username}!`
      modalToggle(message, user.username)
      
      form.classList.toggle("off")
      form.children[2][0].value = ""
      form.children[2][1].value = ""
      
      // sessionStorage.setItem("user_id", user.id)
      sessionStorage.setItem("user_digest", user.password_digest)
      Notice.displayNewForm()
    }
  })
}
// 
function displayMessage(msg) {
  message.innerHTML = msg
  setTimeout(() => {
    message.innerHTML = ""
  }, 5000)
}

//// helper functions
// return current user's password_digest
function currentUser() {
  if(sessionStorage.getItem("user_digest")) {
    return sessionStorage.getItem("user_digest")
  } else {
    return false
  }
}
// return boolean value of login status
function isLoggedIn() {
  return !!currentUser()
}