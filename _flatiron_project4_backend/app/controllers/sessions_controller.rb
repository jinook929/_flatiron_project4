class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: {message: "Log in failed..."}
    end
  end

  def destroy
    session.clear
    render json: {message: "Successfully logged out."}
  end

  def identify
    render json: User.find_by(password_digest: params[:token])
  end
end
