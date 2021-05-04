const board = document.querySelector("#board")
const url = "http://localhost:3000"

class Notice {
  constructor(notice) {
    this.id = notice.id
    this.title = notice.title
    this.description = notice.description
    this.category = notice.category
    this.user_id = notice.user_id
  }

  // display each notice
  // static displayNotice(notice) {
  displayNotice() {
    // set icon by category
    let icon
    if (this.category === "Today's Works") {
      icon = `<i class="fas fa-calendar-day category-icon"></i>`
    } else if (this.category === "Meetings") {
      icon = `<i class="fas fa-users category-icon"></i>`
    } else if (this.category === "Tips") {
      icon = `<i class="far fa-lightbulb category-icon"></i>`
    } else {
      icon = `<i class="fab fa-rocketchat category-icon"></i>`
    }
    // create card html
    const card = `
    <div id="n_${this.id}" class="accordion-item">
      <h2 class="accordion-header" id="notice_${this.id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${this.id}" aria-expanded="false" aria-controls="collapse_${this.id}">
          ${icon} <span class="notice-title">${this.title}</span>
        </button>
      </h2>
      <div id="collapse_${this.id}" class="accordion-collapse collapse" aria-labelledby="heading_${this.id}" data-bs-parent="#board">
        <div class="accordion-body">
          <div class="d-flex gap-1 mt-3 me-3">
            <button id="editBtn_${this.id}" class="off btn btn-warning btn-sm ms-auto">Edit</button>
            <button id="deleteBtn_${this.id}" class="off btn btn-danger btn-sm">Delete</button>
          </div>
          <div>${this.description}</div>
          <div id="edit-form-${this.id}" class="off"></div>
          <div class="comments"></div>
        </div>
      </div>
    </div>
    `

    // add edit & delete button when owned
    let token = currentUser()
    if (!!token) {
      axios.post(`${url}/sessions/token`, { token: token })
        .then(res => {
          if (this.user_id === res.data.id) {
            Notice.addEditDeleteBtn(this)
          }
        })
    }
    return card
  }

  // get all notices from backend and display them
  static getNotices() {
    // empty board div
    board.innerHTML = ""

    // fetch data from backend
    fetch(`${url}/notices`)
      .then(res => res.json())
      .then(data => {
        // convert backend data to JS objects
        let notices = data.map(d => new Notice(d))
        // make them into cards html 
        notices.forEach((notice, i) => {
          board.innerHTML += notice.displayNotice()
          // board.innerHTML += Notice.displayNotice(notice)
          if (i === 0) {
            document.querySelector("h2 button").classList.remove("collapsed")
            document.querySelector(`#collapse_${notice.id}`).classList.add("show")
          }
        })
      })
  }

  static addEditDeleteBtn(notice) {
    const editBtn = document.querySelector(`#editBtn_${notice.id}`)
    const deleteBtn = document.querySelector(`#deleteBtn_${notice.id}`)
    const editForm = document.querySelector(`#edit-form-${notice.id}`)
    editBtn.classList.toggle("off")
    deleteBtn.classList.toggle("off")
    editForm.innerHTML = `
      <form id="edit-post-form-${notice.id}" class="edit-post-form">
        <label class="new-form-label" for="title">TITLE</label><br>
        <input class="edit-form-input" type="text" name="title" id="title" required value="${notice.title}">
        <br>
        <label class="new-form-label" for="content">DESCRIPTION</label><br>
        <textarea class="edit-form-input" type="text" name="content" id="content" rows="5" required>${notice.description}</textarea>
        <br>
        <label class="new-form-label" for="edit-category">CATEGORY</label>
        <select name="edit-category" id="edit-category">
          <option value="Today's Works" ${(notice.category === "Today's Works") ? "selected" : ""}>Today's Works</option>
          <option value="Meetings" ${(notice.category === "Meetings") ? "selected" : ""}>Meetings</option>
          <option value="Tips" ${(notice.category === "Tips") ? "selected" : ""}>Tips</option>
          <option value="etc" ${(notice.category === "etc") ? "selected" : ""}>etc</option>
        </select>
        <br>
        <input class="edit-form-btn" type="submit" value="SUBMIT">
      </form>
      `
    editBtn.addEventListener("click", e => {
      editForm.classList.toggle("off")
    })
    editForm.addEventListener("submit", e => {
      e.preventDefault()
      console.log("submit!!!")
      notice.editNotice()
    })
    deleteBtn.addEventListener("click", e => {
      console.log("Delete???")
      notice.deleteNotice()
    })
  }

  deleteNotice() {
    axios.delete(`${url}/notices/${this.id}`)
      .then(res => {
        document.querySelector(`#n_${this.id}`).remove()
        console.log(res.data)
        messageDisplay(res.data.message)
      })
  }

  editNotice() {
    let editPostForm = document.querySelector(`#edit-post-form-${this.id}`)
    fetch(`${url}/notices/${this.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notice: {
          title: editPostForm.children[2].value,
          description: editPostForm.children[6].value,
          category: editPostForm.children[9].value,
        }
      })
    })
      .then(res => res.json())
      .then(notice => {
        console.log(notice)
        messageDisplay(`"${(notice.title.length < 25) ? notice.title : `${notice.title.slice(0, 25)}...`}" successfully updated!`)

        // document.querySelector(`#n_${notice.id}`).remove()
        // board.innerHTML = Notice.displayNotice(notice) + board.innerHTML
        // document.querySelector(`#n_${notice.id} button`).classList.remove("collapsed")
        // document.querySelector(`#collapse_${notice.id}`).classList.add("show")

        Notice.getNotices()
      })
  }

  // display new notice form
  static displayNewForm() {
    newNotice.innerHTML = `
    <h3 id = "new-post" class= "lead" > Post New Notice <br> (Click Here)</h3>
    <form id="new-post-form" class="off">
      <label class="new-form-label" for="title">TITLE</label><br>
      <input class="new-form-input" type="text" name="title" id="title" required>
      <br>
      <label class="new-form-label" for="content">DESCRIPTION</label><br>
      <textarea class="new-form-input" type="text" name="content" id="content" rows="5" required></textarea>
      <br>
      <label class="new-form-label" for="new-category">CATEGORY</label>
      <select name="new-category" id="new-category">
        <option value="Today's Works">Today's Works</option>
        <option value="Meetings">Meetings</option>
        <option value="Tips">Tips</option>
        <option value="etc" selected>etc</option>
      </select>
      <br>
      <input class="new-form-btn" type="submit" value="SUBMIT">
    </form>
    `
    const newPost = document.querySelector("#new-post")
    const newPostForm = document.querySelector("#new-post-form")

    newPost.addEventListener("click", e => {
      newPostForm.classList.toggle("off")
    })

    newPostForm.addEventListener("submit", e => {
      e.preventDefault()
      fetch(`${url}/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notice: {
            title: newPostForm.children[2].value,
            description: newPostForm.children[6].value,
            category: newPostForm.children[9].value,
            user_digest: currentUser()
          }
        })
      }).then(res => res.json())
        .then(data => {
          messageDisplay(`"${(data.title.length < 25) ? data.title : `${data.title.slice(0, 25)}...`}" created successfully`)
          newPostForm.children[2].value = ""
          newPostForm.children[6].value = ""
          newPostForm.children[9].value = "etc"
          newPostForm.classList.add("off")
          Notice.getNotices()
        })
    })
  }
}
