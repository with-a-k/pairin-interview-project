class SessionController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user

    else
      flash[:error] = ""
    end
  end

  def destroy
    cookies.delete(:session)
    redirect_to :root_path
  end
end
