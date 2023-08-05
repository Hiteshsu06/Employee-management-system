class CreateLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :logs do |t|
      t.integer :user_id
      t.date :time_stamp
      t.boolean :clock_in
      t.boolean :clock_out

      t.timestamps
    end
  end
end
