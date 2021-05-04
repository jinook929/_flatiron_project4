class User < ApplicationRecord
  has_many :notices, dependent: :destroy
  
  has_secure_password
  validates :email, presence: true
  validates_uniqueness_of :email, :case_sensitive => false
end
