// window.addEventListener("DOMContetLoaded", (e) => {

// alert("Start!")
const labels = document.querySelectorAll('.form-input label')
const loginLink = document.querySelector("#login")
const loginForm = document.querySelector("#login-form")
const h1 = document.querySelector("h1")
// h1.addEventListener("click", e => {
//   h1.style.color = "red"
// })
// loginLink.addEventListener("click", e => {
//   document.querySelector("#login-form").classList.toggle("off")
// })
console.log("loginLink", loginLink)
document.querySelector("#login").addEventListener("click", e => {
  e.preventDefault()
  document.querySelector("#login-form").classList.toggle("off")
})

// loginLink.addEventListener("click", e => {
//   e.preventDefault()
//   document.querySelector("#login-form").classList.toggle("off")
// })

labels.forEach(label => {
  label.innerHTML = label.innerText
    .split('')
    .map((letter, i) => `<span style="transition-delay:${i * 50}ms">${letter}</span>`)
    .join('')
})

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  alert("login submitted!")
})

// })