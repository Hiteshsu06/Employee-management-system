class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :current_date, :project_status, :created_at, :updated_at
  has_many :tasks
end
