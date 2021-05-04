class NoticesController < ApplicationController
  def index
    notices = Notice.all.order(updated_at: :desc)
    render json: notices, include: [:user]
  end

  def show
    notice = Notice.find_by(id: params[:id])
    render json: notice
  end

  def create
    user = User.find_by(password_digest: params[:notice][:user_digest])
    notice = Notice.new(title: params[:notice][:title], description: params[:notice][:description], category: params[:notice][:category], user_id: user.id)
    if notice.save
      session[:notice_id] = notice.id
      p session[:notice_id]
      render json: notice
    else
      render json: {message: "Notice could not posted..."}
    end
  end

  def update
    notice = Notice.find_by(id: params[:id])
    if notice.update(title: params[:notice][:title], description: params[:notice][:description], category: params[:notice][:category])
      render json: notice
    else
      render json: {message: "Update failed..."}
    end
  end

  def destroy
    notice = Notice.find_by(id: params[:id])
    title = notice.title
    if notice.destroy
      render json: {message: "'#{title}' successfully deleted!"}
    else
      render json: {message: "Deletion failed..."}
    end
  end

  # def notice_params
  #   params.require(:notice).permit(:title, :description)
  # end
end
