class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :firstname, presence: true
  validates :lastname, presence: true

  has_many :surveys

  def most_recent_survey(user_id)
    return User.find(user_id).surveys.order(created_at: :desc).first
  end
end
