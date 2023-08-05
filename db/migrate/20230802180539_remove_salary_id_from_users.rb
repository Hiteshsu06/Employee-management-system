class RemoveSalaryIdFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :salary_id, :integer
  end
end
