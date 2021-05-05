class Notice < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates_presence_of :title, :description, :category, :user_id
end
