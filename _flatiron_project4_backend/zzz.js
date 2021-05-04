function modalToggle(message) {
  message.innerHTML = message
  setTimeout(() => {
    message.innerHTML = ""
  }, 5000)
  
  profileLink.children[0].innerHTML = message
  signupLink.classList.toggle("off")
  loginLink.classList.toggle("off")
  profileLink.classList.toggle("off")
  logoutLink.classList.toggle("off")
}

function sessionSubmit(route, form, status) {
  axios.post(`${url}/${route}`, {
    user: {
      email: e.target[0].value,
      password: e.target[1].value
    }
  })
  .catch(err => console.log(err))
  .then((res) => {
    let user = new User(res.data)
    if(user.message) {
      form.classList.toggle("off")
      form.children[2][0].value = ""
      form.children[2][1].value = ""
      message.innerHTML = user.message
      setTimeout(() => {
        message.innerHTML = ""
      }, 5000)
    } else {
      let message = `Successfully ${status} as ${user.username}!`
      modalToggle(message, user.username)
      
      form.classList.toggle("off")
      form.children[2][0].value = ""
      form.children[2][1].value = ""
      
      sessionStorage.setItem("user_digest", user.password_digest)
      Notice.displayNewForm()
    }
  })
}