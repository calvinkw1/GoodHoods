class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.integer :user_id
      t.integer :hood_id
      t.boolean :is_fav, default: false
      t.float :lat
      t.float :lng

      t.timestamps null: false
    end
  end
end
