class User < ActiveRecord::Base
  has_many :hoods, through: :searches
  has_many :searches
  has_secure_password
end
