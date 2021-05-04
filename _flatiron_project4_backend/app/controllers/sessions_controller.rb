class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      render json: user
      # binding.pry
    else
      render json: {message: "Log in failed..."}
    end
  end

  # def delete
  def destroy
    # if(session[:user_id] == params[:user][:id])
    # binding.pry
      session.clear
      render json: {message: "Successfully logged out."}
    # else
    #   render json: {message: "Log out failed..."}
    # end
  end

  def identify
    render json: User.find_by(password_digest: params[:token])
  end

  # def google_signin
  #   redirect_to current_user if logged_in?
  #   @user = User.find_by(email: auth[:info][:email])
  #   if @user
  #     session[:user_id] = @user.id
  #     redirect_to @user, alert: "Successfully logged in!"      
  #   else
  #     password = SecureRandom.base64(12)
  #     @user = User.create(name: auth[:info][:name], email: auth[:info][:email], password: password)
  #     if @user.errors.empty?
  #       session[:user_id] = @user.id
  #       session[:tmp_password] = password if @user.password
  #       redirect_to edit_password_path(@user), alert: "Successfully logged in via Google. Now please set your password for this app."
  #     else
  #       @alert = "Google log in failed..."
  #       render 'new'
  #     end
  #   end
  # end

  private

  def auth
    request.env['omniauth.auth']
  end
end
