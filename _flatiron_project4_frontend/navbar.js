const navbarBrand = document.querySelector(".navbar-brand")
const profileLink = document.querySelector("#profile")
const howtoBox = document.querySelector("#howto-box")
const search = document.querySelector("#search")
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

// profile Easter Egg
profileLink.addEventListener("click", e => {
  let hi = document.querySelector("#hi")
  if(!hi) {
    hi = document.createElement("img")
    hi.id = "hi"
    hi.setAttribute("src", "./images/hi.png")
    document.body.prepend(hi)
  } else {
    hi.remove()
  }
})

// search function
search.addEventListener("submit", e => {
  e.preventDefault()
  axios.post(`${url}/notices/search`, {keyword: search.children[0].value.toLowerCase()})
  .then(res => {
    // convert backend data to JS objects
    let notices = res.data.map(d => new Notice(d))
    // append card nodes into board 
    board.innerHTML = ""
    if(notices.length === 0) {
      const noResultMsg = document.createElement("h2")
      noResultMsg.id = "no-result"
      noResultMsg.innerHTML = `There is no result for "${search.children[0].value}"`
      board.append(noResultMsg)
    } else {
      notices.forEach((notice, i) => {
        board.append(notice.displayNotice())
        if (i === 0) {
          document.querySelector(`#n_${notice.id} button`).classList.remove("collapsed")
          document.querySelector(`#collapse_${notice.id}`).classList.add("show")
        }
      })
    }
    search.children[0].value = ""
    const backBtn = document.createElement("button")
    backBtn.id = "back-btn"
    backBtn.className = "btn btn-primary btn-lg"
    backBtn.innerHTML = "Back to Main"
    backBtn.addEventListener("click", e => {
      Notice.getNotices()
    })
    board.append(backBtn)
  })
})