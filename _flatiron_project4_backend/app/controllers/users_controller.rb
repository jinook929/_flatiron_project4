class UsersController < ApplicationController
  def index
    users = User.all
    render json: users, include: [:notices, :comments]
  end

  # def show
  #   user = User.find_by(id: params[:id])
  #   render json: user
  # end

  def create
    user = User.new(user_params)
    user.email = params[:user][:email].downcase
    user.username = params[:user][:email].upcase.split("@")[0]
    if user.save
      # session[:user_id] = user.id
      render json: user
    else
      render json: {message: "Sign up failed..."}
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
