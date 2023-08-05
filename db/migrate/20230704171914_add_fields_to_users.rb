class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
    add_column :users, :roll_name, :string
    add_column :users, :image, :string
    add_column :users, :address, :string
  end
end
