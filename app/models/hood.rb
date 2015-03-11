class Hood < ActiveRecord::Base
  has_many :users, through: :searches
  has_many :searches
  has_many :comments, as: :commentable
end
