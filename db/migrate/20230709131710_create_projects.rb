class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :project_name
      t.date :current_date
      t.string :project_status
      t.integer :task_id

      t.timestamps
    end
  end
end
