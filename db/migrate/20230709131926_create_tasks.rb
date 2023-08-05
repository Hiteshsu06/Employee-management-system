class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.integer :project_id
      t.string :task_name
      t.string :task_status

      t.timestamps
    end
  end
end
