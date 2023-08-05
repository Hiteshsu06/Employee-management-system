class AddProjectIdToTasks < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :tasks, :projects, column: :project_id
  end
end
