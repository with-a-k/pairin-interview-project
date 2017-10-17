class Api::V1::UsersController < ApplicationController
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

  def show
    return Users.find_by(email: params[:email])
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :gender)
  end
end
