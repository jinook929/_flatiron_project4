class CommentsController < ApplicationController
  def index
    comments = Comment.all.order(updated_at: :desc)
    render json: comments, include: [:user, :notice]
  end

  def create
    user = User.find_by(password_digest: params[:comment][:user_digest])
    comment = Comment.new(content: params[:comment][:content], notice_id: params[:comment][:notice_id], user_id: user.id, username: user.username)
    if comment.save
      render json: comment
    else
      render json: {message: "Comment could not posted..."}
    end
  end

  def comment_params
    params.require(:comment).permit(:content, :notice_id, :user_digest)
  end
end
