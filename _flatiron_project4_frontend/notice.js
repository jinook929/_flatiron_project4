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

  // static getNotice(notice, i) {
  //   // set icon by category
  //   let icon
  //   if (notice.category === "Today's Works") {
  //     icon = `<i class="fas fa-calendar-day category-icon"></i>`
  //   } else if (notice.category === "Meetings") {
  //     icon = `<i class="fas fa-users category-icon"></i>`
  //   } else if (notice.category === "Tips") {
  //     icon = `<i class="far fa-lightbulb category-icon"></i>`
  //   } else {
  //     icon = `<i class="fab fa-rocketchat category-icon"></i>`
  //   }
  //   // create card html
  //   const card = `
  //   <div id="n_${notice.id}" class="accordion-item">
  //   <h2 class="accordion-header" id="notice_${notice.id}">
  //     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${notice.id}" aria-expanded="false" aria-controls="collapse_${notice.id}">
  //       ${icon} <span class="notice-title">${notice.title}</span>
  //     </button>
  //   </h2>
  //   <div id="collapse_${notice.id}" class="accordion-collapse collapse" aria-labelledby="heading_${notice.id}" data-bs-parent="#board">
  //     <div class="accordion-body">
  //       <div>${notice.description}<div>
  //       <div id="edit-form-${notice.id}" class="off">
  //       <div class="comments"></div>
  //     </div>
  //   </div>
  //   `
  //   let token = currentUser()
  //   if (!!token) {
  //     axios.post(`${url}/sessions/token`, { token: token })
  //       .then(res => {
  //         if (notice.user_id === res.data.id) {
  //           const descriptionBody = document.querySelector(`#collapse_${notice.id}`)
  //           const flexDiv = document.createElement("div")
  //           const editBtn = document.createElement("button")
  //           const deleteBtn = document.createElement("button")
  //           const editForm = document.querySelector(`#edit-form-${notice.id}`)
  //           flexDiv.className = "d-flex gap-1 mt-3 me-3"
  //           editBtn.innerHTML = "Edit"
  //           editBtn.classList.add("btn", "btn-warning", "btn-sm", "ms-auto")
  //           deleteBtn.innerHTML = "Delete"
  //           deleteBtn.classList.add("btn", "btn-danger", "btn-sm")
  //           flexDiv.append(editBtn)
  //           flexDiv.append(deleteBtn)
  //           descriptionBody.prepend(flexDiv)
  //           editForm.innerHTML = `
  //         <form id="edit-post-form-${notice.id}" class="edit-post-form">
  //           <label class="new-form-label" for="title">TITLE</label><br>
  //           <input class="edit-form-input" type="text" name="title" id="title" required value="${notice.title}">
  //           <br>
  //           <label class="new-form-label" for="content">DESCRIPTION</label><br>
  //           <textarea class="edit-form-input" type="text" name="content" id="content" rows="5" required>${notice.description}</textarea>
  //           <br>
  //           <label class="new-form-label" for="edit-category">CATEGORY</label>
  //           <select name="edit-category" id="edit-category">
  //             <option value="Today's Works" ${(notice.category === "Today's Works") ? "selected" : ""}>Today's Works</option>
  //             <option value="Meetings" ${(notice.category === "Meetings") ? "selected" : ""}>Meetings</option>
  //             <option value="Tips" ${(notice.category === "Tips") ? "selected" : ""}>Tips</option>
  //             <option value="etc" ${(notice.category === "etc") ? "selected" : ""}>etc</option>
  //           </select>
  //           <br>
  //           <input class="edit-form-btn" type="submit" value="SUBMIT">
  //         </form>
  //         `
  //           editBtn.addEventListener("click", e => {
  //             editForm.classList.toggle("off")
  //           })
  //           editForm.addEventListener("submit", e => {
  //             e.preventDefault()
  //             console.log("submit!!!")
  //             Notice.editNotice(notice)
  //           })
  //           deleteBtn.addEventListener("click", e => {
  //             console.log("Delete???")
  //             console.log(notice)
  //             Notice.deleteNotice(notice)
  //           })
  //         }
  //       })
  //   }

  //   // append card to display
  //   board.innerHTML += card

  //   // set the first card to open
  //   if (i === 0) {
  //     document.querySelector("h2 button").classList.remove("collapsed")
  //     document.querySelector(`#collapse_${notice.id}`).classList.add("show")
  //   }
  // }

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
          Notice.getNotice(notice, i)
          // set icon by category
          let icon
          if (notice.category === "Today's Works") {
            icon = `<i class="fas fa-calendar-day category-icon"></i>`
          } else if (notice.category === "Meetings") {
            icon = `<i class="fas fa-users category-icon"></i>`
          } else if (notice.category === "Tips") {
            icon = `<i class="far fa-lightbulb category-icon"></i>`
          } else {
            icon = `<i class="fab fa-rocketchat category-icon"></i>`
          }
          // create card html
          const card = `
            <div id="n_${notice.id}" class="accordion-item">
            <h2 class="accordion-header" id="notice_${notice.id}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${notice.id}" aria-expanded="false" aria-controls="collapse_${notice.id}">
                ${icon} <span class="notice-title">${notice.title}</span>
              </button>
            </h2>
            <div id="collapse_${notice.id}" class="accordion-collapse collapse" aria-labelledby="heading_${notice.id}" data-bs-parent="#board">
              <div class="accordion-body">
                <div>${notice.description}<div>
                <div id="edit-form-${notice.id}" class="off">
                <div class="comments"></div>
              </div>
            </div>
            `
          let token = currentUser()
          if (!!token) {
            axios.post(`${url}/sessions/token`, { token: token })
              .then(res => {
                if (notice.user_id === res.data.id) {
                  addEditDeleteBtn(notice)
                  // const descriptionBody = document.querySelector(`#collapse_${notice.id}`)
                  // const flexDiv = document.createElement("div")
                  // const editBtn = document.createElement("button")
                  // const deleteBtn = document.createElement("button")
                  // const editForm = document.querySelector(`#edit-form-${notice.id}`)
                  // flexDiv.className = "d-flex gap-1 mt-3 me-3"
                  // editBtn.innerHTML = "Edit"
                  // editBtn.classList.add("btn", "btn-warning", "btn-sm", "ms-auto")
                  // deleteBtn.innerHTML = "Delete"
                  // deleteBtn.classList.add("btn", "btn-danger", "btn-sm")
                  // flexDiv.append(editBtn)
                  // flexDiv.append(deleteBtn)
                  // descriptionBody.prepend(flexDiv)
                  // editForm.innerHTML = `
                  // <form id="edit-post-form-${notice.id}" class="edit-post-form">
                  //   <label class="new-form-label" for="title">TITLE</label><br>
                  //   <input class="edit-form-input" type="text" name="title" id="title" required value="${notice.title}">
                  //   <br>
                  //   <label class="new-form-label" for="content">DESCRIPTION</label><br>
                  //   <textarea class="edit-form-input" type="text" name="content" id="content" rows="5" required>${notice.description}</textarea>
                  //   <br>
                  //   <label class="new-form-label" for="edit-category">CATEGORY</label>
                  //   <select name="edit-category" id="edit-category">
                  //     <option value="Today's Works" ${(notice.category === "Today's Works") ? "selected" : ""}>Today's Works</option>
                  //     <option value="Meetings" ${(notice.category === "Meetings") ? "selected" : ""}>Meetings</option>
                  //     <option value="Tips" ${(notice.category === "Tips") ? "selected" : ""}>Tips</option>
                  //     <option value="etc" ${(notice.category === "etc") ? "selected" : ""}>etc</option>
                  //   </select>
                  //   <br>
                  //   <input class="edit-form-btn" type="submit" value="SUBMIT">
                  // </form>
                  // `
                  // editBtn.addEventListener("click", e => {
                  //   editForm.classList.toggle("off")
                  // })
                  // editForm.addEventListener("submit", e => {
                  //   e.preventDefault()
                  //   console.log("submit!!!")
                  //   Notice.editNotice(notice)
                  // })
                  // deleteBtn.addEventListener("click", e => {
                  //   console.log("Delete???")
                  //   Notice.deleteNotice(notice)
                  // })
                }
              })
          }

          // append card to display
          board.innerHTML += card

          // set the first card to open
          if (i === 0) {
            document.querySelector("h2 button").classList.remove("collapsed")
            document.querySelector(`#collapse_${notice.id}`).classList.add("show")
          }
        })
      })
  }

  static addEditDeleteBtn(notice) {
    const descriptionBody = document.querySelector(`#collapse_${notice.id}`)
    const flexDiv = document.createElement("div")
    const editBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    const editForm = document.querySelector(`#edit-form-${notice.id}`)
    flexDiv.className = "d-flex gap-1 mt-3 me-3"
    editBtn.innerHTML = "Edit"
    editBtn.classList.add("btn", "btn-warning", "btn-sm", "ms-auto")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm")
    flexDiv.append(editBtn)
    flexDiv.append(deleteBtn)
    descriptionBody.prepend(flexDiv)
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
      Notice.editNotice(notice)
    })
    deleteBtn.addEventListener("click", e => {
      console.log("Delete???")
      Notice.deleteNotice(notice)
    })
  }

  static deleteNotice(notice) {
    axios.delete(`${url}/notices/${notice.id}`)
      .then(res => {
        document.querySelector(`#n_${notice.id}`).remove()
        console.log(res.data)
        message.innerHTML = res.data.message
        setTimeout(() => {
          message.innerHTML = ""
        }, 5000)
      })
  }

  static editNotice(notice) {
    let editPostForm = document.querySelector(`#edit-post-form-${notice.id}`)
    fetch(`${url} / notices / ${notice.id}`, {
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
      .then(data => {
        console.log(data)
        message.innerHTML = `"${(data.title.length < 25) ? data.title : `${data.title.slice(0, 25)}...`}" successfully updated!`
        setTimeout(() => {
          message.innerHTML = ""
        }, 5000)
        Notice.getNotices()
      })
  }

  // display new notice form
  static displayNewForm() {
    newNotice.innerHTML = `
      < h3 id = "new-post" class= "lead" > Post New Notice < br > (Click Here)</h3 >
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
          message.innerHTML = `"${(data.title.length < 25) ? data.title : `${data.title.slice(0, 25)}...`}" created successfully`
          setTimeout(() => {
            message.innerHTML = ""
          }, 5000)
          newPostForm.children[2].value = ""
          newPostForm.children[6].value = ""
          newPostForm.children[9].value = "etc"
          newPostForm.classList.add("off")
          Notice.getNotices()
        })
    })
  }
}
