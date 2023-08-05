class CreateSalaryHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :salary_histories do |t|
      t.integer :user_id
      t.integer :amount
      t.integer :salary_id
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
