class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :name, :address, :roll_name, :image, :created_at, :updated_at, :salary

  def image
    rails_blob_url(object.image) if object.image.attached?
  end

end
