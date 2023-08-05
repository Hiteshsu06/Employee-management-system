require "test_helper"

class SalaryHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @salary_history = salary_histories(:one)
  end

  test "should get index" do
    get salary_histories_url, as: :json
    assert_response :success
  end

  test "should create salary_history" do
    assert_difference("SalaryHistory.count") do
      post salary_histories_url, params: { salary_history: { amount: @salary_history.amount, end_date: @salary_history.end_date, salary_id: @salary_history.salary_id, start_date: @salary_history.start_date, user_id: @salary_history.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show salary_history" do
    get salary_history_url(@salary_history), as: :json
    assert_response :success
  end

  test "should update salary_history" do
    patch salary_history_url(@salary_history), params: { salary_history: { amount: @salary_history.amount, end_date: @salary_history.end_date, salary_id: @salary_history.salary_id, start_date: @salary_history.start_date, user_id: @salary_history.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy salary_history" do
    assert_difference("SalaryHistory.count", -1) do
      delete salary_history_url(@salary_history), as: :json
    end

    assert_response :no_content
  end
end
