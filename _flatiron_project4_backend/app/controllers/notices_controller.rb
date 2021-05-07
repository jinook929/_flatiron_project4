class NoticesController < ApplicationController
  def index
    notices = Notice.all.order(updated_at: :desc)
    render json: notices, include: [:user, :comments]
  end

  # def show
  #   notice = Notice.find_by(id: params[:id])
  #   if(notice)
  #     render json: notice
  #   else
  #     render json: {message: "Notice not found..."}
  #   end
  # end

  def create
    user = User.find_by(password_digest: params[:notice][:user_digest])
    notice = Notice.new(notice_params)
    notice.user_id = user.id
    if notice.save
      render json: notice
    else
      render json: {message: "Notice could not posted..."}
    end
  end

  def update
    notice = Notice.find_by(id: params[:id])
    if notice[:title] == params[:notice][:title] && notice[:description] == params[:notice][:description] && notice[:category] == params[:notice][:category]
      render json: {message: "No change detected..."}
    elsif notice.update(title: params[:notice][:title], description: params[:notice][:description], category: params[:notice][:category])
      render json: notice
    else
      render json: {message: "Update failed..."}
    end
  end

  def destroy
    notice = Notice.find_by(id: params[:id])
    title = notice.title
    if notice.destroy
      render json: {message: "'#{title.length > 25 ? title.slice(0, 25) : title}' successfully deleted!"}
    else
      render json: {message: "Deletion failed..."}
    end
  end

  def search
    notices = Notice.where("lower(title) LIKE ?", "%#{params[:keyword]}%").or(Notice.where("lower(description) LIKE ?", "%#{params[:keyword]}%")).order(updated_at: :desc)
    render json: notices.uniq
  end

  def notice_params
    params.require(:notice).permit(:title, :description, :category)
  end
end
