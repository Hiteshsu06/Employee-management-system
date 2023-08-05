class RemoveSalaryFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :salary, :integer
  end
end
