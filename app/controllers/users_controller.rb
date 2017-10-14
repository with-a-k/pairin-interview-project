class UsersController < ApplicationController
  def create
    user = Users.create(user_params)
    if user.valid?
      cookies.signed[:session] = { value: user.id, expires: Time.now + 7200 }
      redirect_to landing_path
    else
      flash[:error] = "An error occurred while trying to create your account."
      flash[:cause] = ""
      redirect_to :back
    end
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :gender)
  end
end
