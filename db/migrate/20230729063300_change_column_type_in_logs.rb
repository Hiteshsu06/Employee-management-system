class ChangeColumnTypeInLogs < ActiveRecord::Migration[7.0]
  def change
    change_column :logs, :time_stamp, :integer
  end
end
