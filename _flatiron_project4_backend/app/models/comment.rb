class Comment < ApplicationRecord
  belongs_to :notice
  belongs_to :user

  validates_presence_of :content, :user_id, :notice_id
end
