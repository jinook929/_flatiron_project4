console.log("Hi, there~")
console.log( document.readyState)
document.querySelector("h1").addEventListener("click", e => {
  document.querySelector("h1").style.color = "red"
})
const board = document.querySelector("#board")
const url = "http://localhost:3000"

board.innerHTML = `<h2>fetch from ${url}</h2>`

fetch(`${url}/users`)
.then(res => res.json())
.then(users => {
  console.log(users)
  for(const user of users) {
    document.body.innerHTML += `<p id="${user.id}" class="email">${user.email}</p>`
  }

  const emails = document.querySelectorAll(".email")

  emails.forEach(email => {
    email.addEventListener("click", function(e) {
      console.log(this)
      axios.post(`${url}/login`, {
        user: {
          email: email.innerText,
          password: "123"
        }
      })
      // .then(res => res)
      .catch(err => console.log(err))
      .then((res) => {
        console.log("User ID:", res.data.id)
        console.log("Email:", res.data.email)
        console.log("Nick Name:", res.data.email.split("@")[0].toUpperCase())
        sessionStorage.setItem("user_id", res.data.id)
        console.log("sessionStorage - user_id:", sessionStorage.getItem("user_id"))
      });  
    })
  })
})


