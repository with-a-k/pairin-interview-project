class AddUserRefsToSurvey < ActiveRecord::Migration[5.0]
  def change
    add_reference :surveys, :user, index: true
  end
end
