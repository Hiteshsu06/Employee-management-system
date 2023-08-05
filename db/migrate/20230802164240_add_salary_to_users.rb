class AddSalaryToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :salary, :integer
  end
end
