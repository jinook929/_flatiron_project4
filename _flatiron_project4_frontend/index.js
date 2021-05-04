console.log("Hi, there~")

function init() {
  if(isLoggedIn()) {
    Notice.displayNewForm()
  } else {
    newNotice.innerHTML = ""
  }  
  Notice.getNotices()
}

init()