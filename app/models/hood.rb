class Hood < ActiveRecord::Base
  has_many :users, through: :searches
  has_many :searches
  has_many :comments, as: :commentable

  validates_uniqueness_of :name, scope: :city
end
