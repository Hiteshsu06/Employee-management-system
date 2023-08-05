require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get employee" do
    get users_employee_url
    assert_response :success
  end

  test "should get humanresource" do
    get users_humanresource_url
    assert_response :success
  end
end
