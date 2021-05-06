class Comment {
  constructor(comment) {
    this.id = comment.id
    this.content = comment.content
    this.user_id = comment.user_id
    this.username = comment.username
    this.notice_id = comment.notice_id
    this.updated_at = comment.updated_at
  }
  // return new comment form
  static newCommentForm(notice) {
    const commentForm = `
    <form id="new-comment-${notice.id}" class="d-flex mt-3 mb-3">
      <textarea class="new-form-input" type="text" name="content" id="new-comment-content-${notice.id}" rows="2" placeholder="Your Comment Here" required style="width: 100%; padding: 10px; border: solid .5px rgba(4,4,1,.5)"></textarea>
      <input class="btn btn-primary ms-auto me-4" type="submit" value="SUBMIT">
    </form>
    `
    return commentForm
  }
  // display each comment
  static displayComment(comment) {
    let content = document.createElement('p')
    content.id = `comment-content-${comment.id}`
    content.className = "container each-comment"
    content.innerHTML = `<i class="far fa-comments"></i> _ ${comment.content} (<em>by ${comment.username}<em> @ ${comment.updated_at.split("T")[0]}, ${comment.updated_at.split("T")[1].slice(0,8)})<br><hr>`
    return content
  }
}