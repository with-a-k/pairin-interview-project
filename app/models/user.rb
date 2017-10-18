class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :gender, presence: true, inclusion: { in: %w(Male Female Other) }

  has_many :surveys

  def most_recent_survey
    return surveys.order(created_at: :desc).first
  end
end
