class Api::V1::UsersController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new {|c| c.request.format.json?}

  def create
    user = User.new(JSON.parse(params[:user]))
    if (user.valid?)
      user.save
      user.surveys.create()
      logger.debug('we get here!')
      render :json => user.to_json(:methods => :most_recent_survey)
    else
      render :json => { :errors => user.errors.full_messages },
        :status => :unprocessable_entity
    end
  end

  def index
    user = User.find_by(email: params[:email])
    if user
      render :json => user.to_json(:methods => :most_recent_survey)
    else
      render :json => { :errors => "No user with the specified address" },
        :status => :not_found
    end
  end
end
