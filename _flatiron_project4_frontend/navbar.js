const navbarBrand = document.querySelector(".navbar-brand")
const profileLink = document.querySelector("#profile")
const myNoticeLink = document.querySelector("#personal-notice")
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

// display owned notices
myNoticeLink.addEventListener("click", e => {
  fetch(`${url}/notices`)
  .then(res => res.json())
  .then(data => {
    const notices = data.filter(el => el.user.password_digest === currentUser()).map(notice => new Notice(notice))
    board.innerHTML = ""
    notices.forEach(el => {
      board.append(el.getNotice())
    })
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

// search function
search.addEventListener("submit", e => {
  e.preventDefault()
  axios.post(`${url}/notices/search`, {keyword: search.children[0].value.toLowerCase()})
  .then(res => {
    // convert backend data to JS objects
    let notices = res.data.map(d => new Notice(d))
    // prepare search result
    const resultMemo = document.createElement("h2")
    resultMemo.id = "result-memo"
    board.innerHTML = ""
    // append search result memo and card nodes into board 
    if(notices.length === 0) { // when no result
      resultMemo.innerHTML = `There is no result for "${search.children[0].value}"`
      board.append(resultMemo)
    } else { // when results found
      resultMemo.innerHTML = `Results for "${search.children[0].value}"`
      notices.forEach((notice, i) => {
        board.append(notice.getNotice())
        if (i === 0) {
          document.querySelector(`#n_${notice.id} button`).classList.remove("collapsed")
          document.querySelector(`#collapse_${notice.id}`).classList.add("show")
        }
      })
      board.prepend(resultMemo)
    }
    search.children[0].value = ""
    // add back button
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