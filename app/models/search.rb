class Search < ActiveRecord::Base
  belongs_to :user
  belongs_to :hood

  validates :hood_id, presence: true
end
