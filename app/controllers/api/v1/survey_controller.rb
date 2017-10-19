class Api::V1::SurveyController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new {|c| c.request.format.json?}

  # only for part 1
  def create
    user = User.find(params[:userid])
    survey = user.surveys.create(JSON.parse(params[:survey]))
    render :json => survey.to_json
  end

  #only for part 2
  def update
    survey = Survey.find(params[:surveyid])
    survey.update(JSON.parse(params[:survey]))
    render :json => survey.to_json
  end
end
