class CreateHoods < ActiveRecord::Migration
  def change
    create_table :hoods do |t|
      t.string :name
      t.string :city
      t.string :state
      t.integer :zip

      t.timestamps null: false
    end
  end
end
