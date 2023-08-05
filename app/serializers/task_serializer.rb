class TaskSerializer < ActiveModel::Serializer
  attributes :id, :task_name, :task_status, :created_at, :updated_at
end
