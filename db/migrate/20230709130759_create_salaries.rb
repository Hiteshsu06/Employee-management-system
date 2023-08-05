class CreateSalaries < ActiveRecord::Migration[7.0]
  def change
    create_table :salaries do |t|
      t.integer :user_id
      t.integer :annual_package
      t.integer :amount
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
