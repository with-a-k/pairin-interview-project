class Api::V1::UsersController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new {|c| c.request.format.json?}

  def create
    user = User.new(JSON.parse(params[:user]))
    if (user.valid?)
      user.save
      render user.to_json
    else
      render :json => {:errors => user.errors.full_messages},
        :status => :unprocessable_entity
    end
  end

  def index
    user = User.find_by(email: params[:email])
    if user
      render :json => user.to_json(:include => :surveys)
    else
      render :json => { :errors => "No user with the specified address" }, :status => :not_found
    end
  end
end
