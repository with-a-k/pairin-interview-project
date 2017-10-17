class Api::V1::SurveyController < ApplicationController
  def create
  end

  def update
  end

  def show
    return User.most_recent_survey(params[:user_id])
  end
end
