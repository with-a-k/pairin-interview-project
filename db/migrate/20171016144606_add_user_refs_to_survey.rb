class AddUserRefsToSurvey < ActiveRecord::Migration[5.0]
  def change
    add_reference :user, :survey, index: true
  end
end
