class RemoveTaskIdFromProjects < ActiveRecord::Migration[7.0]
  def change
    remove_column :projects, :task_id, :integer
  end
end
