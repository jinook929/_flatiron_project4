class Comment < ApplicationRecord
  belongs_to :notice

  validates_presence_of :content, :user_id, :notice_id
end
