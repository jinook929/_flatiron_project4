const navbarBrand = document.querySelector(".navbar-brand")
const howtoBox = document.querySelector("#howto-box")
const welcome = document.querySelector("#welcome")
const message = document.querySelector("#message")
const newNotice = document.querySelector("#new-notice")

// welcome Easter Egg
welcome.addEventListener("click", e => {
  if(sessionStorage.getItem("user_digest")) {
    welcome.classList.toggle("red")
  }
})

// howtoBox on navbarBrand
navbarBrand.addEventListener("click", e => {
  const howtoDirections = `
      <div id="howto-close" style="color: white;">X</div>
      <h2 class="text">How to Use WeBoard</h2>
      <p class="lead text-light">- If you do not have an account, please sign up first. (You only need your email to register.)</p>
      <p class="lead text-light">- If you have an account, just log in. (Without logging in, you cannot post a notice or comment.)</p>
      <p class="lead text-light">- By clicking "Post New Notice", you can open the form to post a new notice.</p>
      <p class="lead text-light">-If you have any question or comment, do not hesitate to add comments to the notice.</p>
      <p class="text">Enjoy WeBoard!</p>
  `
  howtoBox.innerHTML = howtoDirections
  howtoBox.classList.toggle("off")
  const howtoClose = document.querySelector("#howto-close")
  howtoClose.addEventListener("click", e => {
    howtoBox.classList.toggle("off")
  })
})
