class SalarySerializer < ActiveModel::Serializer
  attributes :id, :annual_package, :amount, :start_date, :end_date
end
