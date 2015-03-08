class UsersController < ApplicationController
  before_action :prevent_login_signup, only: [:signup, :login]

  def signup
    @user = User.new
  end

  def login
  end

  def attempt_login
  if params[:username].present? && params[:password].present?
       @found_user = User.where(username: params[:username]).first
       if @found_user
         authorized_user = @found_user.authenticate(params[:password])
         session[:user_id] = @found_user.id
     redirect_to home_path
       end
     end
end


  def home
    user_id = session[:user_id]
    @found_user = User.find(user_id)
  end

  def logout
    session[:user_id] = nil
    redirect_to login_path
  end

  def create
    @user = User.new user_params

    if @user.save
      redirect_to login_path
    else
      render :signup
  end
end

private 
def prevent_login_signup
  if session[:user_id]
    redirect_to home_path
  end
end
end
  #see if user is logged in, if so redirect them back home

def user_params
  params.require(:user).permit(:username, :password, :password_digest)
end