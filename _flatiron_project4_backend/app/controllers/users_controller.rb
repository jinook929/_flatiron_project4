class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    binding.pry
    user = User.find_by(id: params[id])
    render json: user
  end

  def create
    user = User.create(user_params)
    session[:user_id] = user.id
    p session[:user_id]
    render json: user
    binding.pry
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
